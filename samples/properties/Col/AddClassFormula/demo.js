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
    {"Header": "데이터","Type": "Enum","Name": "enumData","Width": 100,Enum:"|대기|진행중|완료|표시안함",EnumKeys:"|01|02|03|04"},
    {"Header": "버튼","Type": "Button","Name": "btn3","Width": 100, ButtonWidth :"70", 
    // AddClassFormula: enum 데이터 값에 따라 버튼 텍스트와 디자인 클래스 지정
    AddClassFormula:function(fr) {
      // 현재 행의 "btn3" 버튼 텍스트를 enumData 값으로 설정
      fr.Row["btn3"] = fr.Sheet.getString(fr.Row,"enumData");

      // 버튼 디자인 클래스를 저장할 변수
      let ButtonDesing = "";

      // enumData 값에 따라 버튼 CSS 클래스 지정
      if(fr.Row["enumData"] =="01"){
        ButtonDesing = "myBtn1"; // enumData : 01 → 버튼1 스타일
      }else if(fr.Row["enumData"] =="02"){
        ButtonDesing = "myBtn2";  // enumData : 02 → 버튼2 스타일
      }else  if(fr.Row["enumData"] =="03"){
        ButtonDesing = "myBtn3"; //enumData : 03 → 버튼3 스타일
      }else{
         // 버튼 표시 안 함
        fr.Row["btn3"] = ""; //버튼 텍스트 비움 → 버튼 숨김
        fr.Row["btn3Cursor"] = "default"; // 마우스 포인터 기본으로 변경
        ButtonDesing = "";  // CSS 클래스 없음
      }
      // 반환: 적용할 버튼 디자인 클래스 이름
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
 	{"enumData":"04"}
	
];