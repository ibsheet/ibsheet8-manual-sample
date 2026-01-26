var ib = ib || {};
ib = {
  //시트 초기화 구문
  'init1': {
    "Def": {
      "Col": {
        "Spanned": 1
      },
      "Row": {
        "Spanned": 1
      }
    },
    //공통기능 설정 부분
    "Cfg": {
      "SearchMode": 0,
      "Export": {
        "Url": "https://api.ibleaders.com/ibsheet/v8/"
      }

    },
    //틀고정 좌측 컬럼 설정
    "LeftCols": [{
      Header: "NO",
      Type: "Int",
      Name: "SEQ"
    }],
    //중앙(메인) 컬럼 설정
    "Cols": [ {
      Header: "구분",
      Name: "data1",
      Type: "Text",
      Align: "center",
      Width: 100
    }, {
      Header: "항목",
      Name: "data2",
      Type: "Text",
      Align: "center",
      Width: 100
    }, {
      Header: "개수(숙박일)",
      Name: "data3",
      Type: "Int",
      Align: "center",
      Width: 100
    }, {
      Header: "금액",
      Name: "data4",
      Type: "Int",
      Align: "center",
      Width: 100
    }]
  },
  //시트 이벤트
  'event1': {
  }, //시트 초기화 구문
  'init2': {
    "Def": {
      "Col": {
        "Spanned": 1
      },
      "Row": {
        "Spanned": 1
      }
    },
    //공통기능 설정 부분
    "Cfg": {
      "SearchMode": 0,
      "Export": {
        "Url": "https://api.ibleaders.com/ibsheet/v8/"
      }

    },
    //틀고정 좌측 컬럼 설정
    "LeftCols": [{
      Header: "NO",
      Type: "Int",
      Name: "SEQ"
    }],
    //중앙(메인) 컬럼 설정
    "Cols": [{
      Header: "구분",
      Name: "data1",
      Type: "Text",
      Align: "center",
      Width: 100
    }, {
      Header: "항목",
      Name: "data2",
      Type: "Text",
      Align: "center",
      Width: 100
    }, {
      Header: "금액",
      Name: "data3",
      Type: "Int",
      Align: "center",
      Width: 100
    }]
  },
  //시트 이벤트
  'event2': {
  }, //시트 초기화 구문
  'init3': {
    "Def": {
      "Col": {
        "Spanned": 1
      },
      "Row": {
        "Spanned": 1
      }
    },
    //공통기능 설정 부분
    "Cfg": {
      "SearchMode": 0,
      "Export": {
        "Url": "https://api.ibleaders.com/ibsheet/v8/"
      }

    },
    //틀고정 좌측 컬럼 설정
    "LeftCols": [{
      Header: "NO",
      Type: "Int",
      Name: "SEQ"
    }],
    //중앙(메인) 컬럼 설정
    "Cols": [{
      Header: "구분",
      Name: "data1",
      Type: "Text",
      Align: "center",
      Width: 100
    }, {
      Header: "항목",
      Name: "data2",
      Type: "Text",
      Align: "center",
      Width: 100
    },  {
      Header: "개수(숙박일)",
      Name: "data3",
      Type: "Int",
      Align: "center",
      Width: 100
    }, {
      Header: "금액",
      Name: "data4",
      Type: "Int",
      Align: "center",
      Width: 100
    }]
  },
  //시트 이벤트
  'event3': {

  },
  //시트객체 생성
  'create': function() {
    var options1 = this.init1;

    options1.Events = this.event1;
    IBSheet.create({
      id: 'sheet1', // 생성할 시트의 id
      el: 'sheetDiv1', // 시트를 생성할 Dom 객체 및 id
      options: options1 // 생성될 시트의 속성
    });

    //---------------------------------------
    var options2 = this.init2;

    options2.Events = this.event2;
    IBSheet.create({
      id: 'sheet2', // 생성할 시트의 id
      el: 'sheetDiv2', // 시트를 생성할 Dom 객체 및 id
      options: options2 // 생성될 시트의 속성
    });
    //---------------------------------------
    var options3 = this.init3;

    options3.Events = this.event3;
    IBSheet.create({
      id: 'sheet3', // 생성할 시트의 id
      el: 'sheetDiv3', // 시트를 생성할 Dom 객체 및 id
      options: options3 // 생성될 시트의 속성
    });
  },
  
 //----------------------------------------------------- 
  //화면 기능
  'sampleBtn': function() {
    switch (arguments[0].innerText) {
      case '엑셀다운로드':

//1. 일반적인 사용 방법
//버퍼링 시작
sheet1.down2ExcelBuffer(true);

//첫번째 시트 데이터 버퍼링
var param1 = {
        fileName:"여행경비 내역.xlsx", //엑셀파일명
        sheetName:"교통비"  //엑셀파일내 워크시트 명
};
sheet1.down2Excel(param1);

//두번째 시트 데이터 버퍼링
var param2 = {
        sheetName:"식비"    //엑셀파일내 워크시트 명
};
sheet2.down2Excel(param2);

//세번째 시트 데이터 버퍼링
var param3 = {
        sheetName:"숙박비/기타"    //엑셀파일내 워크시트 명
};
sheet3.down2Excel(param3);

//전체 시트 다운로드(실제 다운로드가 시작됨)
sheet1.down2ExcelBuffer(false);

        break;
  
    }
  }
}
ib.create();

IBSheet.onRenderFirstFinishAll = function(obj) {
	console.log('onRenderFirstFinishAll');
  sheet1.loadSearchData(loadData1);
  sheet2.loadSearchData(loadData2);
  sheet3.loadSearchData(loadData3);
};

var loadData1 = [{
    "data1": "항공원",
    "data2": "타이항공",
    "data3": 3,
    "data4": 650000
  },{
    "data1": "하이패스",
    "data2": "경인고속",
    "data3": 2,
    "data4": 5000
  },{
    "data1": "주차비",
    "data2": "김포공항 장기주차",
    "data3": 4,
    "data4": 8000
  }];
  
var loadData2 = [{
    "data1": "1일차 점심",
    "data2": "된장찌개",
    "data3": 15000
  },{
    "data1": "1일차 간식",
    "data2": "편의점",
    "data3": 40000
  },{
    "data1": "1일차 저녁",
    "data2": "라멘",
    "data3": 7000
  },{
    "data1": "2일차 점심",
    "data2": "태국음식점",
    "data3": 20000
  },{
    "data1": "2일차 간식",
    "data2": "생과일주스",
    "data3": 4000
  },{
    "data1": "2일차 저녁",
    "data2": "팟타이",
    "data3": 13000
  },{
    "data1": "3일차 점심",
    "data2": "커리",
    "data3": 8000
  },{
    "data1": "3일차 저녁",
    "data2": "수끼",
    "data3": 23500
  },{
    "data1": "4일차 점심",
    "data2": "카오팟",
    "data3": 5000
  },{
    "data1": "4일차 저녁",
    "data2": "고기집",
    "data3": 30000
  }];
  
var loadData3 = [{
    "data1": "숙박비",
    "data2": "셀리브리티 호텔",
    "data3": 3,
    "data4": 80500
  },{
    "data1": "통신비",
    "data2": "근거리 무선방",
    "data3": 2,
    "data4": 12000
  },{
    "data1": "비자",
    "data2": "별지비자",
    "data3": 3,
    "data4": 55000
  },{
    "data1": "기타",
    "data2": "가방 대여료",
    "data3": 2,
    "data4": 20000
  },{
    "data1": "기타",
    "data2": "기념품 구매",
    "data3": 3,
    "data4": 55000
  }];
