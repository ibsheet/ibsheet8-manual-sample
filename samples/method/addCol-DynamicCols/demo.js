var ib = ib || {};
ib = {
  //서버에서 조회해 왔다고 가정한 응답 (열 정의 + 데이터)
  //데이터의 키는 열 정의의 colId 와 같아야 합니다.
  'server': {
    '사원 정보 조회': {
      columns: [
        { colId: "empNo",  colNm: "사번",   dataType: "Text", width: 100 },
        { colId: "empNm",  colNm: "이름",   dataType: "Text", width: 100 },
        { colId: "hireDt", colNm: "입사일", dataType: "Date", width: 110, format: "yyyy-MM-dd", dataFormat: "yyyyMMdd" },
        { colId: "salary", colNm: "급여",   dataType: "Int",  width: 110, format: "#,##0" }
      ],
      data: [
        { empNo: "9821450", empNm: "홍길동", hireDt: "19980305", salary: 4200000 },
        { empNo: "9510427", empNm: "김한국", hireDt: "19890317", salary: 5100000 },
        { empNo: "1203391", empNm: "이영희", hireDt: "20120402", salary: 3800000 }
      ]
    },
    '월별 실적 조회': {
      columns: [
        { colId: "team", colNm: "팀",  dataType: "Text", width: 100 },
        { colId: "jan",  colNm: "1월", dataType: "Int",  width: 90, format: "#,##0" },
        { colId: "feb",  colNm: "2월", dataType: "Int",  width: 90, format: "#,##0" },
        { colId: "mar",  colNm: "3월", dataType: "Int",  width: 90, format: "#,##0" }
      ],
      data: [
        { team: "영업1팀", jan: 1200, feb: 1350, mar: 980 },
        { team: "영업2팀", jan: 860,  feb: 910,  mar: 1120 }
      ]
    }
  },

  //열 정의 → Cols 배열
  'makeCols': function (columns) {
    var cols = [];
    for (var i = 0; i < columns.length; i++) {
      var c = columns[i];
      var col = { Name: c.colId, Header: c.colNm, Type: c.dataType, Width: c.width };
      if (c.format) col.Format = c.format;
      if (c.dataFormat) col.DataFormat = c.dataFormat;
      cols.push(col);
    }
    return cols;
  },

  //열 구성이 바뀌므로 시트를 다시 생성 (create)
  'rebuild': function (res) {
    //같은 id 로 다시 만들 때는 기존 시트를 먼저 제거해야 합니다.
    if (IBSheet.hasSheet("sheet")) {
      sheet.dispose();
    }
    IBSheet.create({
      id: "sheet",
      el: "sheetDiv",
      options: {
        Cfg: { SearchMode: 2 },
        Cols: this.makeCols(res.columns),
        Events: {
          //생성이 끝난 뒤 데이터를 로드합니다. (create 는 기본이 비동기)
          onRenderFirstFinish: function (evtParam) {
            evtParam.sheet.loadSearchData(res.data);
          }
        }
      }
    });
  },

  //기존 시트에 열을 덧붙임 (addCol)
  'appendInputCols': function () {
    var adds = [
      { name: "memo",    param: { Header: "비고", Type: "Text", Width: 150, CanEdit: 1 } },
      { name: "confirm", param: { Header: "확인", Type: "Bool", Width: 60,  CanEdit: 1 } }
    ];
    var added = 0;
    for (var i = 0; i < adds.length; i++) {
      //열 이름은 첫 번째 인자로 넘기며, 열 속성(param)에는 Name 을 넣지 않습니다.
      //visible 기본값이 0(감춤)이므로 1 로 지정합니다. render 는 0 으로 두고 마지막에 한 번만 그립니다.
      var col = sheet.addCol(adds[i].name, 1, -1, adds[i].param, 1, 0);
      if (col) added++;   //이미 있는 열 이름이면 null 이 반환되고 추가되지 않습니다.
    }
    sheet.rerender();
    this.msg(added ? added + "개 열을 덧붙였습니다. 기존 데이터는 그대로 유지됩니다." : "이미 덧붙인 열입니다. (addCol 이 null 을 반환)");
  },

  'msg': function (text) {
    document.getElementById("msg").textContent = text;
  },

  'sampleBtn': function (obj) {
    switch (obj.textContent) {
      case '사원 정보 조회':
      case '월별 실적 조회':
        this.rebuild(this.server[obj.textContent]);
        this.msg(obj.textContent + " 결과로 시트를 다시 만들었습니다.");
        break;
      case '열 덧붙이기':
        this.appendInputCols();
        break;
        // no default
    }
  }
};
//처음에는 사원 정보로 생성
ib.rebuild(ib.server['사원 정보 조회']);
