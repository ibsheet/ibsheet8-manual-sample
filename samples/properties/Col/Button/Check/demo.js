var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    "MessageWidth": 300
  },
  "Def": {
    "Row": {
      "CanFormula": true
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "문자열(Text)","Type": "Text","Name": "TextData","Width": 200,"Align": "Center","CanEdit": 1, Button: "Check"}
  ]
},
//시트 이벤트
'event':{
  onRenderFinish: function (evt) {
    evt.sheet.loadSearchData(ib.data);
  }
},
//시트객체 생성
'create':function () {
    var options = this.init;

    options.Events = this.event;
    IBSheet.create({
      id: 'sheet', // 생성할 시트의 id
      el: 'sheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options, // 생성될 시트의 속성
    });
  },
//화면 기능
'sampleBtn':function () {
},
//조회 데이터
'data':[{"TextData":"장순연","TextDataChecked":1},{"TextData":"김정호"},{"TextData":"정상호"},{"TextData":"안수현","TextDataChecked":1},{"TextData":"박만우"},{"TextData":"최호건"},{"TextData":"이민후"},{"TextData":"김호정"},{"TextData":"김호수","TextDataChecked":1},{"TextData":"오미려"},{"TextData":"차수식"},{"TextData":"맹인주"},{"TextData":"전명준"}]
}
ib.create();