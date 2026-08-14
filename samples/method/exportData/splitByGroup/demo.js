var ib = ib || {}
ib = {
  //── 시트 초기화 정보 (공통설정 + 컬럼) ──
  'init': {
    "Cfg": { "SearchMode": 2 },   // SearchMode:2 = 서버조회 없이 loadSearchData 로 직접 데이터를 넣는 방식
    //컬럼 정의: Name 은 영문 식별자(데이터의 key), Header 는 화면·엑셀에 보이는 제목
    "Cols": [
      { "Header": "No",   "Name": "SEQ",  "Type": "Int",  "Width": 50,  "Align": "Center" },
      { "Header": "사용자", "Name": "USER", "Type": "Enum", "Enum": "|남편|아내|공동", "Width": 70, "Align": "Center" },
      { "Header": "분류", "Name": "CAT",  "Type": "Text", "Width": 80,  "Align": "Center" },
      { "Header": "내용", "Name": "ITEM", "Type": "Text", "Width": 150 },
      { "Header": "금액", "Name": "AMT",  "Type": "Int",  "Width": 110, "Format": "#,##0" }
    ]
  },

  //── 시트 이벤트 ──
  event: {
    onRenderFirstFinish: function (evtParam) {
      // 시트 생성이 끝난 시점 — 이때 데이터를 로드한다.
      evtParam.sheet.loadSearchData(ib.data)
    },
    // [directExcelData 여러 파일 전용] 원본 시트 하나로 여러 파일을 순차로 받을 때,
    //   한 파일 다운로드가 끝나면(onExportFinish) 다음 그룹 파일을 이어서 받기 위한 콜백.
    //   ib.chain 이 켜져 있을 때만 동작(다른 다운로드에는 간섭하지 않음).
    onExportFinish: function (evtParam) {
      if (!ib.chain) return
      ib.log("  ✔ " + ib.chainKeys[ib.chainIdx] + ".xlsx 완료")
      ib.chainIdx++
      if (ib.chainIdx < ib.chainKeys.length) ib.fireDirect(evtParam.sheet)   // 다음 그룹 파일
      else { ib.chain = false; ib.log("전체 완료") }                          // 마지막이면 종료
    }
  },

  //── directExcelData "여러 파일" 순차 다운로드 진행 상태 (위 onExportFinish 가 참고) ──
  chain: false,          // 순차 다운로드 진행 중인지 여부
  chainGroups: {},       // { 그룹키: 행배열 }
  chainKeys: [],         // 그룹키 목록(다운로드 순서)
  chainIdx: 0,           // 지금 몇 번째 그룹인지
  chainDownCols: "",     // 다운로드할 컬럼 순서
  // 현재 그룹 하나를 directExcelData 로 내려받는다.
  //   directExcelData: 시트에 로드된 데이터가 아니라, 넘긴 JSON 배열을 그대로 엑셀로 만든다(임시 시트 불필요).
  fireDirect: function (srcSheet) {
    var k = this.chainKeys[this.chainIdx]
    var fn = k + "_directExcelData.xlsx"        // 임시시트 방식 파일과 이름이 겹치지 않게 표시(구분용)
    this.log("directExcelData: " + fn)
    srcSheet.exportData({
      directExcelData: this.chainGroups[k],     // ← 이 JSON 을 그대로 다운로드
      fileName: fn, sheetName: String(k),
      downCols: this.chainDownCols, downHeader: true
    })
  },

  //── 시트 생성 ──
  create: function () {
    var options = this.init
    options.Events = this.event
    IBSheet.create({ id: "sheet", el: "sheetDiv", options: options })
  },

  //── 화면 로그 출력 ──
  log: function (msg) {
    var el = document.getElementById("log")
    el.textContent += msg + "\n"
    el.scrollTop = el.scrollHeight
  },

  //── [공통] 원본 시트의 전체 행을 keyName(예: "USER") 값으로 그룹화 ──
  //   getSaveJson({ saveMode: 0 }).data = 화면에 로드된 전체 행 배열
  //   반환 예: { "남편": [행,행], "아내": [행,행], "공동": [행,행,행] }
  groupBy: function (srcSheet, keyName) {
    var groups = {}
    srcSheet.getSaveJson({ saveMode: 0 }).data.forEach(function (row) {
      (groups[row[keyName]] = groups[row[keyName]] || []).push(row)
    })
    return groups
  },
  //── [공통] downCols("SEQ|CAT|ITEM|AMT") 순서대로 원본 시트의 컬럼 정의를 뽑아 반환 ──
  //   주의: 여기서 반환하는 건 "원본 컬럼 객체의 참조" 다. 여러 시트에 그대로 공유하면 안 되고,
  //         쓰는 쪽에서 복제해서 넘겨야 한다(아래 함수들에서 JSON 복제).
  pickCols: function (srcSheet, downCols) {
    var colMap = {}
    srcSheet.getUserOptions().Cols.forEach(function (c) { colMap[c.Name] = c })
    return downCols.split("|").map(function (n) { return colMap[n] }).filter(Boolean)
  },

  //=================================================================
  // [방법1] 사용자별로 "각각 별도 파일" 다운로드 (파일 N개) — exportData
  //   exportData 는 "시트 하나 = 파일 하나" 라, 같은 시트를 여러 번 불러 그룹을 나눌 수 없다
  //   (같은 시트 재호출은 뒤 호출이 앞 호출 설정을 덮어써서 마지막 것만 남음).
  //   → 그룹마다 "임시 시트"를 따로 만들어 각각 다운로드한다.
  //=================================================================
  exportPerFile: function (srcSheet, keyName, downCols) {
    var groups = this.groupBy(srcSheet, keyName)   // { 사용자: 행배열 }
    var self = this

    Object.keys(groups).forEach(function (key) {
      // 시트마다 (1) 자기 숨김 div (2) "복제한" 컬럼 정의를 준다.
      //   같은 cols 객체를 여러 시트가 공유하면, IBSheet 가 생성 중 그 객체를 변형해서
      //   2번째 이후 시트의 헤더(글자/색)가 유실된다 → 시트마다 새로 복제해서 넘긴다.
      var d = document.createElement("div"); d.style.display = "none"; document.body.appendChild(d)
      var cols = JSON.parse(JSON.stringify(self.pickCols(srcSheet, downCols)))
      // sync 를 주지 않아 "비동기" 생성 → 그룹(=시트)이 많아도 화면이 멈추지 않는다.
      IBSheet.create({
        el: d,
        options: {
          Cols: cols,
          Events: {
            // 시트 생성이 끝나면, 그 임시 시트가 자기 데이터를 파일로 내려받는다.
            onRenderFirstFinish: function (evtParam) {
              evtParam.sheet.exportData({ fileName: key + ".xlsx", sheetName: String(key), downHeader: true })
            },
            // 다운로드가 끝나면 임시 시트와 임시 div 를 정리한다.
            onExportFinish: function (e) { e.sheet.dispose(); d.remove() }
          }
        },
        data: groups[key]   // 이 그룹의 행만 담는다
      })
      self.log("파일: " + key + ".xlsx (" + groups[key].length + "행)")
    })
  },

  //=================================================================
  // [방법2] "한 파일"에 사용자별 "워크시트"로 나눠 다운로드 (파일 1개) — exportDataBuffer
  //   exportDataBuffer(true) 로 시작하면, 이후 각 시트의 exportData 는 "파일"이 아니라
  //   "워크시트"로 버퍼에 쌓인다 → exportDataBuffer(false) 로 한 엑셀 파일로 묶어 다운로드.
  //   그룹마다 임시 시트를 만들어 워크시트 하나씩으로 넣는다.
  //=================================================================
  exportWorksheets: function (srcSheet, keyName, downCols, fileName) {
    var groups = this.groupBy(srcSheet, keyName)
    var made = []                                  // 만든 임시 시트 목록(뒤에서 dispose 용)
    var self = this

    Object.keys(groups).forEach(function (key) {
      // 방법1과 같은 이유로 시트마다 자기 div + 복제한 cols (공유하면 2번째+ 워크시트 헤더 유실)
      var d = document.createElement("div"); d.style.display = "none"; document.body.appendChild(d)
      var cols = JSON.parse(JSON.stringify(self.pickCols(srcSheet, downCols)))
      var s = IBSheet.create({ el: d, options: { Cols: cols }, data: groups[key], sync: 1 })   // 반환값 = 생성된 시트 객체
      made.push({ sheet: s, key: key, div: d })   // 정리용으로 div 도 보관
    })

    var host = made[0].sheet                       // 버퍼 시작/종료는 아무 시트로나 호출(여기선 첫 시트)
    host.exportDataBuffer(true)                              // 버퍼 시작
    made.forEach(function (m, idx) {
      var param = { sheetName: m.key, downHeader: true }     // sheetName = 워크시트 탭 이름
      if (idx === 0) param.fileName = fileName               // 파일명은 "첫" exportData 에만 지정하면 됨
      m.sheet.exportData(param)                              // 파일이 아니라 워크시트로 버퍼에 누적
    })
    host.exportDataBuffer(false)                             // 버퍼 종료 → 한 파일로 다운로드 시작
    this.log("파일: " + fileName + " (워크시트: " + Object.keys(groups).join(", ") + ")")

    // 다운로드가 시작된 뒤 임시 시트 정리(즉시 dispose 하면 버퍼 다운로드 전에 사라질 수 있어 살짝 지연)
    setTimeout(function () { made.forEach(function (m) { if (m.sheet) { m.sheet.dispose(); m.div.remove() } }) }, 1500)
  },

  //=================================================================
  // [방법3] directExcelData 로 "여러 파일" 다운로드 (임시 시트 없음)
  //   임시 시트를 만들지 않고, 원본 시트 하나에 그룹 데이터(JSON)를 directExcelData 로 넘겨가며 받는다.
  //   같은 시트를 반복 사용하므로 "앞 파일이 끝나면(onExportFinish) 다음 그룹"을 넣는 순차 방식이 필요하다.
  //   장점: 시트를 새로 안 만들어 그룹이 많을 때 가볍다.
  //   참고: directExcelData 는 데이터 행 머지·합계행·셀 색상 등 런타임 서식은 반영되지 않는다.
  //=================================================================
  exportDirectPerFile: function (srcSheet, keyName, downCols) {
    this.chainGroups = this.groupBy(srcSheet, keyName)
    this.chainKeys = Object.keys(this.chainGroups)
    this.chainDownCols = downCols
    this.chainIdx = 0
    this.chain = true            // 위 onExportFinish 가 "다음 그룹"을 이어받도록 켠다
    this.fireDirect(srcSheet)    // 첫 그룹 시작 → 끝나면 onExportFinish 가 다음 그룹을 호출
  },

  //=================================================================
  // [방법4] directExcelData + 버퍼로 "한 파일에 워크시트 여러 개" (임시 시트 없음)
  //   버퍼는 한 번에 묶어서 받으므로, 순차(onExportFinish) 없이 그룹별 directExcelData 를 연달아 넣으면 된다.
  //=================================================================
  exportDirectWorksheets: function (srcSheet, keyName, downCols, fileName) {
    var groups = this.groupBy(srcSheet, keyName)
    var keys = Object.keys(groups)
    srcSheet.exportDataBuffer(true)                          // 버퍼 시작
    keys.forEach(function (k, i) {
      var p = { directExcelData: groups[k], sheetName: String(k), downCols: downCols, downHeader: true }
      if (i === 0) p.fileName = fileName                     // 파일명은 첫 호출에만
      srcSheet.exportData(p)                                 // 원본 시트 하나로 워크시트 누적
    })
    srcSheet.exportDataBuffer(false)                         // 버퍼 종료 → 한 파일
    this.log("파일: " + fileName + " (워크시트: " + keys.join(", ") + ")")
  },

  //── 버튼 클릭 처리 ──
  sampleBtn: function (obj) {
    switch (obj.textContent) {
      case '사용자별 여러 파일':
        this.log("=== 사용자별 여러 파일 (임시시트) ===")
        this.exportPerFile(sheet, "USER", "SEQ|CAT|ITEM|AMT")
        break
      case '여러 파일 (directExcelData)':
        this.log("=== 여러 파일 (directExcelData, 임시시트 없음) ===")
        this.exportDirectPerFile(sheet, "USER", "SEQ|CAT|ITEM|AMT")
        break
      case '한 파일 워크시트':
        this.log("=== 한 파일, 사용자별 워크시트 (임시시트) ===")
        this.exportWorksheets(sheet, "USER", "SEQ|CAT|ITEM|AMT", "가계부.xlsx")
        break
      case '워크시트 (directExcelData)':
        this.log("=== 한 파일 워크시트 (directExcelData, 임시시트 없음) ===")
        this.exportDirectWorksheets(sheet, "USER", "SEQ|CAT|ITEM|AMT", "가계부_directExcelData.xlsx")
        break
      case '로그 지우기':
        document.getElementById("log").textContent = ""
        break
    }
  },

  //── 조회 데이터 (맞벌이 부부 가계부: 사용자 = 남편/아내/공동) ──
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
