var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "HeaderMerge": 3,
    "MessageWidth": 300,
    CanColMove: 1
  },
  "Def": {
    "Row": {
      "CanFormula": true
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header": ["SEQ", "SEQ"], "Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["TASK ID","TASK ID"],"Name": "taskId","MinWidth": 60,"Type": "Text","Align": "Center","Size": 5,"CanEdit": 1,"Icon": "Check"},
    {"Header": ["TASK","LEVEL 1"],"Name": "lvl1Cnt","MinWidth": 100,"Type": "Text","Align": "Left"},
    {"Header": ["TASK","LEVEL 2"],"Name": "lvl2Cnt","MinWidth": 100,"Type": "Text","Align": "Left"},
    {"Header": ["TASK","LEVEL 3"],"Name": "lvl3Cnt","MinWidth": 100,"Type": "Text","Align": "Left"},
    {"Header": ["TASK","LEVEL 4"],"Name": "lvl4Cnt","MinWidth": 100,"Type": "Text","Align": "Left"},
    {"Header": ["TASK","LEVEL 5"],"Name": "lvl5Cnt","MinWidth": 100,"Type": "Text","Align": "Left"},
    {"Header": ["TASK","LEVEL 6"],"Name": "lvl6Cnt","MinWidth": 100,"Type": "Text","Align": "Left"},
    {"Header": ["선행 Task","선행 Task"],"Name": "preTaskId","MinWidth": 60,"Type": "Text","Align": "Center","CanEdit": 1},
    {"Header": ["계획기간","시작일"],"Name": "planStYymmdd","MinWidth": 100,"Type": "Date","Align": "Center","CanEdit": 1},
    {"Header": ["계획기간","시작시간"],"Name": "planStTm","MinWidth": 60,"Type": "Date","Format": "HH:mm","DataFormat": "HHmmss","EditFormat": "HHmm","Align": "Center","CanEdit": 1},
    {"Header": ["계획기간","종료일"],"Name": "planEndYymmdd","MinWidth": 100,"Type": "Date","Align": "Center","CanEdit": 1},
    {"Header": ["계획기간","종료시간"],"Name": "planEndTm","MinWidth": 60,"Type": "Date","Format": "HH:mm","DataFormat": "HHmmss","EditFormat": "HHmm","Align": "Center","CanEdit": 1},
    {"Header": ["계획기간","소요시간"],"Name": "planReqeTm","MinWidth": 60,"Type": "Text","Align": "Center","Formula": formulaTimeCalc,"Color": "#DDDDDD"},
    {"Header": ["실행기간","시작일"],"Name": "actnStYymmdd","MinWidth": 100,"Type": "Date","Align": "Center","CanEdit": 1},
    {"Header": ["실행기간","시작시간"],"Name": "actnStTm","MinWidth": 60,"Type": "Date","Format": "HH:mm","DataFormat": "HHmmss","EditFormat": "HHmm","Align": "Center","CanEdit": 1},
    {"Header": ["실행기간","종료일"],"Name": "actnEndYymmdd","MinWidth": 100,"Type": "Date","Align": "Center","CanEdit": 1},
    {"Header": ["실행기간","종료시간"],"Name": "actnEndTm","MinWidth": 60,"Type": "Date","Format": "HH:mm","DataFormat": "HHmmss","EditFormat": "HHmm","Align": "Center","CanEdit": 1},
    {"Header": ["실행기간","소요시간"],"Name": "actnReqeTm","MinWidth": 60,"Type": "Text","Align": "Center","Formula": formulaTimeCalc,"Color": "#DDDDDD"},
    {"Header": ["진행상태","진행상태"],"Name": "prgrStaCd","MinWidth": 70,"Type": "Enum","Align": "Center","CanEdit": 1,"EnumKeys": "|01|02|03","Enum": "|미시작|진행중|완료","Button": "Defaults","Icon": ""},
    {"Header": ["파트","파트"],"Name": "chgrDptNm","MinWidth": 70,"Type": "Text","Align": "Left","CanEdit": 1},
    {"Header": ["작업자","작업자"],"Name": "perfEmpNm","MinWidth": 70,"Type": "Text","Align": "Center","CanEdit": 1},
    {"Header": ["확인자","확인자"],"Name": "cnfmEmpNm","MinWidth": 70,"Type": "Text","Align": "Center","CanEdit": 1},
    {"Header": ["검수자","검수자"],"Name": "inspEmpNm","MinWidth": 70,"Type": "Text","Align": "Center","CanEdit": 1},
    {"Header": ["비고","비고"],"Name": "etccnt","MinWidth": 120,"Type": "Text","Align": "Left","CanEdit": 1},
    {"Header": ["차수","차수"],"Name": "ordr","MinWidth": 50,"Type": "Int","Align": "Right","CanEdit": 1},
    {"Header": ["작업자","작업자"],"Name": "perfEmpCd","MinWidth": 70,"Type": "Text","CanEdit": 0},
    {"Header": ["확인자","확인자"],"Name": "cnfmEmpCd","MinWidth": 70,"Type": "Text","CanEdit": 0},
    {"Header": ["검수자","검수자"],"Name": "inspEmpCd","MinWidth": 70,"Type": "Text","CanEdit": 0},
    {"Header": ["프로젝트 코드","프로젝트 코드"],"Name": "prjCd","MinWidth": 80,"Type": "Text","CanEdit": 0},
    {"Header": ["TASK ID","TASK ID"],"Name": "orgTaskId","MinWidth": 80,"Type": "Text","CanEdit": 0}
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
'data':[{"chgrDptNm":"전략기획","taskId":"100201","actnEndTm":"190000","ordr":"1","preTaskId":"100200","lvl2Cnt":"222","etccnt":"","lvl1Cnt":"111","lvl3Cnt":"333","planEndYymmdd":"20170804","cnfmEmpNm":"김수현","prjCd":"P9009001","actnEndYymmdd":"20170809","perfEmpNm":"박진우","cnfmEmpCd":"P00002217","inspEmpCd":"200010856","planStYymmdd":"20170804","lvl5Cnt":"555","planReqeTm":"040000","lvl4Cnt":"444","planEndTm":"163000","perfEmpCd":"P00002223","inspEmpNm":"이정호","planStTm":"120000","orgTaskId":"1","actnStYymmdd":"20170805","lvl6Cnt":"666","prgrStaCd":"01","actnStTm":"130000"},{"chgrDptNm":"실행예산","taskId":"100204","actnEndTm":"170000","ordr":"2","preTaskId":"100200","actnStYymmdd":"20170808","orgTaskId":"2","planStTm":"130000","lvl2Cnt":"2","etccnt":"예산 준비 확인","lvl1Cnt":"a","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"6","prgrStaCd":"02","actnEndYymmdd":"20170810","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"112500","planEndTm":"170000","lvl4Cnt":"4"},{"chgrDptNm":"실행예산","taskId":"100302","actnEndTm":"170000","ordr":"3","preTaskId":"100300","actnStYymmdd":"20170808","orgTaskId":"3","planStTm":"140000","lvl2Cnt":"2","etccnt":"","lvl1Cnt":"a","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"6","prgrStaCd":"01","actnEndYymmdd":"20170810","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"112500","planEndTm":"180000","lvl4Cnt":"4"},{"chgrDptNm":"토목사업본부","taskId":"100205","actnEndTm":"170000","ordr":"4","preTaskId":"100200","actnStYymmdd":"20170808","orgTaskId":"4","planStTm":"150000","lvl2Cnt":"2","etccnt":"","lvl1Cnt":"a","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"6","prgrStaCd":"03","actnEndYymmdd":"20170810","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"112500","planEndTm":"190000","lvl4Cnt":"4"},{"chgrDptNm":"토목사업본부","taskId":"100308","actnEndTm":"171900","ordr":"5","preTaskId":"100300","actnStYymmdd":"20170807","orgTaskId":"5","planStTm":"160000","lvl2Cnt":"2","etccnt":"","lvl1Cnt":"111","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"","prgrStaCd":"02","actnEndYymmdd":"20170810","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"091100","planEndTm":"200000","lvl4Cnt":"4"},{"chgrDptNm":"토목사업본부","taskId":"100210","actnEndTm":"171900","ordr":"6","preTaskId":"100200","actnStYymmdd":"20170807","orgTaskId":"6","planStTm":"170000","lvl2Cnt":"2","etccnt":"","lvl1Cnt":"1","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"","prgrStaCd":"02","actnEndYymmdd":"20170811","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"091100","planEndTm":"210000","lvl4Cnt":"4"},{"chgrDptNm":"안정보건","taskId":"100224","actnEndTm":"171900","ordr":"7","preTaskId":"100200","actnStYymmdd":"20170807","orgTaskId":"7","planStTm":"180000","lvl2Cnt":"2","etccnt":"","lvl1Cnt":"1","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"6","prgrStaCd":"02","actnEndYymmdd":"20170807","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"091100","planEndTm":"220000","lvl4Cnt":"4"},{"chgrDptNm":"토목사업본부","taskId":"200331","actnEndTm":"142200","ordr":"8","preTaskId":"200300","actnStYymmdd":"20170807","orgTaskId":"8","planStTm":"190000","lvl2Cnt":"2","etccnt":"","lvl1Cnt":"1","lvl3Cnt":"3","planEndYymmdd":"20170807","lvl6Cnt":"6","prgrStaCd":"01","actnEndYymmdd":"20170807","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"5","planReqeTm":"040000","actnStTm":"081500","planEndTm":"230000","lvl4Cnt":"4"},{"chgrDptNm":"건축시공","taskId":"200355","actnEndTm":"230000","ordr":"9","preTaskId":"200350","lvl2Cnt":"22","etccnt":"최종보고","lvl1Cnt":"11","lvl3Cnt":"33","planEndYymmdd":"20170808","cnfmEmpNm":"김수현","prjCd":"P9009001","actnEndYymmdd":"20170808","perfEmpNm":"박진우","cnfmEmpCd":"P00002217","inspEmpCd":"200010856","planStYymmdd":"20170807","lvl5Cnt":"55","planReqeTm":"040000","lvl4Cnt":"44","planEndTm":"000000","perfEmpCd":"P00002223","inspEmpNm":"이정호","planStTm":"200000","orgTaskId":"9","actnStYymmdd":"20170807","lvl6Cnt":"66","prgrStaCd":"03","actnStTm":"071100"},{"chgrDptNm":"건축시공","taskId":"200401","actnEndTm":"180000","ordr":"10","preTaskId":"200400","lvl2Cnt":"1231","etccnt":"회계반영","lvl1Cnt":"12","lvl3Cnt":"31","planEndYymmdd":"20170808","cnfmEmpNm":"김수현","prjCd":"P9009001","actnEndYymmdd":"20170808","cnfmEmpCd":"P00002217","perfEmpNm":"박진우","inspEmpCd":"200010856","planStYymmdd":"20170807","lvl5Cnt":"123","planReqeTm":"040000","lvl4Cnt":"123","planEndTm":"010000","perfEmpCd":"P00002223","inspEmpNm":"이정호","planStTm":"210000","orgTaskId":"10","actnStYymmdd":"20170807","lvl6Cnt":"2312","prgrStaCd":"01","actnStTm":"101400"},{"chgrDptNm":"건축시공","taskId":"200402","actnEndTm":"121500","ordr":"11","preTaskId":"200400","actnStYymmdd":"20170807","orgTaskId":"14","planStTm":"220000","lvl2Cnt":"12121","etccnt":"","lvl1Cnt":"1231","lvl3Cnt":"121","planEndYymmdd":"20170814","lvl6Cnt":"121","prgrStaCd":"01","actnEndYymmdd":"20170814","prjCd":"P9009001","planStYymmdd":"20170807","lvl5Cnt":"212","planReqeTm":"254000","actnStTm":"111100","planEndTm":"020000","lvl4Cnt":"123"}]
}
ib.create();

// 외부 함수
function formulaTimeCalc(param) {
  function lpad(str, padLength, padString) {
    str += '';
    while (str.length < padLength) { str = padString + str; }

    return str;
  }
  if (param.Col === 'planReqeTm') {
    var start = new Date(param.Row.planStYymmdd + param.Row.planStTm);
    var end = new Date(param.Row.planEndYymmdd + param.Row.planEndTm);
    var second = (end - start) / 1000;

    return lpad(Math.floor(second / 3600), 2, '0') + ':' + lpad(Math.floor((second % 3600) / 60), 2, 0);
  }
  if (param.Col === 'actnReqeTm') {
    var start = new Date(param.Row.actnStYymmdd + param.Row.actnStTm);
    var end = new Date(param.Row.actnEndYymmdd + param.Row.actnEndTm);
    var second = (end - start) / 1000;

    return lpad(Math.floor(second / 3600), 2, '0') + ':' + lpad(Math.floor((second % 3600) / 60), 2, 0);
  }
}