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
      "CanFormula": true
    }
  },
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "자동차명(Text)","Type": "Text","Name": "CarName","Width": 200,"Align": "Center","CanEdit": 1, Suggest: "|싼타페 현대|포터2 현대|그랜저 현대|카니발 기아|더_뉴_아반떼 현대|쏘렌토 기아|봉고3_트럭_기아|모닝 기아|그랜드_스타렉스 현대|쏘나타_뉴_라이즈 현대|K5 기아|투싼 현대|티볼리 쌍용|렉스턴_스포츠 쌍용|스파크 GM|QM6 르노삼성|K7 기아|K3 기아|스포티지 기아|E-class BENZ|코나_electric 현대|G80 현대|코나 현대|그랜저_hybrid 현대|레이 기아|SM6 르노삼성|니로_(하이브리드) 기아|말리부 GM|G70 현대|CLS BENZ|ES 렉서스|G4_렉스턴 쌍용|스토닉 기아|트랙스 GM|GLC BENZ|K9 기아|Camry 토요타|K7_하이브리드 기아|Accord 혼다|EQ900 현대|Tiguan 폭스바겐|3-series BMW|Passat 폭스바겐|QM3 르노삼성|5-series BMW|모하비 기아|SM5 르노삼성|Explorer FORD|아이오닉_hybrid 현대|니로_EV_(전기차) 기아|엑센트 현대|A4 아우디|SM3 르노삼성|GLE BENZ|K5 하이브리드 기아|쏘나타_뉴_라이즈_hybrid 현대|라보 GM|스팅어 기아|Altima 닛산|SM7 르노삼성|GLA BENZ|Passat GT 폭스바겐|클리오 르노삼성|다마스 GM|코란도_C 싸용|XC60 볼보|i30 현대|Hatch MINI|All_New_Avalon 닛산|Panamera 포르쉐|Discovery_Sport 랜드로버|Prius 토요타|이쿼녹스 GM|K3_GT 기아|임팔라 GM|RX 렉서스|코란도_투리스모 쌍용|RAV4 토요타|벨로스터 현대|아이오닉_electric 현대|Clubman MINI|New_Cherokee 지프|NX 렉서스|All_New_Wrangler 지프|XC90 볼보|넥쏘 현대|A6 아우디|7-series BMW|X1 BMW|Renegade 지프|S-class BENZ|트위지 르노삼성|Discovery 랜드로버|Grand_Cherokee 지프|CT6 캐딜락|4-series BMW|GLS BENZ|Grand_C4_Picasso 씨트로앵|All_New_Compass 지프|X5 BMW|CLA BENZ|Prius_C 토요타|Countryman MINI|New_Range_Rover 랜드로버|MKX 링컨|X3 BMW|X6 BMW|Range_Rover_Velar 랜드로버|S90 볼보|벨로스터-N 현대|6-series BMW|MKZ 링컨|Odyssey 혼다|C-class BENZ|V40_Cross_Country 볼보|Q30 인피니티|CT 렉서스|Continental 링컨|XC40 볼보|E-Pace 재규어|M BMW|1-series BMW|Ghibli 마세라티|V90_Cross_Country 폴보|X4 BMW|LS 렉서스|Mustang FORD|New_Range_Rover_Sport 랜드로버|Levante 마세라티|니로_플러그인_하이브리드 기아|쏠라티 현대|5008 푸조|New_Sienna 토요타|XE 재규어|SM3_Z.E. 르노삼성|718_Boxster 포르쉐|Macan 포르쉐|Range_Rover_Evoque 랜드로버|QX60 인피니티|CTS 캐딜락|Q50 인피니티|i40 현대|Maxima 닛산|쏘울 기아|911 포르쉐|MKC 링컨|XT5 캐딜락|508 푸조|Mondeo FORD|Quattroporte 마세라티|XF 재규어|XJ 재규어|Q70 인피니티|308 푸조|카마로_SS GM|C4_Cactus 씨트로앵|마스터 르노|맥스크루즈 현대|Taurus FORD|Convertible MINI|ATS 캐딜락|DS3 씨트로앵|캡티바 GM|Kuga FORD|X2 BMW|Escalade 캐딜락|쏘나타_뉴라이즈plug-in 현대|볼트(플러그인하이브리드) GM|F-Type 재규어|Ghost_Series II 롤스로이스|아베오 아베오|718 Cayman 718 Cayman|Prius_Prime 토요타|New_i3 BMW|Pathfinder 닛산|B-class BENZ|F-Pace 재규어|Q60 인피니티|Arteon 폭스바겐|코란도_스포츠 쌍용|C4_Picasso 씨트로앵|Murano Murano|SL BENZ|볼트EV(전기차) GM|ES 렉서스|A-class BENZ|3008 푸조|크루즈 GM|Huracan 람보르니기|208 푸조|투싼(2017) 현대|SLC BENZ|Cherokee 지프|Civic 혼다|370Z 닛산|IS 렉서스|Wraith 롤스로이스|CLS BENZ|Grancabrio 마세라티|Phantom 롤스로이스|AMG GT BENZ|Dawn 롤스로이스|Pilot 혼다", SuggestType: "Start,Empty,Complete"}
  ]
},
//시트 이벤트
'event':{

},
//시트객체 생성
'create':function () {
    var options = this.init;

    options.Events = this.event;
    IBSheet.create({
      id: 'sheet', // 생성할 시트의 id
      el: 'sheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options, // 생성될 시트의 속성
      data: [{}]
    });
  },
//화면 기능
'sampleBtn':function () {
}
}
ib.create();

function fn_addRow() {
  sheet.addRow();
}