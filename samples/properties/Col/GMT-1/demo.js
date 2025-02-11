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
    {"Type": "Int","Width": 100,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["조회 데이터","조회 데이터"], "Type": "Text", "Name": "orgText", "Width": 250},
    {"Header": ["년월일시분초(timezone)(GMT)","yyyy/MM/dd HH:mm:ss z"],"Name": "sDate_YmdHmsz","Extend": {"Type": "Date","Align": "Center","Format": "yyyy/MM/dd HH:mm:ss z","EditFormat": "yyyyMMddTHHmmssz","DataFormat": "yyyyMMddTHHmmssz","Size": 14,"EmptyValue": "<span style='color:#AAA'>숫자만 입력(ex:20190514153020)</span>"},"Width": 200, GMT: 1},
    {"Header": ["년월일(GMT)","yyyy/MM/dd z"],"Name": "sDate_Ymd","Extend": {"Type": "Date","Align": "Center","Format": "yyyy/MM/dd z","DataFormat": "yyyyMMddHHmmss","EditFormat": "yyyyMMdd","Size": 8,"EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"},"Width": 150, GMT: 1},
    {"Header": ["년월일(GMT)","yyyy/MM z"],"Name": "sDate_Ym","Extend": {"Type": "Date","Align": "Center","Format": "yyyy/MM z","DataFormat": "yyyyMMddHHmmss","EditFormat": "yyyyMM","Size": 6,"EmptyValue": "<span style='color:#AAA'>년,월 순으로 숫자만 입력해 주세요.</span>"},"Width": 100, GMT: 1},
    {"Header": ["년월일(GMT)","MM/dd z"],"Name": "sDate_Md","Extend": {"Type": "Date","Align": "Center","Format": "MM/dd z","EditFormat": "MMdd","DataFormat": "yyyyMMddHHmmss","Size": 4,"EmptyValue": "<span style='color:#AAA'>월,일 순으로 숫자만 입력해 주세요.</span>"},"Width": 90, GMT: 1},
    {"Header": ["시분초","HH:mm:ss"],"Name": "sDate_Hms","Extend": {"Type": "Date","Align": "Center","Format": "HH:mm:ss","EditFormat": "HHmmss","DataFormat": "yyyyMMddHHmmss","Size": 8,"EmptyValue": "<span style='color:#AAA'>시,분,초 순으로 8개 숫자만 입력해 주세요.</span>"},"Width": 80},
    {"Header": ["시분초","HH:mm"],"Name": "sDate_Hm","Extend": {"Type": "Date","Align": "Center","Format": "HH:mm","EditFormat": "HHmm","DataFormat": "yyyyMMddHHmmss","Size": 6,"EmptyValue": "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"},"Width": 70},
    {"Header": ["년월일시분초","yyyy/MM/dd HH:mm:s"],"Name": "sDate_YmdHms","Extend": {"Type": "Date","Align": "Center","Format": "yyyy/MM/dd HH:mm:ss","EditFormat": "yyyyMMddHHmmss","DataFormat": "yyyyMMddHHmmss","Size": 14,"EmptyValue": "<span style='color:#AAA'>숫자만 입력(ex:20190514153020)</span>"},"Width": 160},
    {"Header": ["년월일시분초","yyyy/MM/dd HH:mm"],"Name": "sDate_YmdHm","Extend": {"Type": "Date","Align": "Center","Format": "yyyy/MM/dd HH:mm","EditFormat": "yyyyMMddHHmm","DataFormat": "yyyyMMddHHmmss","Size": 12,"EmptyValue": "<span style='color:#AAA'>숫자만 입력(ex:201905141530)</span>"},"Width": 160},
    {"Header": ["년월일(한국)","yyyy.MM.dd"],"Name": "sDate_yyyyMMdd","Type": "Date","Format": "yyyy.MM.dd","EditFormat": "yyyyMMdd","DataFormat":"yyyyMMddHHmmss","Size": 8},
    {"Header": ["년월일(한국)","yyyy-MM"],"Name": "sDate_yyyyMM","Type": "Date","Width": 110,"Format": "yyyy-MM","EditFormat": "yyyyMM","DataFormat": "yyyyMMddHHmmss","Size": 6},
    {"Header": ["월일년(미국)","MM-dd-yyyy"],"Name": "sDate_MMddyyyy","Extend": {"Type": "Date","Align": "Center","Format": "MM-dd-yyyy","EditFormat": "MMddyyyy","DataFormat": "yyyyMMddHHmmss","Size": 8,"EmptyValue": "<span style='color:#AAA'>월,일,년 순으로 숫자만 입력해 주세요.</span>"},"Width": 120},
    {"Header": ["일월년(유럽)","dd-MM-yyyy"],"Name": "sDate_ddMMyyyy","Extend": {"Type": "Date","Align": "Center","Format": "dd-MM-yyyy","EditFormat": "ddMMyyyy","DataFormat": "yyyyMMddHHmmss","Size": 8,"EmptyValue": "<span style='color:#AAA'>일,월,년 순으로 숫자만 입력해 주세요.</span>"},"Width": 120}
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
'data':[{orgText:"",sDate_YmdHmsz:"",sDate_Ymd:"",sDate_Ym:"",sDate_Md:"",sDate_Hms:"",sDate_Hm:"",sDate_YmdHms:"",sDate_YmdHm:"",sDate_yyyyMMdd:"",sDate_yyyyMM:"",sDate_MMddyyyy:"",sDate_ddMMyyyy:""},{orgText:"20241104000000",sDate_YmdHmsz:"20241104T000000Z",sDate_Ymd:"20241104000000",sDate_Ym:"20241104000000",sDate_Md:"20241104000000",sDate_Hms:"20241104000000",sDate_Hm:"20241104000000",sDate_YmdHms:"20241104000000",sDate_YmdHm:"20241104000000",sDate_yyyyMMdd:"20241104000000",sDate_yyyyMM:"20241104000000",sDate_MMddyyyy:"20241104000000",sDate_ddMMyyyy:"20241104000000"},{orgText:"1730646000000 (한국표준시 Timestamp)",sDate_YmdHmsz:"1730646000000",sDate_Ymd:"1730646000000",sDate_Ym:"1730646000000",sDate_Md:"1730646000000",sDate_Hms:"1730646000000",sDate_Hm:"1730646000000",sDate_YmdHms:"1730646000000",sDate_YmdHm:"1730646000000",sDate_yyyyMMdd:"1730646000000",sDate_yyyyMM:"1730646000000",sDate_MMddyyyy:"1730646000000",sDate_ddMMyyyy:"1730646000000"},{orgText:"2024-11-04T00:00:00+09:00",sDate_YmdHmsz:"2024-11-04T00:00:00+09:00",sDate_Ymd:"2024-11-04T00:00:00+09:00",sDate_Ym:"2024-11-04T00:00:00+09:00",sDate_Md:"2024-11-04T00:00:00+09:00",sDate_Hms:"2024-11-04T00:00:00+09:00",sDate_Hm:"2024-11-04T00:00:00+09:00",sDate_YmdHms:"2024-11-04T00:00:00+09:00",sDate_YmdHm:"2024-11-04T00:00:00+09:00",sDate_yyyyMMdd:"2024-11-04T00:00:00+09:00",sDate_yyyyMM:"2024-11-04T00:00:00+09:00",sDate_MMddyyyy:"2024-11-04T00:00:00+09:00",sDate_ddMMyyyy:"2024-11-04T00:00:00+09:00"},{orgText:"2024-11-04T00:00:00Z",sDate_YmdHmsz:"2024-11-04T00:00:00Z",sDate_Ymd:"2024-11-04T00:00:00Z",sDate_Ym:"2024-11-04T00:00:00Z",sDate_Md:"2024-11-04T00:00:00Z",sDate_Hms:"2024-11-04T00:00:00Z",sDate_Hm:"2024-11-04T00:00:00Z",sDate_YmdHms:"2024-11-04T00:00:00Z",sDate_YmdHm:"2024-11-04T00:00:00Z",sDate_yyyyMMdd:"2024-11-04T00:00:00Z",sDate_yyyyMM:"2024-11-04T00:00:00Z",sDate_MMddyyyy:"2024-11-04T00:00:00Z",sDate_ddMMyyyy:"2024-11-04T00:00:00Z"},{orgText:"2024-11-04T00:00:00",sDate_YmdHmsz:"2024-11-04T00:00:00",sDate_Ymd:"2024-11-04T00:00:00",sDate_Ym:"2024-11-04T00:00:00",sDate_Md:"2024-11-04T00:00:00",sDate_Hms:"2024-11-04T00:00:00",sDate_Hm:"2024-11-04T00:00:00",sDate_YmdHms:"2024-11-04T00:00:00",sDate_YmdHm:"2024-11-04T00:00:00",sDate_yyyyMMdd:"2024-11-04T00:00:00",sDate_yyyyMM:"2024-11-04T00:00:00",sDate_MMddyyyy:"2024-11-04T00:00:00",sDate_ddMMyyyy:"2024-11-04T00:00:00"},{orgText:"2024-11-04T00:00:00-05:00",sDate_YmdHmsz:"2024-11-04T00:00:00-05:00",sDate_Ymd:"2024-11-04T00:00:00-05:00",sDate_Ym:"2024-11-04T00:00:00-05:00",sDate_Md:"2024-11-04T00:00:00-05:00",sDate_Hms:"2024-11-04T00:00:00-05:00",sDate_Hm:"2024-11-04T00:00:00-05:00",sDate_YmdHms:"2024-11-04T00:00:00-05:00",sDate_YmdHm:"2024-11-04T00:00:00-05:00",sDate_yyyyMMdd:"2024-11-04T00:00:00-05:00",sDate_yyyyMM:"2024-11-04T00:00:00-05:00",sDate_MMddyyyy:"2024-11-04T00:00:00-05:00",sDate_ddMMyyyy:"2024-11-04T00:00:00-05:00"},{orgText:"1730696400000 (뉴욕표준시 Timestamp)",sDate_YmdHmsz:"1730696400000",sDate_Ymd:"1730696400000",sDate_Ym:"1730696400000",sDate_Md:"1730696400000",sDate_Hms:"1730696400000",sDate_Hm:"1730696400000",sDate_YmdHms:"1730696400000",sDate_YmdHm:"1730696400000",sDate_yyyyMMdd:"1730696400000",sDate_yyyyMM:"1730696400000",sDate_MMddyyyy:"1730696400000",sDate_ddMMyyyy:"1730696400000"}]
}
ib.create();