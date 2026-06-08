var ib = ib || {};
ib = {
  // 시트 초기화 구문
  'init': {
    "Def": {
      "Row": {
        // Formula 동작을 위해 CanFormula 필수
        "CanFormula": 1,
        // col attr+Formula의 CalcOrder는 "열이름+속성명" 형식, 항목 사이에 공백 없이
        "CalcOrder": "ComboDataType,StatusType",
        "Height": 32
      }
    },
    "Cfg": { "SearchMode": 0 },
    "Cols": [
      {"Header": "순번", "Name": "SEQ", "Type": "Int", "Align": "Center", "Width": 60},
      {"Header": "회사 (조건)", "Type": "Text", "Name": "TextData", "MinWidth": 110, "CanEdit": 1},

      // === 핵심: TypeFormula로 컬럼 Type 동적 변경 + Type별 보조 속성 셋팅 ===
      // Type 변경 시 함께 설정해야 할 속성이 Type마다 다름:
      // - Enum  → Enum, EnumKeys
      // - Float → Format (없으면 Int 기본 Format이 적용돼 소수점 안 보임)
      // - Date  → Format, EditFormat, DataFormat + 데이터를 timestamp로 변환

      // 출발 Type 1: Text — 회사명에 따라 Enum/Float/Date로 동적 전환
      {"Header": "데이터 (Text 출발)", "Type": "Text", "Name": "ComboData", "MinWidth": 180, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          var company = fr.Row["TextData"];

          if (company == "삼성") {
            return "Text";  // Text 유지 — 보조 속성 불필요
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
      },

      // 출발 Type 2: Bool — 체크박스 상태를 조건에 따라 Text 라벨로 전환
      // Bool은 보조 속성이 없어 Text 전환 시 부담 적음 (단, 값을 라벨로 바꿔주는 처리는 직접)
      {"Header": "상태 (Bool 출발)", "Type": "Bool", "Name": "Status", "Width": 130, "CanEdit": 1, "Align": "Center",
        TypeFormula: function(fr) {
          // Microsoft 회사만 Bool → Text 전환 + 값을 라벨로 바꿈
          if (fr.Row["TextData"] == "Microsoft") {
            fr.Row["Status"] = fr.Row["Status"] ? "활성" : "비활성";
            return "Text";
          }
          // 그 외: Bool 유지 (return 없음)
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
  // 조회 데이터 — TextData(회사명)에 따라 ComboData/Status의 Type이 달라짐
  'data': [
    {"TextData": "삼성",      "ComboData": "자유 텍스트", "Status": 1},  // Text / Bool
    {"TextData": "Amazon",    "ComboData": "A",         "Status": 1},  // Enum / Bool
    {"TextData": "Apple",     "ComboData": 6290.9301,   "Status": 0},  // Float (소수점 있음) / Bool
    {"TextData": "Apple",     "ComboData": 1500,        "Status": 1},  // Float (소수점 없음) / Bool
    {"TextData": "Google",    "ComboData": "20240315",  "Status": 1},  // Date / Bool
    {"TextData": "Microsoft", "ComboData": "자유 텍스트", "Status": 1},  // Text / Text "활성"
    {"TextData": "Microsoft", "ComboData": "자유 텍스트", "Status": 0}   // Text / Text "비활성"
  ]
};
ib.create();
