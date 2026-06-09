var ib = ib || {};
ib = {
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1,
        // CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "AmountType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},

      // 통화 선택 (Enum)
      {"Header": "통화", "Type": "Enum", "Name": "Currency",
        "Enum": "|원화|달러", "EnumKeys": "|KRW|USD",
        "Width": 100, "CanEdit": 1, "Align": "Center"},

      // 금액 — Text 출발, 통화에 따라 Int(원화) 또는 Float(달러)로 동적 전환
      // 원화 → Int + Format "#,##0" (정수, 소수점 없음)
      // 달러 → Float + Format "#,##0.##" (소수점 표시)
      {"Header": "금액", "Type": "Text", "Name": "Amount", "Width": 180, "CanEdit": 1, "Align": "Right",
        TypeFormula: function(fr) {
          var currency = fr.Row["Currency"];

          if (currency == "KRW") {
            fr.Row["AmountFormat"] = "#,##0";   // 정수 표시
            return "Int";
          }
          if (currency == "USD") {
            fr.Row["AmountFormat"] = "#,##0.##"; // 소수점 표시
            return "Float";
          }
          return "Text"; // 통화 미선택: Text 유지
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
  // 행마다 다른 통화 — 글로벌 거래 명세서 시나리오
  'data': [
    {Currency: "KRW", Amount: 1500000},   // 원화 — Int 표시 "1,500,000"
    {Currency: "KRW", Amount: 2800000},   // 원화 — Int 표시 "2,800,000"
    {Currency: "USD", Amount: 1290.99},   // 달러 — Float 표시 "1,290.99"
    {Currency: "USD", Amount: 1500},      // 달러 — Float 표시 "1,500" (소수 없으면 생략)
    {Currency: "USD", Amount: 75.5}       // 달러 — Float 표시 "75.5"
  ]
};
ib.create();
