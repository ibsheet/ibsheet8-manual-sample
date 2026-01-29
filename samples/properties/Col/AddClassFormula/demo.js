var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
   
  },
  "Def": {
    "Col": {
      "Width": 100
    },"Row":{
      "Height":35,
      "CanFormula":1,
      "CalcOrder":"btn3AddClass" //Formula설정한 컬럼이름+attribute(AddClass)
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header":"No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "데이터","Type": "Enum","Name": "enumData","Width": 100,Enum:"|대기|진행중|완료",EnumKeys:"|01|02|03"},
    {"Header": "버튼","Type": "Button","Name": "btn3","Width": 100, ButtonWidth :"70", AddClassFormula:function(fr) {
      //enum에 설정한 데이터를 Button 의 Text로 설정한다.
      fr.Row["btn3"] = fr.Sheet.getString(fr.Row,"enumData");
      let ButtonDesing = "";
      if(fr.Row["enumData"] =="01"){
        ButtonDesing = "myBtn1";
      }else if(fr.Row["enumData"] =="02"){
        ButtonDesing = "myBtn2";
      }else  if(fr.Row["enumData"] =="03"){
        ButtonDesing = "myBtn3";
      }

      return ButtonDesing;
    }},
   
  ]
},
//시트 이벤트
'event':{
	onRenderFirstFinish: function(evtParam) {
		evtParam.sheet.loadSearchData(loadData);
	}
},
//시트객체 생성
'create':function () {
    var options = this.init;

    options.Events = this.event;
    IBSheet.create({
      id: 'sheet', // 생성할 시트의 id
      el: 'sheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options // 생성될 시트의 속성
    });
  },
//화면 기능
'sampleBtn':function () {
  }
}
ib.create();

var loadData = [
	{"enumData":"01"},
	{"enumData":"02"},
	{"enumData":"03"},
 	{"enumData":""}
	
];