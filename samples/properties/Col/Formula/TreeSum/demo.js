var ib = ib || {};
ib = {
  // 시트 초기화 구문
  'init': {
    "Def": {
      "Row": {
        // Formula 동작을 위해 CanFormula 필수
        "CanFormula": 1,
        // Formula 적용 컬럼 계산 순서 (띄어쓰기 없이 ',' 로 연결)
        "CalcOrder": "TreeSumCols,TreeAvgCols,TreeCountCols,TreeMaxCols,TreeMinCols,TreeSumEx,TreeExceptNull,Total"
      }
    },
    "Cfg": {
      "SearchMode": 0,
      "MainCol": "Tree"
    },
    "LeftCols": [
      {"Type": "Int", "Width": 60, "Align": "Center", "Name": "SEQ"},
      {"Header": "삭제", "Name": "DELCHK", "Extend": IB_Preset.DelCheck}
    ],
    "Cols": [
      {"Header": "트리", "Type": "Text", "Name": "Tree", "MinWidth": 100, "Align": "Left", "CanEdit": 1},

      // IB_Preset 트리 프리셋 사용 (ibsheet-common.js 필요)
      {"Header": "합계", "Type": "Int", "Name": "TreeSumCols", "Width": 80, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeSumFormula},
      {"Header": "평균", "Type": "Int", "Name": "TreeAvgCols", "Width": 80, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeAvgFormula},
      {"Header": "갯수", "Type": "Int", "Name": "TreeCountCols", "Width": 80, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeCountFormula},
      {"Header": "최대값", "Type": "Int", "Name": "TreeMaxCols", "Width": 80, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeMaxFormula},
      {"Header": "최소값", "Type": "Int", "Name": "TreeMinCols", "Width": 80, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeMinFormula},

      // 커스텀 트리 Formula
      {"Header": "합계(삭제제외)", "Type": "Int", "Name": "TreeSumEx", "Width": 120, "Align": "Right", "CanEdit": 1, "Formula": TreeSumExFormula},
      {"Header": "평균(Null제외)", "Type": "Int", "Name": "TreeExceptNull", "Width": 120, "Align": "Right", "CanEdit": 1, "Formula": TreeExceptNullFormula, "Format": "#,###"},
      {"Header": "합계×갯수", "Type": "Int", "Name": "Total", "Width": 120, "Align": "Right", "CanEdit": 1, "Formula": TotalFormula}
    ]
  },
  // 시트 이벤트
  'event': {
    onRenderFirstFinish: function (evtParam) {
      evtParam.sheet.loadSearchData(ib.data);
    }
  },
  // 시트 객체 생성
  'create': function () {
    var options = this.init;
    options.Events = this.event;
    IBSheet.create({
      id: 'sheet',
      el: 'sheetDiv',
      options: options
    });
  },
  // 조회 데이터 (트리 구조)
  'data': [
    {"Tree": "레벨0", "TreeSumCols": 1, "TreeAvgCols": 1, "TreeCountCols": 1, "TreeMaxCols": 1, "TreeMinCols": 1, "TreeSumEx": 1, "TreeExceptNull": 1, "Items": [
      {"Tree": "레벨1", "TreeSumCols": 2, "TreeAvgCols": 2, "TreeCountCols": 2, "TreeMaxCols": 2, "TreeMinCols": 2, "TreeSumEx": 2, "TreeExceptNull": 2, "Items": [
        {"Tree": "레벨1-1", "TreeSumCols": 1, "TreeAvgCols": 1, "TreeCountCols": 1, "TreeMaxCols": 1, "TreeMinCols": 1, "TreeSumEx": 1, "TreeExceptNull": 1},
        {"Tree": "레벨1-2", "TreeSumCols": 2, "TreeAvgCols": 2, "TreeCountCols": 2, "TreeMaxCols": 2, "TreeMinCols": 2, "TreeSumEx": 2, "TreeExceptNull": 2},
        {"Tree": "레벨1-3", "TreeSumCols": 3, "TreeAvgCols": 3, "TreeCountCols": 3, "TreeMaxCols": 3, "TreeMinCols": 3, "TreeSumEx": 3, "TreeExceptNull": 3}
      ]},
      {"Tree": "레벨2", "TreeSumCols": 2, "TreeAvgCols": 2, "TreeCountCols": 2, "TreeMaxCols": 2, "TreeMinCols": 2, "TreeSumEx": 2, "TreeExceptNull": 2, "Items": [
        {"Tree": "레벨2-1", "TreeSumCols": 1, "TreeAvgCols": 1, "TreeCountCols": 1, "TreeMaxCols": 1, "TreeMinCols": 1, "TreeSumEx": 1, "TreeExceptNull": null},
        {"Tree": "레벨2-2", "TreeSumCols": 2, "TreeAvgCols": 2, "TreeCountCols": 2, "TreeMaxCols": 2, "TreeMinCols": 2, "TreeSumEx": 2, "TreeExceptNull": 2},
        {"Tree": "레벨2-3", "TreeSumCols": 3, "TreeAvgCols": null, "TreeCountCols": 3, "TreeMaxCols": 3, "TreeMinCols": 3, "TreeSumEx": 3, "TreeExceptNull": null},
        {"Tree": "레벨2-4", "TreeSumCols": 4, "TreeAvgCols": 4, "TreeCountCols": 4, "TreeMaxCols": 4, "TreeMinCols": 4, "TreeSumEx": 4, "TreeExceptNull": 4}
      ]}
    ]}
  ]
};
ib.create();

// === 커스텀 트리 Formula 함수들 ===

// 합계×갯수 — 자식별 (합계*갯수)의 합
function TotalFormula(fr) {
  if (fr.Row.childNodes.length) {
    // 부모 행: 직계 자식의 (TreeSumCols * TreeCountCols) 합
    var sum = 0;
    for (var r = fr.Row.firstChild; r; r = r.nextSibling) {
      sum += (r["TreeSumCols"] * r["TreeCountCols"]);
    }
    return sum;
  } else {
    // leaf 행: 본인 (TreeSumCols * TreeCountCols), 편집 허용
    fr.Row[fr.Col + "CanEdit"] = 1;
    return fr.Row.TreeSumCols * fr.Row.TreeCountCols;
  }
}

// 삭제행 제외 합계
function TreeSumExFormula(fr) {
  if (fr.Row.childNodes.length) {
    var sum = 0;
    for (var r = fr.Row.firstChild; r; r = r.nextSibling) {
      if (!r.Deleted) sum += r[fr.Col];  // 삭제 행 제외
    }
    return sum;
  } else {
    fr.Row[fr.Col + "CanEdit"] = 1;
    return fr.Row[fr.Col];
  }
}

// null 제외 평균
function TreeExceptNullFormula(fr) {
  if (fr.Row.childNodes.length) {
    var sum = 0, count = 0;
    for (var r = fr.Row.firstChild; r; r = r.nextSibling) {
      if (r[fr.Col] != null) {
        sum += r[fr.Col];
        count++;
      }
    }
    return count ? (sum / count) : 0;
  } else {
    fr.Row[fr.Col + "CanEdit"] = 1;
    return fr.Row[fr.Col];
  }
}
