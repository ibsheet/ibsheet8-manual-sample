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
    {"Header": ["년월일시분초(timezone)(GMT)","yyyy/MM/dd HH:mm:ss z"],"Name": "sDate_YmdHmsz","Extend": {"Type": "Date","Align": "Center","Format": "yyyy/MM/dd HH:mm:ss z","EditFormat": "yyyyMMddTHHmmssz","DataFormat": "yyyyMMddTHHmmssz","Size": 14,"EmptyValue": "<span style='color:#AAA'>숫자만 입력(ex:20190514153020)</span>"},"Width": 200, GMT: 1}
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
'data':[{"orgText":"","sDate_YmdHmsz":""},{"orgText":"20241104000000","sDate_YmdHmsz":"20241104T000000Z"},{"orgText":"1730646000000 (한국표준시 Timestamp)","sDate_YmdHmsz":"1730646000000"},{"orgText":"2024-11-04T00:00:00+09:00","sDate_YmdHmsz":"2024-11-04T00:00:00+09:00"},{"orgText":"2024-11-04T00:00:00Z","sDate_YmdHmsz":"2024-11-04T00:00:00Z"},{"orgText":"2024-11-04T00:00:00","sDate_YmdHmsz":"2024-11-04T00:00:00"},{"orgText":"2024-11-04T00:00:00-05:00","sDate_YmdHmsz":"2024-11-04T00:00:00-05:00"},{"orgText":"1730696400000 (뉴욕표준시 Timestamp)","sDate_YmdHmsz":"1730696400000"}]
}
ib.create();