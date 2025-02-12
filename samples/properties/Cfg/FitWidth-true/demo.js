var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    "MessageWidth": 300,
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
    {"Header": "확인","Type": "Bool","Name": "sCheck","Width": "60"},
    {"Header": "회사","Type": "Text","Name": "sCompany","Width": "150"},
    {"Header": "판매 국가","Type": "Text","Name": "sCountry"},
    {"Header": "판매 수량","Type": "Int","Name": "sSaleQuantity"},
    {"Header": "판매 증가량","Type": "Int","Name": "sSaleIncrease"},
    {"Header": "가격","Type": "Int","Name": "sPrice","Format": "#,### \\원","Width": "180"},
    {"Header": "만족도","Type": "Int","Name": "sSatisfaction","Format": "# \\%"},
    {"Header": "코멘트","Type": "Text","Name": "sComment","Width": "100"}
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
//조회 데이터
'data':[{"sCountry":"미국","sSatisfaction":57,"sCompany":"현기차","sSaleIncrease":6223,"sPrice":5410248,"sSaleQuantity":32444},{"sCountry":"한국","sSatisfaction":71,"sCompany":"구글","sSaleIncrease":2685,"sPrice":7785107,"sSaleQuantity":23515},{"sCountry":"브라질","sSatisfaction":96,"sCompany":"구글","sSaleIncrease":2919,"sPrice":2668264,"sSaleQuantity":52647},{"sCountry":"인도","sSatisfaction":62,"sCompany":"롯데","sSaleIncrease":169,"sPrice":2750339,"sSaleQuantity":56840},{"sCountry":"미국","sSatisfaction":77,"sCompany":"현대","sSaleIncrease":9968,"sPrice":2332205,"sSaleQuantity":48308},{"sCountry":"캐나다","sSatisfaction":56,"sCompany":"한화","sSaleIncrease":2185,"sPrice":9365206,"sSaleQuantity":65356},{"sCountry":"프랑스","sSatisfaction":57,"sCompany":"현기차","sSaleIncrease":6073,"sPrice":30549,"sSaleQuantity":50843},{"sCountry":"캐나다","sSatisfaction":95,"sCompany":"현기차","sSaleIncrease":6101,"sPrice":28171,"sSaleQuantity":42659},{"sCountry":"인도","sSatisfaction":93,"sCompany":"애플","sSaleIncrease":9849,"sPrice":9371936,"sSaleQuantity":94156},{"sCountry":"미국","sSatisfaction":65,"sCompany":"구글","sSaleIncrease":1322,"sPrice":3844416,"sSaleQuantity":38462},{"sCountry":"캐나다","sSatisfaction":58,"sCompany":"애플","sSaleIncrease":3934,"sPrice":2883945,"sSaleQuantity":38954},{"sCountry":"중국","sSatisfaction":73,"sCompany":"SK","sSaleIncrease":7125,"sPrice":686123,"sSaleQuantity":59928},{"sCountry":"일본","sSatisfaction":81,"sCompany":"애플","sSaleIncrease":1583,"sPrice":922113,"sSaleQuantity":63495},{"sCountry":"이탈리아","sSatisfaction":66,"sCompany":"현대","sSaleIncrease":7482,"sPrice":521447,"sSaleQuantity":18878},{"sCountry":"중국","sSatisfaction":54,"sCompany":"마이크로소프트","sSaleIncrease":2691,"sPrice":345780,"sSaleQuantity":62207},{"sCountry":"한국","sSatisfaction":55,"sCompany":"SK","sSaleIncrease":7887,"sPrice":9794084,"sSaleQuantity":93535},{"sCountry":"프랑스","sSatisfaction":92,"sCompany":"롯데","sSaleIncrease":9800,"sPrice":4024887,"sSaleQuantity":53506},{"sCountry":"이탈리아","sSatisfaction":66,"sCompany":"삼성전자","sSaleIncrease":3905,"sPrice":746686,"sSaleQuantity":6741},{"sCountry":"브라질","sSatisfaction":53,"sCompany":"삼성전자","sSaleIncrease":2850,"sPrice":3696978,"sSaleQuantity":29859},{"sCountry":"중국","sSatisfaction":51,"sCompany":"마이크로소프트","sSaleIncrease":5451,"sPrice":880208,"sSaleQuantity":77780},{"sCountry":"이탈리아","sSatisfaction":81,"sCompany":"SK","sSaleIncrease":4400,"sPrice":2336189,"sSaleQuantity":86757},{"sCountry":"영국","sSatisfaction":76,"sCompany":"현기차","sSaleIncrease":4912,"sPrice":8227588,"sSaleQuantity":81988},{"sCountry":"이탈리아","sSatisfaction":72,"sCompany":"애플","sSaleIncrease":4678,"sPrice":8026113,"sSaleQuantity":42764},{"sCountry":"브라질","sSatisfaction":52,"sCompany":"삼성전자","sSaleIncrease":868,"sPrice":3793988,"sSaleQuantity":51238},{"sCountry":"일본","sSatisfaction":64,"sCompany":"엘지전자","sSaleIncrease":8108,"sPrice":9346011,"sSaleQuantity":10143},{"sCountry":"영국","sSatisfaction":59,"sCompany":"SK","sSaleIncrease":2638,"sPrice":5377169,"sSaleQuantity":69222},{"sCountry":"이탈리아","sSatisfaction":96,"sCompany":"현기차","sSaleIncrease":9980,"sPrice":2484897,"sSaleQuantity":94839},{"sCountry":"일본","sSatisfaction":51,"sCompany":"마이크로소프트","sSaleIncrease":3948,"sPrice":7030385,"sSaleQuantity":58090},{"sCountry":"영국","sSatisfaction":82,"sCompany":"애플","sSaleIncrease":3636,"sPrice":2690609,"sSaleQuantity":95663},{"sCountry":"한국","sSatisfaction":76,"sCompany":"현대","sSaleIncrease":6787,"sPrice":5666512,"sSaleQuantity":17595},{"sCountry":"중국","sSatisfaction":69,"sCompany":"마이크로소프트","sSaleIncrease":4865,"sPrice":7241078,"sSaleQuantity":35557},{"sCountry":"일본","sSatisfaction":61,"sCompany":"마이크로소프트","sSaleIncrease":9018,"sPrice":725963,"sSaleQuantity":64279},{"sCountry":"미국","sSatisfaction":79,"sCompany":"엘지전자","sSaleIncrease":1347,"sPrice":3892555,"sSaleQuantity":92645},{"sCountry":"한국","sSatisfaction":74,"sCompany":"현대","sSaleIncrease":1450,"sPrice":4442256,"sSaleQuantity":26578},{"sCountry":"프랑스","sSatisfaction":97,"sCompany":"애플","sSaleIncrease":653,"sPrice":7714646,"sSaleQuantity":5551}]
}
ib.create();