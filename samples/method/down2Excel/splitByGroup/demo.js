var EXPORT_URL = "https://api.ibsheet.com/ibsheet/v8/";   // down2Excel 서버 URL

var ib = ib || {}
ib = {
  //시트 초기화 구문
  'init': {
    "Cfg": { "SearchMode": 2, "Export": { "Url": EXPORT_URL } },
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
      evtParam.sheet.loadSearchData(ib.data)
    },
    // 방법2(체이닝) 전용: 체이닝 세션이 켜져 있을 때만 앞 파일 완료 후 다음 파일 다운로드
    onExportFinish: function (evtParam) {
      if (!ib.chain) return
      ib.log("  ✔ " + ib.chainFiles[ib.chainIdx].fileName + " 완료")
      ib.chainIdx++
      if (ib.chainIdx < ib.chainFiles.length) {
        ib.log("down2Excel: " + ib.chainFiles[ib.chainIdx].fileName)
        evtParam.sheet.down2Excel(ib.chainFiles[ib.chainIdx])
      } else {
        ib.chain = false
        ib.log("전체 완료")
      }
    }
  },

  //체이닝 상태
  chain: false, chainFiles: [], chainIdx: 0,

  //시트객체 생성
  create: function () {
    var options = this.init
    options.Events = this.event
    IBSheet.create({ id: "sheet", el: "sheetDiv", options: options })
  },

  //로그 출력
  log: function (msg) {
    var el = document.getElementById("log")
    el.textContent += msg + "\n"
    el.scrollTop = el.scrollHeight
  },

  //USER 별 데이터행 index(1부터) → downRows 문자열용
  filesByUser: function () {
    var map = {}
    sheet.getSaveJson({ saveMode: 0 }).data.forEach(function (row, i) {
      (map[row.USER] = map[row.USER] || []).push(i + 1)
    })
    return Object.keys(map).map(function (k) {
      return { fileName: k + ".xlsx", downRows: map[k].join("|") }
    })
  },

  //방법3: 그룹마다 임시 시트 → down2ExcelBuffer 로 워크시트 누적 → 한 파일
  worksheets: function () {
    var groups = {}
    sheet.getSaveJson({ saveMode: 0 }).data.forEach(function (row) {
      (groups[row.USER] = groups[row.USER] || []).push(row)
    })
    var cols = sheet.getUserOptions().Cols
    var box = document.createElement("div"); box.style.display = "none"; document.body.appendChild(box)
    var made = []
    Object.keys(groups).forEach(function (key) {
      // IBSheet.create 는 생성된 시트 객체를 반환한다 → window[id] 전역 대신 반환값을 사용
      var s = IBSheet.create({ el: box, options: { Cfg: { Export: { Url: EXPORT_URL } }, Cols: cols }, data: groups[key], sync: 1 })
      made.push({ sheet: s, key: key })
    })
    var host = made[0].sheet
    host.down2ExcelBuffer(true)                            // 버퍼 시작
    made.forEach(function (m, idx) {
      var p = { sheetName: m.key }
      if (idx === 0) p.fileName = "가계부.xlsx"             // 파일명은 첫 down2Excel 에만
      m.sheet.down2Excel(p)                                // 워크시트로 누적
    })
    host.down2ExcelBuffer(false)                           // 버퍼 종료 → 한 파일
    this.log("파일: 가계부.xlsx (워크시트: " + Object.keys(groups).join(", ") + ")")
    setTimeout(function () { made.forEach(function (m) { if (m.sheet) m.sheet.dispose() }) }, 2000)
  },

  //화면 기능
  sampleBtn: function (obj) {
    switch (obj.textContent) {
      case '여러 파일 (downRows+useXhr)':
        // 방법1: 한 시트에서 downRows 로 골라 useXhr:1 로 연달아 (같은 도메인일 때 간편)
        this.log("=== 여러 파일 (downRows + useXhr:1) ===")
        this.filesByUser().forEach(function (f) {
          ib.log("down2Excel: " + f.fileName + "  downRows=" + f.downRows)
          sheet.down2Excel({ fileName: f.fileName, downRows: f.downRows, useXhr: 1 })
        })
        break
      case '여러 파일 (체이닝)':
        // 방법2: onExportFinish 에서 다음 파일 (크로스도메인에서도 동작)
        this.log("=== 여러 파일 (onExportFinish 체이닝) ===")
        this.chainFiles = this.filesByUser(); this.chainIdx = 0; this.chain = true
        this.log("down2Excel: " + this.chainFiles[0].fileName)
        sheet.down2Excel(this.chainFiles[0])
        break
      case '한 파일 워크시트 (buffer)':
        // 방법3: down2ExcelBuffer 로 한 파일에 워크시트 분리
        this.log("=== 한 파일 워크시트 (down2ExcelBuffer) ===")
        this.worksheets()
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