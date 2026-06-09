var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "TextToFloatType,IntToFloatType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},
      {"Header": "조건", "Type": "Text", "Name": "Trigger", "Width": 100, "CanEdit": 1, "Align": "Center"},

      // 케이스 1: Text 출발 → Float 전환
      // 출발 Type이 Text라 Format이 깨끗한 상태에서 시작 → Format만 셋팅하면 OK
      {"Header": "TextToFloat", "Type": "Text", "Name": "TextToFloat", "Width": 160, "CanEdit": 1, "Align": "Right",
        TypeFormula: function(fr) {
          if (fr.Row["Trigger"] == "convert") {
            fr.Row["TextToFloatFormat"] = "#,##0.##";
            return "Float";
          }
        }
      },

      // 케이스 2: Int 출발 → Float 전환
      // 출발 Type이 Int면 기존 Int Format(#,##0)이 잔존 → Float Format으로 교체 필수
      {"Header": "IntToFloat", "Type": "Int", "Name": "IntToFloat", "Format": "#,##0", "Width": 160, "CanEdit": 1, "Align": "Right",
        TypeFormula: function(fr) {
          if (fr.Row["Trigger"] == "convert") {
            fr.Row["IntToFloatFormat"] = "#,##0.##";
            return "Float";
          }
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
    // Trigger=keep: Type 유지 (TextToFloat은 Text, IntToFloat은 Int)
    {Trigger: "keep",    TextToFloat: "자유 텍스트", IntToFloat: 1500},
    // Trigger=convert: 둘 다 Float 전환 — Format 셋팅으로 소수점 표시
    {Trigger: "convert", TextToFloat: 6290.9301,   IntToFloat: 7500.5},
    {Trigger: "convert", TextToFloat: 1500,        IntToFloat: 2000}
  ]
};
ib.create();
