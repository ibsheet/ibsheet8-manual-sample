var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    FitWidth: 1
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
    {"Header": "문자열(Text)","Type": "Text","Name": "TextData", MinWidth: 100, RelWidth: 1, "Align": "Center","CanEdit": 1},
    {"Header": "콤보(Enum)","Type": "Enum","Name": "ComboData","Width": 100,"Align": "Right","Enum": "|대기|진행중|완료","EnumKeys": "|01|02|03"},
    {"Header": "버튼(Button)","Type": "Button","Name": "ISO","Width": 120,"Align": "Left","CanEdit": 0,"Button": "Button"},
    {"Header": "정수(Int)","Type": "Int","Name": "IntData","Width": 80,"Align": "Right","CanEdit": 1},
    {"Header": "실수(Float)","Type": "Float","Name": "FloatData","Width": 80,"Align": "Right","CanEdit": 1},
    {"Header": "날짜(Date)","Type": "Date","Name": "DateData","Width": 150,"Align": "Center","CanEdit": 1,"EmptyValue": "날짜를 입력해주세요"}
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
'data':[{"TextData":"장순연","ComboData":"01","ISO":"AUD","Currency":"호주 달러","IntData":0,"FloatData":15.25,"DateData":""},{"TextData":"김정호","ComboData":"02","ISO":"ALL","Currency":"알바니아 렉","IntData":0,"FloatData":234,"DateData":"20100120"},{"TextData":"정상호","ComboData":"01","ISO":"DZD","Currency":"알제리 디나르","IntData":65,"FloatData":123,"DateData":"20020815"},{"TextData":"안수현","ComboData":"02","ISO":"ARS","Currency":"아르헨티나 페소","IntData":190,"FloatData":0,"DateData":"20110526"},{"TextData":"박만우","ComboData":"02","ISO":"AWG","Currency":"아루바 플로린","IntData":1120,"FloatData":115.25,"DateData":"20100922"},{"TextData":"최호건","ComboData":"01","ISO":"GBP","Currency":"영국 파운드","IntData":65,"FloatData":154.36,"DateData":""},{"TextData":"이민후","ComboData":"01","ISO":"BSD","Currency":"바하마 달러","IntData":0,"FloatData":0,"DateData":""},{"TextData":"김호정","ComboData":"02","ISO":"BHD","Currency":"바레인 디나르","IntData":1120,"FloatData":0,"DateData":"20100922"},{"TextData":"김호수","ComboData":"01","ISO":"BDT","Currency":"방글라데시 타카","IntData":65,"FloatData":154.36,"DateData":"",},{"TextData":"오미려","ComboData":"01","ISO":"BBD","Currency":"바베이도스 달러","IntData":190,"FloatData":15.25,"DateData":"20110526"},{"TextData":"차수식","ComboData":"02","ISO":"BYR","Currency":"벨라루스 루블","IntData":1120,"FloatData":115.25,"DateData":"20100922"},{"TextData":"맹인주","ComboData":"01","ISO":"BZD","Currency":"벨리즈 달러","IntData":65,"FloatData":154.36,"DateData":""},{"TextData":"전명준","ComboData":"01","ISO":"BMD","Currency":"버뮤다 달러","IntData":190,"FloatData":15.25,"DateData":"20110526"}]
}
ib.create();