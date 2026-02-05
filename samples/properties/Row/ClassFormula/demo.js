var samplePageObj = samplePageObj||{};
samplePageObj = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "MaxPages": 3,
    "SuppressMessage": 3,
    "HeaderMerge": 3,
    "SelFocusColor": 1
  },
  Def:{
    Row:{
      CanFormula:1,
      CalcOrder:"Class",
      ClassFormula:function(fr){
        if (fr.Row["sCorp"] == "GS칼텍스") {
              return "rowAlert";
          }
      }
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header": ["No","No"],"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["회사명","회사명"],"Type": "Text","Name": "sCorp","Width": "100","Align": "Center","CanEdit": 1},
    {"Header": ["사원수","사원수"],"Type": "Int","Name": "sPerson","Width": "80","Align": "Right","CanEdit": 1},
    {"Header": ["금년신입","금년신입"],"Type": "Int","Name": "sNewPerson","Width": "80","Align": "Right","CanEdit": 1},
    {"Header": ["평균연봉","평균연봉"],"Type": "Float","Name": "sPay","Width": "100","Align": "Right","CanEdit": 1},
    {"Header": ["평균보너스","평균보너스"],"Type": "Float","Name": "sBonus","Width": "100","Align": "Right","CanEdit": 1},
    {"Header": ["전년매출","전년매출"],"Type": "Int","Name": "sPreYear","Width": "90","Align": "Right","CanEdit": 1,"Format": "#,### 만원"},
    {"Header": ["금년매출","금년매출"],"Type": "Float","Name": "sYear","Width": "80","Align": "Right","CanEdit": 1},
    {"Header": ["전년대비\n 증감율","전년대비\n 증감율"],"Type": "Float","Name": "sGrow","Width": "100","Align": "Right","CanEdit": 1,"Format": "#,##0.##\\%"}
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
'data':[{"sCorp":"삼성전자","sPerson":"11196","sPreYear":"9165","sYear":"7147","sGrow":"0.77985","sPreGrow":"0.9","sPay":"6290.9301","sBonus":"545.2073","sNewPerson":"51","sDate_Ymd":"20130423","sDate_Ym":"201304","sDate_Md":"0423","sDate_Hms":"100320","sDate_Hm":"0930","sDate_YmdHms":"20130423091020","sDate_YmdHm":"201304231200","sDate_yyyyMMdd":1563980400000,"sDate_yyyyMM":"201304","sDate_MMddyyyy":"20130423","sDate_ddMMyyyy":"20130423"},{"sCorp":"SK이노베이션","sPerson":"12950","sPreYear":"9265","sYear":"14418","sGrow":"1.55619","sPreGrow":"1.7","sPay":"9345.0219","sBonus":"670.6712","sNewPerson":"94","sDate_Ymd":"20160701","sDate_Ym":"201607","sDate_Md":"0701","sDate_Hms":"091134","sDate_Hm":"0911","sDate_YmdHms":"20130701091134","sDate_YmdHm":"201507010911","sDate_yyyyMMdd":"20160701","sDate_yyyyMM":"201607","sDate_MMddyyyy":"20160701","sDate_ddMMyyyy":"20120701"},{"sCorp":"한국전력공사","sPerson":"10945","sPreYear":"5988","sYear":"12819","sGrow":"2.14078","sPreGrow":"1.7","sPay":"8041.7922","sBonus":"732.6054","sNewPerson":"58","sDate_Ymd":"20160715","sDate_Ym":"201607","sDate_Md":"0715","sDate_Hms":"140715","sDate_Hm":"1412","sDate_YmdHms":"20160715141215","sDate_YmdHm":"201607151412","sDate_yyyyMMdd":"20160715","sDate_yyyyMM":"201607","sDate_MMddyyyy":"20160715","sDate_ddMMyyyy":"20160715"},{"sCorp":"현대자동차","sPerson":"3339","sPreYear":"1557","sYear":"1873","sGrow":"1.20282","sPreGrow":"0.9","sPay":"8574.3282","sBonus":"542.3125","sNewPerson":"88","sDate_Ymd":"20160701","sDate_Ym":"201607","sDate_Md":"0701","sDate_Hms":"091134","sDate_Hm":"0911","sDate_YmdHms":"20160701091134","sDate_YmdHm":"201807010911","sDate_yyyyMMdd":"20160701","sDate_yyyyMM":"201607","sDate_MMddyyyy":"20160701","sDate_ddMMyyyy":"20160701"},{"sCorp":"GS칼텍스","sPerson":"28595","sPreYear":"3422","sYear":"4448","sGrow":"1.29969","sPreGrow":"1.8","sPay":"9884.4996","sBonus":"631.7733","sNewPerson":"73","sDate_Ymd":"20130423","sDate_Ym":"201304","sDate_Md":"0423","sDate_Hms":"091220","sDate_Hm":"1230","sDate_YmdHms":"20160723101020","sDate_YmdHm":"201204231200","sDate_yyyyMMdd":"20100423","sDate_yyyyMM":"201004","sDate_MMddyyyy":"20180423","sDate_ddMMyyyy":"20110423"},{"sCorp":"포스코","sPerson":"5887","sPreYear":"8585","sYear":"12954","sGrow":"1.50887","sPreGrow":"1.4","sPay":"9765.0396","sBonus":"768.0995","sNewPerson":"76","sDate_Ymd":"20130423","sDate_Ym":"201304","sDate_Md":"0423","sDate_Hms":"091020","sDate_Hm":"1200","sDate_YmdHms":"20130423091020","sDate_YmdHm":"201904231200","sDate_yyyyMMdd":"20130423","sDate_yyyyMM":"201304","sDate_MMddyyyy":"20130423","sDate_ddMMyyyy":"20130423"},{"sCorp":"LG전자","sPerson":"21613","sPreYear":"2693","sYear":"3586","sGrow":"1.33165","sPreGrow":"1.2","sPay":"7818.2008","sBonus":"823.3668","sNewPerson":"86","sDate_Ymd":"20150526","sDate_Ym":"201505","sDate_Md":"0526","sDate_Hms":"114110","sDate_Hm":"1141","sDate_YmdHms":"20150526114110","sDate_YmdHm":"201505261141","sDate_yyyyMMdd":"20150526","sDate_yyyyMM":"201505","sDate_MMddyyyy":"20150526","sDate_ddMMyyyy":"20150526"}]
}
samplePageObj.create();
