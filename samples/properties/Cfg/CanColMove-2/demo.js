var samplePageObj = samplePageObj||{};
samplePageObj = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "HeaderMerge": 3,
    "CanColMove":2, 
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header": ["No","No"],"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["회사명","회사명"],"Type": "Text","Name": "sCorp","Width": "100","Align": "Center","CanEdit": 1},
    {"Header": ["사원수","사원수"],"Type": "Int","Name": "sPerson","Width": "80","Align": "Right","CanEdit": 1},
    {"Header": ["년월일","Ymd"],"Name": "sDate_Ymd","Extend": {"Type": "Date","Align": "Center","Width": 110,"Format": "yyyy/MM/dd","DataFormat": "yyyyMMdd","EditFormat": "yyyyMMdd","Size": 8,"EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"},"Width": 110},
    {"Header": ["년월일","Ym"],"Name": "sDate_Ym","Extend": {"Type": "Date","Align": "Center","Width": 80,"Format": "yyyy/MM","DataFormat": "yyyyMM","EditFormat": "yyyyMM","Size": 6,"EmptyValue": "<span style='color:#AAA'>년,월 순으로 숫자만 입력해 주세요.</span>"},"Width": 90},
    {"Header": ["년월일","Md"],"Name": "sDate_Md","Extend": {"Type": "Date","Align": "Center","Width": 60,"Format": "MM/dd","EditFormat": "MMdd","DataFormat": "MMdd","Size": 4,"EmptyValue": "<span style='color:#AAA'>월,일 순으로 숫자만 입력해 주세요.</span>"},"Width": 90},
    {"Header": ["시분초","Hms"],"Name": "sDate_Hms","TimePicker": 1,"Extend": {"Type": "Date","Align": "Center","Width": 70,"Format": "HH:mm:ss","EditFormat": "HHmmss","DataFormat": "HHmmss","Size": 8,"EmptyValue": "<span style='color:#AAA'>시,분,초 순으로 8개 숫자만 입력해 주세요.</span>"},"Width": 100},
    {"Header": ["시분초","Hm"],"Name": "sDate_Hm","TimePicker": 1,"Extend": {"Type": "Date","Align": "Center","Width": 70,"Format": "HH:mm","EditFormat": "HHmm","DataFormat": "HHmm","Size": 6,"EmptyValue": "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"},"Width": 90},
    
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish:function (evtParam) {
      //create 함수는 비동기로 동작하므로 생성 직후 동작은 여기서 진행
      var sheet = evtParam.sheet;
      sheet.loadSearchData(samplePageObj.data);
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
  },
//조회 데이터
'data':[{"sCorp":"삼성전자","sPerson":"11196","sPreYear":"9165","sYear":"7147","sGrow":"0.77985","sPreGrow":"0.9","sPay":"6290.9301","sBonus":"545.2073","sNewPerson":"51","sDate_Ymd":"20130423","sDate_Ym":"201304","sDate_Md":"0423","sDate_Hms":"100320","sDate_Hm":"0930","sDate_YmdHms":"20130423091020","sDate_YmdHm":"201304231200","sDate_yyyyMMdd":1563980400000,"sDate_yyyyMM":"201304","sDate_MMddyyyy":"20130423","sDate_ddMMyyyy":"20130423"},{"sCorp":"SK이노베이션","sPerson":"12950","sPreYear":"9265","sYear":"14418","sGrow":"1.55619","sPreGrow":"1.7","sPay":"9345.0219","sBonus":"670.6712","sNewPerson":"94","sDate_Ymd":"20160701","sDate_Ym":"201607","sDate_Md":"0701","sDate_Hms":"091134","sDate_Hm":"0911","sDate_YmdHms":"20130701091134","sDate_YmdHm":"201507010911","sDate_yyyyMMdd":"20160701","sDate_yyyyMM":"201607","sDate_MMddyyyy":"20160701","sDate_ddMMyyyy":"20120701"},{"sCorp":"한국전력공사","sPerson":"10945","sPreYear":"5988","sYear":"12819","sGrow":"2.14078","sPreGrow":"1.7","sPay":"8041.7922","sBonus":"732.6054","sNewPerson":"58","sDate_Ymd":"20160715","sDate_Ym":"201607","sDate_Md":"0715","sDate_Hms":"140715","sDate_Hm":"1412","sDate_YmdHms":"20160715141215","sDate_YmdHm":"201607151412","sDate_yyyyMMdd":"20160715","sDate_yyyyMM":"201607","sDate_MMddyyyy":"20160715","sDate_ddMMyyyy":"20160715"}]
}
samplePageObj.create();
