var ib = ib || {}
ib = {
  //시트 초기화 구문
  'init': {
    //공통기능 설정 부분
    "Cfg": { "SearchMode": 2 },
    //컬럼 설정 (Name 은 영문 식별자, 한글은 Header 에만)
    "Cols": [
      { "Header": "No",   "Name": "SEQ",  "Type": "Int",  "Width": 50,  "Align": "Center" },
      { "Header": "사용자", "Name": "USER", "Type": "Enum", "Enum": "|남편|아내|공동", "Width": 70, "Align": "Center" },
      { "Header": "분류", "Name": "CAT",  "Type": "Text", "Width": 80,  "Align": "Center" },
      { "Header": "내용", "Name": "ITEM", "Type": "Text", "Width": 150 },
      { "Header": "금액", "Name": "AMT",  "Type": "Int",  "Width": 110, "Format": "#,##0" }
    ]
  },

  //시트 이벤트
  event: {
    onRenderFirstFinish: function (evtParam) {
      // 시트에 데이터를 넣습니다.
      evtParam.sheet.loadSearchData(ib.data)
    },
    // ③ directExcelData 전용: 이 모드가 켜져 있을 때만 앞 파일이 끝난 뒤 다음 파일
    onExportFinish: function (evtParam) {
      if (!ib.chain) return
      ib.log("  ✔ " + ib.chainKeys[ib.chainIdx] + ".xlsx 완료")
      ib.chainIdx++
      if (ib.chainIdx < ib.chainKeys.length) ib.fireDirect(evtParam.sheet)
      else { ib.chain = false; ib.log("전체 완료") }
    }
  },

  //③ directExcelData 하나씩 다운로드 진행 상태
  chain: false, chainGroups: {}, chainKeys: [], chainIdx: 0, chainDownCols: "",
  fireDirect: function (srcSheet) {
    var k = this.chainKeys[this.chainIdx]
    var fn = k + "_directExcelData.xlsx"        // 임시시트 방식과 구분되게 파일명에 표시
    this.log("directExcelData: " + fn)
    srcSheet.exportData({
      directExcelData: this.chainGroups[k],
      fileName: fn, sheetName: String(k),
      downCols: this.chainDownCols, downHeader: true
    })
  },

  //시트객체 생성
  create: function () {
    var options = this.init
    options.Events = this.event
    IBSheet.create({
      id: "sheet",      // 생성할 시트의 id
      el: "sheetDiv",   // 시트를 생성할 Dom 객체 및 id
      options: options
    })
  },

  //로그 출력
  log: function (msg) {
    var el = document.getElementById("log")
    el.textContent += msg + "\n"
    el.scrollTop = el.scrollHeight
  },

  //---------------------------------------------------------------
  // 공통: 원본 시트 데이터를 keyName(사용자) 값 기준으로 그룹화
  //---------------------------------------------------------------
  groupBy: function (srcSheet, keyName) {
    var groups = {}
    srcSheet.getSaveJson({ saveMode: 0 }).data.forEach(function (row) {
      (groups[row[keyName]] = groups[row[keyName]] || []).push(row)
    })
    return groups
  },
  // 공통: downCols 순서대로 원본 시트의 컬럼 정의를 추출
  pickCols: function (srcSheet, downCols) {
    var colMap = {}
    srcSheet.getUserOptions().Cols.forEach(function (c) { colMap[c.Name] = c })
    return downCols.split("|").map(function (n) { return colMap[n] }).filter(Boolean)
  },

  //---------------------------------------------------------------
  // ① 사용자별로 "각각 별도 파일" 다운로드
  //    그룹마다 숨김 임시 시트 생성 → exportData → 완료 시 dispose
  //---------------------------------------------------------------
  exportPerFile: function (srcSheet, keyName, downCols) {
    var groups = this.groupBy(srcSheet, keyName)
    var self = this

    Object.keys(groups).forEach(function (key) {
      // 시트마다 (1) 각자 div (2) 새로 복제한 컬럼 정의
      //  - 한 div 공유·같은 cols 공유는 2번째+ 시트의 헤더(글자/색)를 유실시킴 → 시트마다 새로
      var d = document.createElement("div"); d.style.display = "none"; document.body.appendChild(d)
      var cols = JSON.parse(JSON.stringify(self.pickCols(srcSheet, downCols)))   // 컬럼 정의 복제(공유 방지)
      // sync 없이 비동기로 생성 → 시트를 많이 만들어도 화면이 멈추지 않음
      // 생성이 끝나면(onRenderFirstFinish) 그 시트가 자기 데이터를 exportData, 끝나면(onExportFinish) dispose
      IBSheet.create({
        el: d,
        options: {
          Cols: cols,
          Events: {
            onRenderFirstFinish: function (evtParam) {
              evtParam.sheet.exportData({ fileName: key + ".xlsx", sheetName: String(key), downHeader: true })
            },
            onExportFinish: function (e) { e.sheet.dispose() }
          }
        },
        data: groups[key]
      })
      self.log("파일: " + key + ".xlsx (" + groups[key].length + "행)")
    })
  },

  //---------------------------------------------------------------
  // ② "한 파일"에 사용자별 "워크시트"로 다운로드 (exportDataBuffer)
  //    그룹마다 임시 시트 생성 → 버퍼로 워크시트 누적 → 한 파일 다운로드
  //---------------------------------------------------------------
  exportWorksheets: function (srcSheet, keyName, downCols, fileName) {
    var groups = this.groupBy(srcSheet, keyName)
    var made = []
    var self = this

    Object.keys(groups).forEach(function (key) {
      // 시트마다 각자 div + 새로 복제한 컬럼 정의 (cols 공유하면 2번째+ 워크시트 헤더 유실)
      var d = document.createElement("div"); d.style.display = "none"; document.body.appendChild(d)
      var cols = JSON.parse(JSON.stringify(self.pickCols(srcSheet, downCols)))   // 컬럼 정의 복제(공유 방지)
      // IBSheet.create 의 반환값(시트 객체)을 사용
      var s = IBSheet.create({ el: d, options: { Cols: cols }, data: groups[key], sync: 1 })
      made.push({ sheet: s, key: key })
    })

    var host = made[0].sheet
    host.exportDataBuffer(true)                              // 버퍼 시작
    made.forEach(function (m, idx) {
      var param = { sheetName: m.key, downHeader: true }
      if (idx === 0) param.fileName = fileName               // 파일명은 첫 exportData 에만
      m.sheet.exportData(param)                              // 워크시트로 누적
    })
    host.exportDataBuffer(false)                             // 버퍼 종료 → 한 파일 다운로드
    this.log("파일: " + fileName + " (워크시트: " + Object.keys(groups).join(", ") + ")")

    setTimeout(function () { made.forEach(function (m) { if (m.sheet) m.sheet.dispose() }) }, 1500)
  },

  //---------------------------------------------------------------
  // ③ directExcelData: 임시시트 없이 시트 하나로 "여러 파일" (앞 파일이 끝나면 다음 파일)
  //    그룹이 많아 임시시트를 여러 개 만들기 부담될 때 유리 (시트 생성 0개)
  //---------------------------------------------------------------
  exportDirectPerFile: function (srcSheet, keyName, downCols) {
    this.chainGroups = this.groupBy(srcSheet, keyName)
    this.chainKeys = Object.keys(this.chainGroups)
    this.chainDownCols = downCols
    this.chainIdx = 0
    this.chain = true
    this.fireDirect(srcSheet)   // 첫 파일 시작 → onExportFinish 가 이어받음
  },

  //---------------------------------------------------------------
  // ④ directExcelData + 버퍼: 임시시트 없이 "한 파일에 워크시트 여러 개"
  //---------------------------------------------------------------
  exportDirectWorksheets: function (srcSheet, keyName, downCols, fileName) {
    var groups = this.groupBy(srcSheet, keyName)
    var keys = Object.keys(groups)
    srcSheet.exportDataBuffer(true)
    keys.forEach(function (k, i) {
      var p = { directExcelData: groups[k], sheetName: String(k), downCols: downCols, downHeader: true }
      if (i === 0) p.fileName = fileName
      srcSheet.exportData(p)
    })
    srcSheet.exportDataBuffer(false)
    this.log("파일: " + fileName + " (워크시트: " + keys.join(", ") + ")")
  },

  //화면 기능
  sampleBtn: function (obj) {
    switch (obj.textContent) {
      case '사용자별 여러 파일':
        this.log("=== ① 사용자별 여러 파일 ===")
        this.exportPerFile(sheet, "USER", "SEQ|CAT|ITEM|AMT")
        break
      case '여러 파일 (directExcelData)':
        this.log("=== ③ 여러 파일 (directExcelData, 임시시트 X) ===")
        this.exportDirectPerFile(sheet, "USER", "SEQ|CAT|ITEM|AMT")
        break
      case '한 파일 워크시트':
        this.log("=== ② 한 파일, 사용자별 워크시트 ===")
        this.exportWorksheets(sheet, "USER", "SEQ|CAT|ITEM|AMT", "가계부.xlsx")
        break
      case '워크시트 (directExcelData)':
        this.log("=== ④ 한 파일 워크시트 (directExcelData, 임시시트 X) ===")
        this.exportDirectWorksheets(sheet, "USER", "SEQ|CAT|ITEM|AMT", "가계부_directExcelData.xlsx")
        break
      case '로그 지우기':
        document.getElementById("log").textContent = ""
        break
    }
  },

  //조회 데이터 (맞벌이 부부 가계부: 사용자 = 남편/아내/공동)
  'data': [
    { "SEQ": 1, "USER": "남편", "CAT": "식비", "ITEM": "점심",     "AMT": 8000 },
    { "SEQ": 2, "USER": "남편", "CAT": "교통", "ITEM": "택시",     "AMT": 9800 },
    { "SEQ": 3, "USER": "아내", "CAT": "식비", "ITEM": "커피",     "AMT": 4500 },
    { "SEQ": 4, "USER": "아내", "CAT": "여가", "ITEM": "도서 구매", "AMT": 22000 },
    { "SEQ": 5, "USER": "공동", "CAT": "식비", "ITEM": "장보기",   "AMT": 54000 },
    { "SEQ": 6, "USER": "공동", "CAT": "주거", "ITEM": "관리비",   "AMT": 180000 },
    { "SEQ": 7, "USER": "공동", "CAT": "주거", "ITEM": "전기요금", "AMT": 32000 }
  ]
}
ib.create()