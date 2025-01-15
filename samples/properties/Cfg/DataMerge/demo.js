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
    DataMerge: 0
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
    {"Header": "컬럼1", "Type": "Text", "Name": "C1", "Width": 150},
    {"Header": "컬럼2", "Type": "Text", "Name": "C2", "Width": 150},
    {"Header": "컬럼3", "Type": "Text", "Name": "C3", "Width": 150},
    {"Header": "컬럼4", "Type": "Text", "Name": "C4", "Width": 150},
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
'data':[{"C1":"1","C2":"1","C3":"2","C4":"3"},{"C1":"1","C2":"1","C3":"2","C4":"3"},{"C1":"2","C2":"2","C3":"2","C4":"3"},{"C1":"3","C2":"3","C3":"3","C4":"3"}]
}
ib.create();

document.querySelector("#sel").addEventListener("change", function(evt) {
  sheet.setAutoMerge({dataMerge: evt.target.value});
})