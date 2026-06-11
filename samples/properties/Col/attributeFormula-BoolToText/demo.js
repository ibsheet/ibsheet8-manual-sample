var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "ActiveFlagType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},

      // Bool → Text 전환: 1/0 값을 "활성"/"비활성" 라벨로 표시
      // Bool은 보조 속성 없음 → Text 전환은 단순하지만 값을 표시용으로 직접 바꿔야 함
      {"Header": "상태", "Type": "Bool", "Name": "ActiveFlag", "Width": 140, "Align": "Center",
        TypeFormula: function(fr) {
          // 1/0 값을 라벨로 변환 후 Text 전환
          fr.Row[fr.Col] = fr.Row[fr.Col] ? "활성" : "비활성";
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
    {ActiveFlag: 1},  // → "활성"
    {ActiveFlag: 0},  // → "비활성"
    {ActiveFlag: 1},
    {ActiveFlag: 0}
  ]
};
ib.create();
