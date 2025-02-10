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
      CanFormula: true,
      CalcOrder: "TextDataCanEdit,IntDataColor"
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"},
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "문자열(Text)","Type": "Text","Name": "TextData","Width": 100,"Align": "Center","CanEdit": 1,
      CanEditFormula: function(fr) {
        return fr.Row['CheckData'];
      }
    },
    {"Header": "정수(Int)","Type": "Int","Name": "IntData","Width": 80,"Align": "Right","CanEdit": 1,
    	ColorFormula: function(fr) {
        if(fr.Value < 100) {
          return "yellow";
        } else {
          return "#2ecc71";
        }
      }
    },
    {"Header": "체크박스(Bool)","Type": "Bool","Name": "CheckData","Width": 80,"Align": "Center","CanEdit": 1}
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
'data':[{"TextData":"장순연","IntData":0,"CheckData":1},{"TextData":"김정호","IntData":0,"CheckData":0},{"TextData":"정상호","IntData":65,"CheckData":1},{"TextData":"안수현","IntData":190,"CheckData":1},{"TextData":"박만우","IntData":1120,"CheckData":0},{"TextData":"최호건","IntData":65,"CheckData":0},{"TextData":"이민후","IntData":0,"CheckData":1},{"TextData":"김호정","IntData":1120,"CheckData":0},{"TextData":"김호수","IntData":65,"CheckData":1},{"TextData":"오미려","IntData":190,"CheckData":1},{"TextData":"차수식","IntData":1120,"CheckData":0},{"TextData":"맹인주","IntData":65,"CheckData":0},{"TextData":"전명준","IntData":190,"CheckData":1}]
}
ib.create();