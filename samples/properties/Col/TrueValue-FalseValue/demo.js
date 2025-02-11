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
    {"Type": "Int","Width": 100,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": {"Value": "체크박스(Bool)","HeaderCheck": 1},"Type": "Bool","Name": "CheckData","Width": 150,"Align": "Center","CanEdit": 1, TrueValue: "Y", FalseValue: "N"}
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish: function(evt) {
    	evt.sheet.loadSearchData(ib.data);
    },
    onSearchFinish: function(evt) {
      setSheetInfo(evt);
    },
    onAfterChange: function(evt) {
      setSheetInfo(evt);
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
'data':[{"CheckData":"Y"},{"CheckData":"N"},{"CheckData":"Y"},{"CheckData":"Y"},{"CheckData":"N"},{"CheckData":"N"},{"CheckData":"Y"},{"CheckData":"N"},{"CheckData":"Y"},{"CheckData":"N"},{"CheckData":"Y"},{"CheckData":"N"},{"CheckData":"Y"}]
}
ib.create();

function setSheetInfo(evt) {
  document.getElementById('firstRowVal').innerText = evt.sheet.getValue(evt.sheet.getRowById('AR1'), 'CheckData');
  document.getElementById('jsonData').innerText = JSON.stringify(evt.sheet.getSaveJson({saveMode: 0}));
  document.getElementById('stringData').innerText = evt.sheet.getSaveString({saveMode: 0});
}