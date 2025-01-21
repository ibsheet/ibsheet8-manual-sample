var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "MessageWidth": 300,
    "IgnoreFocused": 1,
    "Size": "Tiny",
    "NoVScroll": 1,
    PrevColumnMerge: 0,
    HeaderMerge: 0,
    DataMerge: 0
  },
  "Def": {
    "Row": {
      "CanFormula": true
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ", "ColMerge": 0}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["1","1","2","2"], "Type": "Text", "Name": "C1", "Width": 150},
    {"Header": ["1","1","1","2"], "Type": "Text", "Name": "C2", "Width": 150},
    {"Header": ["1","1","2","2"], "Type": "Text", "Name": "C3", "Width": 150},
    {"Header": ["1","2","2","2"], "Type": "Text", "Name": "C4", "Width": 150},
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
'data':[{"C1":"0","C2":"0","C3":"0","C4":"0"},{"C1":"0","C2":"0","C3":"1","C4":"0"},{"C1":"0","C2":"0","C3":"1","C4":"1"},{"C1":"0","C2":"1","C3":"1","C4":"1"},{"C1":"1","C2":"0","C3":"0","C4":"0"},{"C1":"1","C2":"0","C3":"1","C4":"0"},{"C1":"1","C2":"0","C3":"1","C4":"1"},{"C1":"1","C2":"1","C3":"1","C4":"1"},{"C1":"1","C2":"1","C3":"1","C4":"0"},{"C1":"1","C2":"1","C3":"0","C4":"1"},{"C1":"1","C2":"0","C3":"1","C4":"1"},{"C1":"1","C2":"0","C3":"1","C4":"0"},{"C1":"1","C2":"0","C3":"0","C4":"1"},{"C1":"1","C2":"0","C3":"0","C4":"0"},{"C1":"0","C2":"1","C3":"1","C4":"1"},{"C1":"0","C2":"1","C3":"1","C4":"0"},{"C1":"0","C2":"1","C3":"0","C4":"1"},{"C1":"0","C2":"0","C3":"1","C4":"1"},{"C1":"0","C2":"0","C3":"1","C4":"0"},{"C1":"0","C2":"0","C3":"0","C4":"1"},{"C1":"0","C2":"0","C3":"0","C4":"0"}]
}
ib.create();

var selElements = document.querySelectorAll(".sel");
for(var ele of selElements) {
	ele.addEventListener("change", function(evt) {
    var head = document.querySelector("#hSel").value;
    var data = document.querySelector("#dSel").value;
    var prev = document.querySelector("#pSel").value;
    //debugger;
    sheet.setAutoMerge({headerMerge: head, dataMerge: data, prevColumnMerge: prev});
  })
}