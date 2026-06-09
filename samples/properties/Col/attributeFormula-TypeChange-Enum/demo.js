var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "ResultType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},

      // 검사 항목 (Enum 고정)
      {"Header": "검사 항목", "Type": "Enum", "Name": "Item",
        "Enum": "|시력|색맹|청력", "EnumKeys": "|VIS|COL|HEAR",
        "Width": 120, "CanEdit": 1, "Align": "Center"},

      // 결과 — 검사 항목에 따라 Type 자체가 Text 또는 Enum으로 동적 변경
      // 시력 → Text (자유 입력: "1.5", "0.8" 등 수치)
      // 색맹 → Enum (사전 정의된 진단명 옵션)
      // 청력 → Enum (사전 정의된 진단명 옵션)
      // ※ Related는 Enum 옵션만 바꿈 — Type 자체를 Text↔Enum로 전환하려면 TypeFormula 필요
      {"Header": "결과", "Type": "Text", "Name": "Result",
        "Width": 200, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          var item = fr.Row["Item"];

          if (item == "COL") {
            // 색맹 → Enum 옵션 (Type/옵션/값 정합성을 함수 안에서 함께 처리)
            fr.Row[fr.Col + "Enum"]     = "|정상|적록색맹|청황색맹";
            fr.Row[fr.Col + "EnumKeys"] = "|N|RG|BY";
            return "Enum";
          }
          if (item == "HEAR") {
            // 청력 → Enum 옵션
            fr.Row[fr.Col + "Enum"]     = "|정상|경도난청|중도난청";
            fr.Row[fr.Col + "EnumKeys"] = "|N|MILD|MOD";
            return "Enum";
          }
          // 시력(VIS): Text 자유 입력
          // 이전 enum 키 값("N", "RG" 등)이 남아있으면 의미 없으므로 빈 값으로 초기화
          var enumKeys = "N|RG|BY|MILD|MOD".split("|");
          if (enumKeys.indexOf(String(fr.Row[fr.Col])) >= 0) {
            fr.Row[fr.Col] = "";
          }
          return "Text";
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
  // 검사 항목에 따라 결과 컬럼의 Type이 Text/Enum으로 다르게 표시됨
  'data': [
    {Item: "VIS",  Result: "1.5"},     // Text — 자유 입력
    {Item: "VIS",  Result: "0.8"},     // Text — 자유 입력
    {Item: "COL",  Result: "N"},       // Enum — 정상
    {Item: "COL",  Result: "RG"},      // Enum — 적록색맹
    {Item: "HEAR", Result: "N"},       // Enum — 정상
    {Item: "HEAR", Result: "MILD"}     // Enum — 경도난청
  ]
};
ib.create();
