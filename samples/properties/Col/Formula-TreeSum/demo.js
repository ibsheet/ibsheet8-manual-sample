var ib = ib || {};
ib = {
  // 시트 초기화 구문
  'init': {
    "Def": {
      "Row": {
        // Formula 동작을 위해 CanFormula 필수
        "CanFormula": 1,
        // Formula 적용 컬럼 계산 순서 (띄어쓰기 없이 ',' 로 연결)
        "CalcOrder": "Sales,SalesAvg,Headcount,TeamCount,ScoreMax,ActiveSales,ScoreAvg,Revenue"
      }
    },
    "Cfg": {
      "SearchMode": 0,
      "MainCol": "Tree"
    },
    "LeftCols": [
      {"Type": "Int", "Width": 50, "Align": "Center", "Name": "SEQ"},
      {"Header": "삭제", "Name": "DELCHK", "Extend": IB_Preset.DelCheck}
    ],
    "Cols": [
      {"Header": "조직", "Type": "Text", "Name": "Tree", "MinWidth": 140, "Align": "Left", "CanEdit": 1},

      // IB_Preset 트리 프리셋 사용 (ibsheet-common.js 필요)
      {"Header": "매출", "Type": "Int", "Name": "Sales", "Width": 90, "Align": "Right", "CanEdit": 1, "Format": "#,##0", "Formula": IB_Preset.TreeSumFormula},
      {"Header": "평균매출", "Type": "Int", "Name": "SalesAvg", "Width": 90, "Align": "Right", "CanEdit": 1, "Format": "#,##0", "Formula": IB_Preset.TreeAvgFormula},
      {"Header": "팀원", "Type": "Int", "Name": "Headcount", "Width": 70, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeSumFormula},
      {"Header": "팀수", "Type": "Int", "Name": "TeamCount", "Width": 70, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeCountFormula},
      {"Header": "최고점수", "Type": "Int", "Name": "ScoreMax", "Width": 80, "Align": "Right", "CanEdit": 1, "Formula": IB_Preset.TreeMaxFormula},

      // 커스텀 트리 Formula
      {"Header": "활성매출(삭제제외)", "Type": "Int", "Name": "ActiveSales", "Width": 140, "Align": "Right", "CanEdit": 1, "Format": "#,##0", "Formula": TreeSumExFormula},
      {"Header": "평균점수(null제외)", "Type": "Int", "Name": "ScoreAvg", "Width": 140, "Align": "Right", "CanEdit": 1, "Format": "#,###", "Formula": TreeExceptNullFormula},
      {"Header": "매출×인원", "Type": "Int", "Name": "Revenue", "Width": 110, "Align": "Right", "CanEdit": 1, "Format": "#,##0", "Formula": TotalFormula}
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
  // 조회 데이터 — 부서별 실적 트리
  // 각 leaf(팀)의 같은 값이 여러 집계 컬럼에 들어가는 이유: 컬럼마다 다른 집계 방식을 같은 데이터에 시연하기 위함
  'data': [
    {"Tree": "회사", "Sales": 0, "SalesAvg": 0, "TeamCount": 0, "ScoreMax": 0,"ActiveSales": 0, "ScoreAvg": 0, "Headcount": 0, "Items": [
      {"Tree": "영업본부", "Sales": 0, "SalesAvg": 0, "TeamCount": 0, "ScoreMax": 0,"ActiveSales": 0, "ScoreAvg": 0, "Headcount": 0, "Items": [
        {"Tree": "영업1팀", "Sales": 1200, "SalesAvg": 1200, "TeamCount": 1, "ScoreMax": 85,"ActiveSales": 1200, "ScoreAvg": 85, "Headcount": 5},
        {"Tree": "영업2팀", "Sales": 800,  "SalesAvg": 800,  "TeamCount": 1, "ScoreMax": 78,"ActiveSales": 800,  "ScoreAvg": 78, "Headcount": 4},
        {"Tree": "영업3팀", "Sales": 1500, "SalesAvg": 1500, "TeamCount": 1, "ScoreMax": 90,"ActiveSales": 1500, "ScoreAvg": 90, "Headcount": 6}
      ]},
      {"Tree": "개발본부", "Sales": 0, "SalesAvg": 0, "TeamCount": 0, "ScoreMax": 0,"ActiveSales": 0, "ScoreAvg": 0, "Headcount": 0, "Items": [
        {"Tree": "백엔드팀", "Sales": 600, "SalesAvg": 600, "TeamCount": 1, "ScoreMax": 88,"ActiveSales": 600, "ScoreAvg": 88,   "Headcount": 8},
        {"Tree": "프론트팀", "Sales": 400, "SalesAvg": 400, "TeamCount": 1, "ScoreMax": 82,"ActiveSales": 400, "ScoreAvg": 82,   "Headcount": 6},
        {"Tree": "DevOps팀", "Sales": 200, "SalesAvg": 200, "TeamCount": 1, "ScoreMax": 75,"ActiveSales": 200, "ScoreAvg": null, "Headcount": 3}
      ]}
    ]}
  ]
};
ib.create();

// === 커스텀 트리 Formula 함수들 ===

// 매출×인원 — 자식별 (매출 × 인원)의 합계
function TotalFormula(fr) {
  if (fr.Row.childNodes.length) {
    // 부모 행: 직계 자식의 (Sales * Headcount) 합
    var sum = 0;
    for (var r = fr.Row.firstChild; r; r = r.nextSibling) {
      sum += (r["Sales"] * r["Headcount"]);
    }
    return sum;
  } else {
    // leaf 행: 본인 (Sales * Headcount), 편집 허용
    fr.Row[fr.Col + "CanEdit"] = 1;
    return fr.Row.Sales * fr.Row.Headcount;
  }
}

// 삭제행 제외 합계 — 삭제 체크된 자식은 합산에서 제외
function TreeSumExFormula(fr) {
  if (fr.Row.childNodes.length) {
    var sum = 0;
    for (var r = fr.Row.firstChild; r; r = r.nextSibling) {
      if (!r.Deleted) sum += r[fr.Col];
    }
    return sum;
  } else {
    fr.Row[fr.Col + "CanEdit"] = 1;
    return fr.Row[fr.Col];
  }
}

// null 제외 평균 — null 값은 평균 계산에서 제외 (DevOps팀 점수가 null인 케이스)
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
