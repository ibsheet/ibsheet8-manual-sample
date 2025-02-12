var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    "MessageWidth": 300,
    "IgnoreFocused": 1
  },
  "Def": {
    "Row": {
      CanFormula: true
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"},
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header":"분야", "Type": "Text", "Name": "sCategory", "Width": 200, "Align": "Center"},
    {"Header":"직업별", "Type": "Text", "Name": "sOccupation", "Width": 250, "Align": "Center"},
    {"Header":"2024.07", "Type": "Int", "Name": "n202407", "Width": 100},
    {"Header":"2024.08", "Type": "Int", "Name": "n202408", "Width": 100},
    {"Header":"2024.09", "Type": "Int", "Name": "n202409", "Width": 100},
    {"Header":"2024.10", "Type": "Int", "Name": "n202410", "Width": 100},
    {"Header":"2024.11", "Type": "Int", "Name": "n202411", "Width": 100},
    {"Header":"2024.12", "Type": "Int", "Name": "n202412", "Width": 100}
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
'data':[{"sCategory":"관리자","sOccupation":"관리자","n202407":430,"n202408":424,"n202409":413,"n202410":435,"n202411":451,"n202412":469},{"sCategory":"관리자","sOccupation":"전문가 및 관련 종사자","n202407":6439,"n202408":6440,"n202409":6443,"n202410":6516,"n202411":6528,"n202412":6536},{"sCategory":"관리자","sOccupation":"사무 종사자","n202407":5058,"n202408":5058,"n202409":5075,"n202410":5037,"n202411":5032,"n202412":5035},{"sCategory":"서비스·판매 종사자","sOccupation":"서비스 종사자","n202407":3568,"n202408":3529,"n202409":3539,"n202410":3562,"n202411":3563,"n202412":3533},{"sCategory":"서비스·판매 종사자","sOccupation":"판매 종사자","n202407":2519,"n202408":2555,"n202409":2511,"n202410":2470,"n202411":2490,"n202412":2478},{"sCategory":"서비스·판매 종사자","sOccupation":"농림어업 숙련 종사자","n202407":1565,"n202408":1572,"n202409":1580,"n202410":1565,"n202411":1500,"n202412":1273},{"sCategory":"기능·기계조작·조립·단순노무 종사자","sOccupation":"기능원 및 관련 기능종사자","n202407":2197,"n202408":2235,"n202409":2277,"n202410":2280,"n202411":2291,"n202412":2259},{"sCategory":"기능·기계조작·조립·단순노무 종사자","sOccupation":"장치기계조작 및 조립종사자","n202407":2993,"n202408":2972,"n202409":2962,"n202410":2940,"n202411":2938,"n202412":2938},{"sCategory":"기능·기계조작·조립·단순노무 종사자","sOccupation":"단순노무 종사자","n202407":4089,"n202408":4017,"n202409":4043,"n202410":4043,"n202411":4030,"n202412":3522}]
}
ib.create();