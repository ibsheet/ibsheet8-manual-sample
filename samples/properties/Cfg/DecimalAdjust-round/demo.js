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
    DecimalAdjust: "round"
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
    {Header: "원본", Type: "Float", Name: "nFloat", Width: 100},
    {Header: "근사값", Type: "Float", Name: "nFloat2", Width: 100, Format: "#,##0.##"}
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
'data':[{"nFloat":"6290.9301","nFloat2":"6290.9301"},{"nFloat":"9345.0219","nFloat2":"9345.0219"},{"nFloat":"8041.7922","nFloat2":"8041.7922"},{"nFloat":"8574.3282","nFloat2":"8574.3282"},{"nFloat":"9884.4996","nFloat2":"9884.4996"},{"nFloat":"9765.0396","nFloat2":"9765.0396"},{"nFloat":"7818.2008","nFloat2":"7818.2008"},{"nFloat":"8879.0066","nFloat2":"8879.0066"}]
}
ib.create();

document.querySelector("#sel").addEventListener("change", function(evt) {
  sheet.dispose();
  ib.init.Cfg.DecimalAdjust = evt.target.value;
  ib.create();
})