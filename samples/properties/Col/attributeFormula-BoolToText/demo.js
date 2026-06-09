var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "StatusType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},
      {"Header": "조건", "Type": "Text", "Name": "Trigger", "Width": 110, "CanEdit": 1, "Align": "Center"},

      // Bool 출발 → Trigger가 "label"이면 Text 전환 + 값 라벨 변환
      // Bool은 보조 속성 없음 → Text 전환은 단순하지만 값을 표시용으로 직접 바꿔야 함
      {"Header": "상태", "Type": "Bool", "Name": "Status", "Width": 140, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          if (fr.Row["Trigger"] == "label") {
            // 1/0 값을 라벨로 변환 후 Text 전환
            fr.Row["Status"] = fr.Row["Status"] ? "활성" : "비활성";
            return "Text";
          }
          // 그 외: Bool 유지 (return 없음)
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
    {Trigger: "checkbox", Status: 1},  // Bool 유지 — 체크박스
    {Trigger: "checkbox", Status: 0},  // Bool 유지 — 빈 체크박스
    {Trigger: "label",    Status: 1},  // Text 전환 — "활성"
    {Trigger: "label",    Status: 0}   // Text 전환 — "비활성"
  ]
};
ib.create();
