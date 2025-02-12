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
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "조회 수정 가능","Type": "Text","Name": "sCol1","Width": 200,"Align": "Center", ChangeEdit: 1},
    {"Header": "조회 수정 불가","Type": "Text","Name": "sCol2","Width": 200,"Align": "Center", ChangeEdit: 0}
  ]
},
//시트 이벤트
'event':{
  onRenderFirstFinish: function (evt) {
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
'data':[{"sCol1":"보헤미안랩소디","sCol2":"한국"},{"sCol1":"국가부도의날","sCol2":"일본"},{"sCol1":"범블비","sCol2":"중국"},{"sCol1":"완벽한타인","sCol2":"인도"},{"sCol1":"로마","sCol2":"미국"},{"sCol1":"신데렐라","sCol2":"캐나다"},{"sCol1":"뷰티풀데이즈","sCol2":"독일"},{"sCol1":"신과함께-인과연","sCol2":"프랑스"},{"sCol1":"박물관이진짜살아있다","sCol2":"영국"},{"sCol1":"해피투게더","sCol2":"브라질"},{"sCol1":"안시성","sCol2":"베트남"},{"sCol1":"원더풀고스트","sCol2":"멕시코"},{"sCol1":"카메라를멈추면안돼!","sCol2":"아르헨티나"}]
}
ib.create();

function fn_addRow() {
  sheet.addRow();
}