var ib = ib || {};
ib = {
  //시트 초기화 구문
  'init': {
    "Def": {
      "Col": {
        "Spanned": 1
      },
      "Row": {
        "Spanned": 1,
      "CanFormula": 1
      }
    },
    //공통기능 설정 부분
    "Cfg": {
      "SearchMode": 0,
      "Export": {
        "Url": "https://api.ibsheet.com/ibsheet/v8/"
      }

    },
    //틀고정 좌측 컬럼 설정
    "LeftCols": [{
      Header: "NO",
      Type: "Int",
      Name: "SEQ",
      FormulaRow: "합계"
    }],
    //중앙(메인) 컬럼 설정
    "Cols": [ {
      Header: "1분기비용",
      Name: "1QTCost",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "2분기비용",
      Name: "2QTCost",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "3분기비용",
      Name: "3QTCost",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "4분기비용",
      Name: "4QTCost",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "1분기이익",
      Name: "1QTProfit",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "2분기이익",
      Name: "2QTProfit",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "3분기이익",
      Name: "3QTProfit",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "4분기이익",
      Name: "4QTProfit",
      Type: "Int",
      Align: "center",
      Width: 100,
      FormulaRow: "Sum"
    }, {
      Header: "영업이익",
      Name: "Total",
      Type: "Int",
      Align: "center",
      Width: 100,
      Formula: "1QTProfit+2QTProfit+3QTProfit+4QTProfit-1QTCost-2QTCost-3QTCost-4QTCost",
      FormulaRow: "Sum"
    }, {
      Header: "요약",
      Name: "Summary",
      Type: "Text",
      Align: "center",
      Width: 100
    }]
  },
  //시트 이벤트
  'event': {
  	onRenderFirstFinish: function(evtParam) {
    	evtParam.sheet.loadSearchData(loadData);
    }
  },
  //시트객체 생성
  'create': function() {
    var options = this.init;

    options.Events = this.event;
    IBSheet.create({
      id: 'sheet', // 생성할 시트의 id
      el: 'sheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options // 생성될 시트의 속성
    });
  },
  
  //화면 기능
  'sampleBtn': function() {
    switch (arguments[0].innerText) {
      case '엑셀다운로드':

//2. 하나의 시트에서 컬럼별로 나누어 엑셀파일을 생성
//버퍼링 시작
sheet.down2ExcelBuffer(true);

//4개 컬럼만 첫번째 워크시트로 다운
var param1 = {
        sheetName:"12분기",
        downCols:"1QTCost|1QTProfit|2QTCost|2QTProfit"
};
sheet.down2Excel(param1);

//나머지 컬럼을 두번째 워크시트로 다운
var param2 = {
        sheetName:"34분기 및 종합",
        downCols:"3QTCost|3QTProfit|4QTCost|4QTProfit|Total|Summary"
};
sheet.down2Excel(param2);

//버퍼링 종료 (실제 다운로드가 시작됨)
sheet.down2ExcelBuffer(false);
        break;
    }
  }
}
ib.create();

var loadData = [
  {
    "1QTCost": 1545265,
    "2QTCost": 1213235,
    "3QTCost": 2545645,
    "4QTCost": 2356562,
    "1QTProfit": 1262459,
    "2QTProfit": 1216487,
    "3QTProfit": 1313233,
    "4QTProfit": 1324545,
    "Total": 0,
    "Summary": "요약1"
  },
  {
    "1QTCost": 1545265,
    "2QTCost": 1224235,
    "3QTCost": 2512345,
    "4QTCost": 2643562,
    "1QTProfit": 1261259,
    "2QTProfit": 1267487,
    "3QTProfit": 2313433,
    "4QTProfit": 1324145,
    "Total": 0,
    "Summary": "요약2"
  },
  {
    "1QTCost": 1543555,
    "2QTCost": 1213115,
    "3QTCost": 2542245,
    "4QTCost": 2245562,
    "1QTProfit": 2262159,
    "2QTProfit": 2215487,
    "3QTProfit": 2311233,
    "4QTProfit": 2224545,
    "Total": 0,
    "Summary": "요약3"
  },
  {
    "1QTCost": 1543465,
    "2QTCost": 1453235,
    "3QTCost": 2598745,
    "4QTCost": 2312562,
    "1QTProfit": 2264459,
    "2QTProfit": 1215487,
    "3QTProfit": 1313123,
    "4QTProfit": 2234545,
    "Total": 0,
    "Summary": "요약4"
  }];
