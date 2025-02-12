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
    {"Header": ["추가 수정 가능", "조회 수정 가능"],"Type": "Text","Name": "sCheck","Width": 200,"Align": "Center", AddEdit: 1, ChangeEdit: 1},
    {"Header": ["추가 수정 가능", "조회 수정 불가"],"Type": "Text","Name": "sClear","Width": 200,"Align": "Center", AddEdit: 1, ChangeEdit: 0},
    {"Header": ["추가 수정 불가", "조회 수정 가능"],"Type": "Text","Name": "sEtc","Width": 200,"Align": "Center", AddEdit: 0, ChangeEdit: 1},
    {"Header": ["추가 수정 불가", "조회 수정 불가"],"Type": "Text","Name": "sButton","Width": 200,"Align": "Center", AddEdit: 0, ChangeEdit: 0}
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
'data':[{"sCheck":"장순연","sCheckChecked":1,"sClear":"굿바이 싱글","sEtc":"보헤미안랩소디","sButton":"한국"},{"sCheck":"김정호","sClear":"봉이 김선달","sEtc":"국가부도의날","sButton":"일본"},{"sCheck":"정상호","sClear":"도리를 찾아서","sEtc":"범블비","sButton":"중국"},{"sCheck":"안수현","sCheckChecked":1,"sClear":"레전드 오브 타잔","sEtc":"완벽한타인","sButton":"인도"},{"sCheck":"박만우","sClear":"사냥","sEtc":"로마","sButton":"미국"},{"sCheck":"최호건","sClear":"나우 유 씨 미 2","sEtc":"신데렐라","sButton":"캐나다"},{"sCheck":"이민후","sClear":"인디펜던스 데이 : 리써전스","sEtc":"뷰티풀데이즈","sButton":"독일"},{"sCheck":"김호정","sClear":"정글북","sEtc":"신과함께-인과연","sButton":"프랑스"},{"sCheck":"김호수","sCheckChecked":1,"sClear":"컨저링 2","sEtc":"박물관이진짜살아있다","sButton":"영국"},{"sCheck":"오미려","sClear":"500일의 썸머","sEtc":"해피투게더","sButton":"브라질"},{"sCheck":"차수식","sClear":"곡성","sEtc":"안시성","sButton":"베트남"},{"sCheck":"맹인주","sClear":"본 얼티메이텀","sEtc":"원더풀고스트","sButton":"멕시코"},{"sCheck":"전명준","sClear":"부산행","sEtc":"카메라를멈추면안돼!","sButton":"아르헨티나"}]}
ib.create();

function fn_addRow() {
  sheet.addRow();
}