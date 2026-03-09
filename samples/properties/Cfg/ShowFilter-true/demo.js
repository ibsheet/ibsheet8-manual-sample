var samplePageObj = samplePageObj||{};
samplePageObj = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "ClearFilterOff":1, //필터 연산자 사용안함 선택시 값 지움
    "ShowFilter":1
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header": "No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
     {Name:"country", Header:"국가", Type:"Text", Width:120},
     {Name:"amount", Header:"금액", Type:"Int", Width:150},
     {Name:"orderDate", Header:"주문일", Type:"Date", Width:130, Format:"yyyy-MM-dd", DateFormat:"yyyyMMdd"}
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish:function (evtParam) {
      //create 함수는 비동기로 동작하므로 생성 직후 동작은 여기서 진행
      var sheet = evtParam.sheet;
      
      sheet.doFilter("|country|amount", "|한국;일본|10000~20000", "|11|1");
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
'data':[{country:"일본", amount:18000, orderDate:"20240105"},
        {country:"미국", amount:30000, orderDate:"20240110"},
        {country:"한국", amount:22000, orderDate:"20240112"},
        {country:"일본", amount:12000, orderDate:"20240115"},
        {country:"중국", amount:9000,  orderDate:"20240118"},
        {country:"한국", amount:17000, orderDate:"20240120"},
        {country:"미국", amount:11000, orderDate:"20240122"},
        {country:"일본", amount:25000, orderDate:"20240125"},
        {country:"한국", amount:13000, orderDate:"20240128"},
        {country:"중국", amount:16000, orderDate:"20240130"},
        {country:"일본", amount:14000, orderDate:"20240202"}]
}
samplePageObj.create();
