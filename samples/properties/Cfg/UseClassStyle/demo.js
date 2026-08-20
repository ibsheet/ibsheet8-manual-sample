var ib = ib || {};
ib = {
  //시트 초기화 구문
  'init': {
    "Cfg": {
      "SearchMode": 2,
      "HeaderCheck": 0,
      "IgnoreFocused": 1,
      "UseClassStyle": 1      // 시트 div에 인라인 style이 없으면 class(.ucsSheetBox)의 width/height를 크기로 사용
    },
    "Cols": [
      { "Header": "수량 (qt)",  "Name": "qt",  "Type": "Int", "FormulaRow": "Sum",           "RelWidth": 1, "Align": "Right" },
      { "Header": "금액 (amt)", "Name": "amt", "Type": "Int", "FormulaRow": "합계 {Sum} 원",  "RelWidth": 1, "Align": "Right" }
    ]
  },
  //시트 이벤트
  'event': {
    onRenderFirstFinish: function (evt) {
      evt.sheet.loadSearchData(ib.data);
    }
  },
  //시트 생성
  'create': function () {
    this.init.Events = this.event;
    IBSheet.create({ id: "sheet", el: "sheetDiv", options: this.init });
  },
  //조회 데이터
  'data': [
    { "qt": 10, "amt": 5000 },
    { "qt": 20, "amt": 3000 },
    { "qt": 15, "amt": 8000 }
  ]
};
ib.create();
