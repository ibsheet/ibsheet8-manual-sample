var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "ResultDataType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},
      {"Header": "항목", "Type": "Text", "Name": "fieldName", "Width": 120, "CanEdit": 1},

      // Text 출발 → fieldName이 "날짜"일 때만 Date 전환
      // Date 전환 시 Format 3종 셋팅 + 데이터를 timestamp로 변환 필수
      {"Header": "결과", "Type": "Text", "Name": "ResultData", "Width": 180, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          if (fr.Row["fieldName"] != "날짜") return "Text";

          // 문자열 "20240315" → timestamp(ms) 변환 — Date 컬럼이 인식하려면 timestamp 필요
          var s = fr.Row["ResultData"] + "";
          if (s.length === 8) {
            fr.Row["ResultData"] = IBSheet.stringToDate(s, "yyyyMMdd").getTime();
          }
          // Format 3종 셋팅 — 표시·편집·데이터 형식
          fr.Row["ResultDataFormat"]     = "yyyy/MM/dd";
          fr.Row["ResultDataEditFormat"] = "yyyyMMdd";
          fr.Row["ResultDataDataFormat"] = "yyyyMMdd";
          return "Date";
        }
      }
    ]
  },
  'event': {
    onRenderFirstFinish: function(evt) {
      evt.sheet.loadSearchData(ib.data);
    }
  },
  'create': function() {
    var options = this.init;
    options.Events = this.event;
    IBSheet.create({ id: 'sheet', el: 'sheetDiv', options: options });
  },
  'data': [
    {fieldName: "이름",       ResultData: "홍길동"},        // Text 유지
    {fieldName: "날짜",       ResultData: "20240315"},      // Date 전환
    {fieldName: "날짜",       ResultData: "20240601"},      // Date 전환
    {fieldName: "사업자번호", ResultData: "123-45-67890"}   // Text 유지
  ]
};
ib.create();
