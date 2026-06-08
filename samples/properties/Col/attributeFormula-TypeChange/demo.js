var ib = ib || {};
ib = {
  // 시트 초기화 구문
  'init': {
    "Def": {
      "Row": {
        // Formula 동작을 위해 CanFormula 필수
        "CanFormula": 1,
        // col attr+Formula의 CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "ComboDataType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},
      {"Header": "회사 (조건)", "Type": "Text", "Name": "TextData", "MinWidth": 120, "CanEdit": 1},

      // === 핵심: TypeFormula로 컬럼 Type 동적 변경 + Type별 보조 속성 셋팅 ===
      // Type 변경 시 함께 설정해야 할 속성이 Type마다 다름:
      // - Enum  → Enum, EnumKeys
      // - Float → Format (없으면 Int 기본 Format이 적용돼 소수점 안 보임)
      // - Date  → Format, EditFormat, DataFormat + 데이터를 timestamp로 변환
      {"Header": "데이터 (Type 동적)", "Type": "Text", "Name": "ComboData", "MinWidth": 200, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          var company = fr.Row["TextData"];

          if (company == "삼성") {
            // Text 그대로 유지 — 보조 속성 불필요
            return "Text";
          }
          else if (company == "Amazon") {
            // Enum 전환 — Enum/EnumKeys 셀 단위 설정
            fr.Row["ComboDataEnum"]     = "|A-한국|B-미국|C-일본|D-영국";
            fr.Row["ComboDataEnumKeys"] = "|A|B|C|D";
            return "Enum";
          }
          else if (company == "Apple") {
            // Float 전환 — Format 설정 필수 (소수점 표시)
            fr.Row["ComboDataFormat"] = "#,##0.##";
            return "Float";
          }
          else if (company == "Google") {
            // Date 전환 — Format/EditFormat/DataFormat 셋트 + 데이터 변환
            // 문자열 "20240315" → timestamp(ms) 로 변환해야 Date 컬럼이 인식
            var s = fr.Row["ComboData"] + "";
            if (s.length === 8) {
              fr.Row["ComboData"] = IBSheet.stringToDate(s, "yyyyMMdd").getTime();
            }
            fr.Row["ComboDataFormat"]     = "yyyy/MM/dd";
            fr.Row["ComboDataEditFormat"] = "yyyyMMdd";
            fr.Row["ComboDataDataFormat"] = "yyyyMMdd";
            return "Date";
          }
          return "Text";
        }
      }
    ]
  },
  // 시트 이벤트
  'event': {
    onRenderFirstFinish: function(evt) {
      evt.sheet.loadSearchData(ib.data);
    }
  },
  // 시트 객체 생성
  'create': function() {
    var options = this.init;
    options.Events = this.event;
    IBSheet.create({
      id: 'sheet',
      el: 'sheetDiv',
      options: options
    });
  },
  // 조회 데이터 — TextData(회사명)에 따라 ComboData의 Type이 달라짐
  'data': [
    {"TextData": "삼성",   "ComboData": "자유 텍스트"},     // Text
    {"TextData": "Amazon", "ComboData": "A"},               // Enum
    {"TextData": "Amazon", "ComboData": "C"},               // Enum
    {"TextData": "Apple",  "ComboData": 6290.9301},         // Float (Format 필수)
    {"TextData": "Apple",  "ComboData": 1500.5},            // Float
    {"TextData": "Google", "ComboData": "20240315"},        // Date (string → timestamp 변환)
    {"TextData": "Google", "ComboData": "20240601"}         // Date
  ]
};
ib.create();
