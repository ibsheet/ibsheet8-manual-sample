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
    {"Header": "추가 수정 가능","Type": "Text","Name": "sCol1","Width": 200,"Align": "Center", AddEdit: 1},
    {"Header": "추가 수정 불가","Type": "Text","Name": "sCol2","Width": 200,"Align": "Center", AddEdit: 0}
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
'data':[{"sCol1":"장순연","sCol2":"굿바이 싱글"},{"sCol1":"김정호","sCol2":"봉이 김선달"},{"sCol1":"정상호","sCol2":"도리를 찾아서"},{"sCol1":"안수현","sCol2":"레전드 오브 타잔"},{"sCol1":"박만우","sCol2":"사냥"},{"sCol1":"최호건","sCol2":"나우 유 씨 미 2"},{"sCol1":"이민후","sCol2":"인디펜던스 데이 : 리써전스"},{"sCol1":"김호정","sCol2":"정글북"},{"sCol1":"김호수","sCol2":"컨저링 2"},{"sCol1":"오미려","sCol2":"500일의 썸머"},{"sCol1":"차수식","sCol2":"곡성"},{"sCol1":"맹인주","sCol2":"본 얼티메이텀"},{"sCol1":"전명준","sCol2":"부산행"}]
}
ib.create();

function fn_addRow() {
  sheet.addRow();
}