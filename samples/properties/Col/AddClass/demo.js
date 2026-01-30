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
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header":"No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
   {"Header": "기본 디자인","Type": "Button","Name": "btn1","Width": 100},
    {"Header": "변경 디자인","Type": "Button","Name": "btn2","Width": 100,"AddClass":"myButtonDesign","ButtonWidth":"60"},
   
  ]
},
//시트 이벤트
'event':{
	onRenderFirstFinish: function(evtParam) {
		evtParam.sheet.loadSearchData(loadData);
	},
	onClick:function(evtParam) {
    var sheet = evtParam.sheet;
    var msg = `
    ${evtParam.row.HasIndex}행 
    [${sheet.getString(sheet.getRowById("Header"), evtParam.col)}] 열 
    <span style="color:red">${sheet.getValue(evtParam.row, evtParam.col)}</span> 버튼이 클릭되었습니다.`; 
		evtParam.sheet.showMessageTime({
    	message:msg,
      time:1500, //1.5초
      buttons:["OK"]
    });
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
	{"btn1":"보류", "btn2":"보류"},
  {"btn1":"", "btn2":""}
];