var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "ComboDataType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},
      {"Header": "회사 (조건)", "Type": "Text", "Name": "TextData", "Width": 120, "CanEdit": 1, "Align": "Center"},

      // Text 출발 → 조건에 따라 Text 유지 또는 Enum 전환
      // Enum 전환 시 fr.Row[컬럼명 + "Enum"]·[컬럼명 + "EnumKeys"]를 셀 단위로 셋팅
      {"Header": "데이터", "Type": "Text", "Name": "ComboData", "Width": 200, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          var company = fr.Row["TextData"];

          if (company == "Amazon") {
            fr.Row["ComboDataEnum"]     = "|A-한국|B-미국|C-일본|D-영국";
            fr.Row["ComboDataEnumKeys"] = "|A|B|C|D";
            return "Enum";
          }
          if (company == "Alphabet") {
            fr.Row["ComboDataEnum"]     = "|01-사과|02-바나나|03-체리|04-수박";
            fr.Row["ComboDataEnumKeys"] = "|01|02|03|04";
            return "Enum";
          }
          // 그 외(삼성 등): Text 유지
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
  'data': [
    {TextData: "삼성",     ComboData: "자유 텍스트"},  // Text
    {TextData: "Amazon",   ComboData: "A"},          // Enum (A-D)
    {TextData: "Alphabet", ComboData: "02"}          // Enum (01-04)
  ]
};
ib.create();
