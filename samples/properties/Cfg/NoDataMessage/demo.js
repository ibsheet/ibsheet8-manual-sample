var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "MessageWidth": 300,
    "FitWidth": 1,
    NoDataMessage: 3,
    NoDataMiddle: 1
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
    {"Header": "컬럼1", "Type": "Text", "Name": "sCol1", "WIdth": 100},
    {"Header": "컬럼2", "Type": "Text", "Name": "sCol2", "WIdth": 100},
    {"Header": "컬럼3", "Type": "Text", "Name": "sCol3", "WIdth": 100},
    {"Header": "컬럼4", "Type": "Text", "Name": "sCol4", "WIdth": 100},
    {"Header": "컬럼5", "Type": "Text", "Name": "sCol5", "WIdth": 100},
    {"Header": "컬럼6", "Type": "Text", "Name": "sCol6", "WIdth": 100},
    {"Header": "컬럼7", "Type": "Text", "Name": "sCol7", "WIdth": 100},
    {"Header": "컬럼8", "Type": "Text", "Name": "sCol8", "WIdth": 100},
    {"Header": "컬럼9", "Type": "Text", "Name": "sCol9", "WIdth": 100},
    {"Header": "컬럼10", "Type": "Text", "Name": "sCol10", "WIdth": 100}
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
//화면 기능
'sampleBtn':function () {
},
//조회 데이터
'data':[{}]
}
ib.create();