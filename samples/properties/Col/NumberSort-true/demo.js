var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    "MessageWidth": 300,
    "IgnoreFocused": 1,
    CanSort: 1
  },
  "Def": {
    "Row": {
      "CanFormula": true
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 100,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "문자열(Text)","Type": "Text","Name": "TextData","Width": 150,"Align": "Center","CanEdit": 1, NumberSort: 1},
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish: function(evt) {
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
//조회 데이터
'data':[{"TextData":"1"},{"TextData":"11"},{"TextData":"2"},{"TextData":"22"},{"TextData":"3"},{"TextData":"33"},{"TextData":"4"},{"TextData":"44"},{"TextData":"5"},{"TextData":"55"},{"TextData":"6"},{"TextData":"66"},{"TextData":"7"},{"TextData":"77"},{"TextData":"8"},{"TextData":"88"},{"TextData":"9"},{"TextData":"99"},{"TextData":"101"}]
}
ib.create();