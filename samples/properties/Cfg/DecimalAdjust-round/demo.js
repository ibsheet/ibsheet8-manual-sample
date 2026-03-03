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
    "DecimalAdjust" : "ceil" // 전역 기본값
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
    {Header: "원본", Type: "Float", Name: "sData", Width: 100}, //기본 소숫점 6자리까지 표시
    {Header: "정수(올림)", Type: "Int", Name: "sInt", Width: 100 }, // Cfg(ceil) 적용
    {Header: "실수(내림)", Type: "Float", Name: "nFloat_floor", Width: 100, Format: "#,##0.###",DecimalAdjust: "floor" }, // Col이 Cfg를 덮어씀
    {Header: "실수(반올림)", Type: "Float", Name: "nFloat_ceil", Width: 100, Format: "#,##0.###",DecimalAdjust: "round" } // Col이 Cfg를 덮어씀
    
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
'data':[
  {"sData":"6290.9381","nFloat_floor":"6290.9381","sInt":"6290.9381","nFloat_ceil":"6290.9381"},
  {"sData":"9345.0219","nFloat_floor":"9345.0219","sInt":"9345.0219","nFloat_ceil":"9345.0219"},
  {"sData":"45.0295","nFloat_floor":"45.0295","sInt":"45.0295","nFloat_ceil":"45.0295","nFloat_ceilDecimalAdjust":"floor"}
  ]
}
ib.create();
