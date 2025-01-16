var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 1,
    "MessageWidth": 300,
    "CanSort": 0,
    "PageLength": 50,
    InfoRowConfig: {
      Visible: 1,
      Layout: ["Paging", "SummaryLabel", "Count"]
    }
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
    {"Header": "확인","Type": "Bool","Name": "sCheck","Width": "60"},
    {"Header": "회사","Type": "Text","Name": "sCompany","Width": "150"},
    {"Header": "판매 국가","Type": "Text","Name": "sCountry"},
    {"Header": "판매 수량","Type": "Int","Name": "sSaleQuantity"},
    {"Header": "판매 증가량","Type": "Int","Name": "sSaleIncrease"},
    {"Header": "가격","Type": "Int","Name": "sPrice","Format": "#,### \\원","Width": "180"},
    {"Header": "만족도","Type": "Int","Name": "sSatisfaction","Format": "# \\%"},
    {"Header": "코멘트","Type": "Text","Name": "sComment","Width": "300","RelWidth": 1}
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish: function(evt) {
      var URL = 'https://api.ibsheet.com/ibsheet/v8/samples/customer/paging.jsp';
      var param = {};

      // 시트 최초 생성시 발생 이벤트
      if (evt.sheet.SearchMode > 1) { // 서버모듈 조회
        param = {
          url: URL,
          param: 'total=15000&searchMode=' + evt.sheet.SearchMode,
          method: 'POST',
          pageLengthParam: 'data',
          callback: function (rtn) {
            var rtnData = JSON.parse(rtn.data);

            evt.sheet.showMessageTime('<span style=\'color:black\'>조회가 완료되었습니다.<br> 서버모듈 전체 데이터 건수 : ' + rtnData.Total + '</span>', 1000);
          }
        };

        evt.sheet.doSearchPaging(param);
      } else { // 클라이언트 조회
        param = {
          url: URL,
          method: 'POST',
          callback: function (rtn) {
            var rtnData = JSON.parse(rtn.data);

            evt.sheet.showMessageTime('<span style=\'color:black\'>조회가 완료되었습니다.<br> 클라이언트 전체 데이터 건수 : ' + rtnData.Total + '</span>', 1000);
          }
        };

        evt.sheet.doSearch(param);
      }
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
  IBSheet.disposeAll(true);

  var sMode = arguments[1]; // 1:클라이언트페이징 , 2:서버페이징 , 3:서버스크롤페이징

  ib.init.Cfg = {
    "SearchMode": sMode,
    "Alternate": 2,
    "PageLength": 50,
    InfoRowConfig: {
      Visible: 1,
      Layout: ["SummaryLabel", "Count"]
    }
  };
  if (sMode === 1) {
    ib.init.Cfg.InfoRowConfig = {
      Visible: 1,
      Layout: ["Paging", "SummaryLabel", "Count"]
    }
  } else if (sMode === 4) {
    ib.init.Cfg.SortCurrentPage = 1;
    ib.init.Cfg.InfoRowConfig = {
        Visible: 1,
        Layout: ["Paging2", "Count"],
        ViewCount: 1,
        ViewFormat: "10|20|30|50|100",
        Paging2Count: 10
    }
  }
  ib.create(); // 시트 생성
}
}
ib.create();