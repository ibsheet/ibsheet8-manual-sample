var ib = ib || {};
ib = {
  //시트 초기화 구문
  'init': {
    "Def": {
      "Row": {
        "CanFormula": 1
      }
    },
    //공통기능 설정 부분
    "Cfg": {
      "SearchMode": 0,
      "HeaderMerge": 6,
      "FitWidth": 1,
      "Export": {
        "Url": "https://api.ibsheet.com/ibsheet/v8/"
      }
    },
    //틀고정 좌측 컬럼 설정
    "LeftCols": [{
      Header: ["No", "No"],
      Type: "Int",
      Name: "SEQ"
    }],
    //중앙(메인) 컬럼 설정
    "Cols": [{
        Header: ["상태", "상태"],
        Name: "sStatus",
        Extend: IB_Preset.STATUS
      },
      {
        "Header": ["신청인", "신청인"],
        "Type": "Text",
        "MinWidth": 80,
        "Name": "sName",
        "ColMerge": 1
      },
      {
        "Header": ["선택", "선택"],
        "Type": "Bool",
        "MinWidth": 80,
        "Name": "check",
        "ColMerge": 1
      },
      {
        "Header": ["신청사유", "신청사유"],
        "Type": "Enum",
        "MinWidth": 80,
        "Name": "Reason",
        "ColMerge": 0,
        "Align": "Center",
        "Enum": "|야근|주말특근|휴일특근",
        "EnumKeys": "|01|02|03"
      },
      {
        "Header": ["신청금액", "신청금액"],
        "Type": "Int",
        "MinWidth": 85,
        "Name": "Qty",
        "ColMerge": 1,
        "Required": 1
      },
      {
        "Header": ["근태기간", "시작일"],
        "Name": "Date1",
        "Extend": {
          "Type": "Date",
          "Align": "Center",
          "Width": 110,
          "Format": "yyyy/MM/dd",
          "DataFormat": "yyyyMMdd",
          "EditFormat": "yyyyMMdd",
          "Size": 8,
          "EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"
        }
      },
      {
        "Header": ["근태기간", "종료일"],
        "Name": "Date2",
        "Extend": {
          "Type": "Date",
          "Align": "Center",
          "Width": 110,
          "Format": "yyyy/MM/dd",
          "DataFormat": "yyyyMMdd",
          "EditFormat": "yyyyMMdd",
          "Size": 8,
          "EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"
        }
      },
      {
        "Header": ["시간", "시작"],
        "Name": "Time1",
        "Extend": {
          "Type": "Date",
          "Align": "Center",
          "Width": 70,
          "Format": "HH:mm",
          "EditFormat": "HHmm",
          "DataFormat": "HHmm",
          "Size": 6,
          "EmptyValue": "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"
        }
      },
      {
        "Header": ["시간", "종료"],
        "Name": "Time2",
        "Extend": {
          "Type": "Date",
          "Align": "Center",
          "Width": 70,
          "Format": "HH:mm",
          "EditFormat": "HHmm",
          "DataFormat": "HHmm",
          "Size": 6,
          "EmptyValue": "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"
        }
      },
      {
        "Header": ["rDate", "rDate"],
        "Name": "rDate",
        "Extend": {
          "Type": "Date",
          "Align": "Center",
          "Width": 110,
          "Format": "yyyy/MM/dd",
          "DataFormat": "yyyyMMdd",
          "EditFormat": "yyyyMMdd",
          "Size": 8,
          "EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"
        },
        "Visible": 0
      },
      {
        "Heade r": ["chk", "chk"],
        "Name": "chk",
        "Type": "Bool",
        "Visible": 0
      }
    ]
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
  'sampleBtn': function(obj) {
    switch (obj.textContent) {
      case '엑셀파일 내보내기':
        sheet.down2Excel({
          fileName: 'sample.xlsx',
          SheetDesign: 1,
          merge: 1,
          downCols : makeHiddenSkipCol()
        });
        break;
      case '다운로드 다이얼로그':
        sheet.showExcelDownloadDialog();
        break;
        // no default
    }
  }
}
ib.create();


function makeHiddenSkipCol() {
	//visible:0인 컬럼, SEQ, 상태, check 컬럼을 제외한다.
  var cols = sheet.getCols();
  var colsArr = new Array();

  for (var i = 0; i < cols.length; i++) {

    var colName = sheet.getAttribute({col: cols[i],attr: "Name"});
    var colVisible = sheet.getAttribute({col: cols[i],attr: "Visible"});
    var colType = sheet.getAttribute({col: cols[i],attr: "Type"});

    if (1 == colVisible && colName != "SEQ" && colName != "sStatus" && colType != "Bool") {
      colsArr.push(colName);
    }
  }
	console.log(colsArr.join("|"));
  return colsArr.join("|");
}

var loadData = [{
    "Reason": "01",
    "sName": "강인철",
    "rDate": "20030908",
    "chk": 0,
    "Qty": 545000,
    "Time1": "1300",
    "Time2": "1800"
  }, {
    "Reason": "01",
    "sName": "김수용",
    "rDate": "20030906",
    "chk": 1,
    "Qty": 500000,
    "Date1": "20030906",
    "Date2": "20030906",
    "Time1": "0900",
    "Time2": "1800"
  }, {
    "Reason": "02",
    "sName": "김수용",
    "rDate": "20030905",
    "chk": 1,
    "Qty": 500000,
    "Date1": "20030905",
    "Date2": "20030905",
    "Time1": "0900",
    "Time2": "1800"
  }, {
    "Reason": "03",
    "sName": "조문성",
    "rDate": "20030905",
    "chk": 0,
    "Qty": 50000,
    "Date1": "20030905",
    "Date2": "20030905",
    "Time1": "1400",
    "Time2": "1500"
  }, {
    "Reason": "03",
    "sName": "조문성",
    "rDate": "20030905",
    "chk": 1,
    "Qty": 150000,
    "Date1": "20030901",
    "Date2": "20030902",
    "Time1": "0900",
    "Time2": "1800"
  }, {
    "Reason": "02",
    "sName": "조문성",
    "rDate": "20030830",
    "chk": 0,
    "Qty": 200000,
    "Date1": "20030830",
    "Date2": "20030830",
    "Time1": "1500",
    "Time2": "1800"
  }, {
    "Reason": "01",
    "sName": "박진성",
    "rDate": "20030611",
    "chk": 0,
    "Qty": 155000,
    "Date1": "20030611",
    "Date2": "20030611",
    "Time1": "2000",
    "Time2": "2200"
  }, {
    "Reason": "01",
    "sName": "박진성",
    "rDate": "20030508",
    "chk": 1,
    "Qty": 0,
    "Date1": "20030508",
    "Date2": "20030508",
    "Time1": "0900",
    "Time2": "1200"
  }, {
    "Reason": "03",
    "sName": "김응주",
    "rDate": "19990703",
    "chk": 0,
    "Qty": 155000,
    "Date1": "20030611",
    "Date2": "20030611",
    "Time1": "0900",
    "Time2": "1800"
  }, {
    "Reason": "02",
    "sName": "김응주",
    "rDate": "20050101",
    "chk": 1,
    "Qty": 0,
    "Date1": "20030508",
    "Date2": "20030508",
    "Time1": "0900",
    "Time2": "1200"
  }, {
    "Reason": "01",
    "sName": "김응주",
    "rDate": "20000819",
    "chk": 0,
    "Qty": 155000,
    "Date1": "20030611",
    "Date2": "20030611",
    "Time1": "1500",
    "Time2": "1900"
  }, {
    "Reason": "03",
    "sName": "신요한",
    "rDate": "20111125",
    "chk": 1,
    "Qty": 0,
    "Date1": "20010108",
    "Date2": "20030508",
    "Time1": "0900",
    "Time2": "1200"
  }];