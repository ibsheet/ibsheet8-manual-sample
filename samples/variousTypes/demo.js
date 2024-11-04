var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    "MessageWidth": 300
  },
  "Def": {
    "Row": {
      "CanFormula": true
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "문자열(Text)","Type": "Text","Name": "TextData","Width": 100,"Align": "Center","CanEdit": 1},
    {"Header": "줄넘김문자열(Lines)","Type": "Lines","Name": "LinesData","MinWidth": 250,"Align": "Center","CanEdit": 1,"RelWidth": 1},
    {"Header": "콤보(Enum)","Type": "Enum","Name": "ComboData","Width": 100,"Align": "Right","Enum": "|대기|진행중|완료","EnumKeys": "|01|02|03"},
    {"Header": "버튼(Button)","Type": "Button","Name": "ISO","Width": 80,"Align": "Left","CanEdit": 0,"Button": "Button"},
    {"Header": "정수(Int)","Type": "Int","Name": "IntData","Width": 80,"Align": "Right","CanEdit": 1},
    {"Header": "실수(Float)","Type": "Float","Name": "FloatData","Width": 80,"Align": "Right","CanEdit": 1},
    {"Header": "날짜(Date)","Type": "Date","Name": "DateData","Width": 150,"Align": "Center","CanEdit": 1,"EmptyValue": "날짜를 입력해주세요"},
    {"Header": "앵커(Link)","Type": "Link","Name": "LinkData","Width": 60,"CanEdit": 0},
    {"Header": "이미지(Img)","Type": "Img","Name": "ImageData","Width": 70,"Align": "Center","CanEdit": 1},
    {"Header": "패스워드(Pass)","Type": "Pass","Name": "PassData","Width": 80,"Align": "Left","CanEdit": 1},
    {"Header": "라디오(Radio)","Type": "Radio","Name": "RadioData","Width": 140,"Align": "Center","CanEdit": 1,"Enum": "|상|중|하","EnumKeys": "|H:1|M:1|L:1"},
    {"Header": {"Value": "체크박스(Bool)","HeaderCheck": 1},"Type": "Bool","Name": "CheckData","Width": 80,"Align": "Center","CanEdit": 1}
  ]
},
//시트 이벤트
'event':{
    onClick:function popup(args) {
  if (args.col === 'ISO' && args.row.Kind === 'Data') {
    var val = args.row.ISO;
    var data = [
      {
        CURRENCY: '호주 달러',
        ISO: 'AUD'
      },
      {
        CURRENCY: '알바니아 렉',
        ISO: 'ALL'
      },
      {
        CURRENCY: '알제리 디나르',
        ISO: 'DZD'
      },
      {
        CURRENCY: '아르헨티나 페소',
        ISO: 'ARS'
      },
      {
        CURRENCY: '아루바 플로린',
        ISO: 'AWG'
      },
      {
        CURRENCY: '영국 파운드',
        ISO: 'GBP'
      },
      {
        CURRENCY: '바하마 달러',
        ISO: 'BSD'
      },
      {
        CURRENCY: '바레인 디나르',
        ISO: 'BHD'
      },
      {
        CURRENCY: '방글라데시 타카',
        ISO: 'BDT'
      },
      {
        CURRENCY: '바베이도스 달러',
        ISO: 'BBD'
      },
      {
        CURRENCY: '벨라루스 루블',
        ISO: 'BYR'
      },
      {
        CURRENCY: '벨리즈 달러',
        ISO: 'BZD'
      },
      {
        CURRENCY: '버뮤다 달러',
        ISO: 'BMD'
      },
      {
        CURRENCY: '부탄 눌트럼',
        ISO: 'BTN'
      },
      {
        CURRENCY: '볼리비아노',
        ISO: 'BOB'
      },
      {
        CURRENCY: '보츠와나 풀라',
        ISO: 'BWP'
      },
      {
        CURRENCY: '브라질 레알',
        ISO: 'BRL'
      },
      {
        CURRENCY: '브루나이 달러',
        ISO: 'BND'
      },
      {
        CURRENCY: '불가리아 레프',
        ISO: 'BGN'
      },
      {
        CURRENCY: '부룬디 프랑',
        ISO: 'BIF'
      },
      {
        CURRENCY: '캐나다 달러',
        ISO: 'CAD'
      },
      {
        CURRENCY: '중국 위안',
        ISO: 'CNY'
      },
      {
        CURRENCY: '캄보디아 리엘',
        ISO: 'KHR'
      },
      {
        CURRENCY: '카보베르데 에스쿠도',
        ISO: 'CVE'
      },
      {
        CURRENCY: '케이맨 제도 달러',
        ISO: 'KYD'
      },
      {
        CURRENCY: 'CFA 프랑 (BCEAO)',
        ISO: 'XOF'
      },
      {
        CURRENCY: 'CFA 프랑 (BEAC)',
        ISO: 'XAF'
      },
      {
        CURRENCY: '칠레 페소',
        ISO: 'CLP'
      },
      {
        CURRENCY: '콜롬비아 페소',
        ISO: 'COP'
      },
      {
        CURRENCY: '코모로 프랑',
        ISO: 'KMF'
      },
      {
        CURRENCY: '코스타리카 콜론',
        ISO: 'CRC'
      },
      {
        CURRENCY: '크로아티아 쿠나',
        ISO: 'HRK'
      },
      {
        CURRENCY: '쿠바 페소',
        ISO: 'CUP'
      },
      {
        CURRENCY: '체코 코루나',
        ISO: 'CZK'
      },
      {
        CURRENCY: '덴마크 크로네',
        ISO: 'DKK'
      },
      {
        CURRENCY: '지부티 프랑',
        ISO: 'DJF'
      },
      {
        CURRENCY: '도미니카 공화국 페소',
        ISO: 'DOP'
      },
      {
        CURRENCY: '유로',
        ISO: 'EUR'
      },
      {
        CURRENCY: '동카리브 달러',
        ISO: 'XCD'
      },
      {
        CURRENCY: '이집트 파운드',
        ISO: 'EGP'
      },
      {
        CURRENCY: '엘살바도르 콜론',
        ISO: 'SVC'
      },
      {
        CURRENCY: '에스토니아 크룬',
        ISO: 'EEK'
      },
      {
        CURRENCY: '에티오피아 비르',
        ISO: 'ETB'
      },
      {
        CURRENCY: '포클랜드 제도 파운드',
        ISO: 'FKP'
      },
      {
        CURRENCY: '피지 달러',
        ISO: 'FJD'
      },
      {
        CURRENCY: '감비아 달라시',
        ISO: 'GMD'
      },
      {
        CURRENCY: '과테말라 퀘찰',
        ISO: 'GTQ'
      },
      {
        CURRENCY: '기니 프랑',
        ISO: 'GNF'
      },
      {
        CURRENCY: '가이아나 달러',
        ISO: 'GYD'
      },
      {
        CURRENCY: '가나 세디',
        ISO: 'GHS'
      },
      {
        CURRENCY: '홍콩 달러',
        ISO: 'HKD'
      },
      {
        CURRENCY: '아이티 구르드',
        ISO: 'HTG'
      },
      {
        CURRENCY: '온두라스 렘피라',
        ISO: 'HNL'
      },
      {
        CURRENCY: '헝가리 포린트',
        ISO: 'HUF'
      },
      {
        CURRENCY: '인도네시아 루피아',
        ISO: 'IDR'
      },
      {
        CURRENCY: '인도 루피',
        ISO: 'INR'
      },
      {
        CURRENCY: '아이슬란드 크로네',
        ISO: 'ISK'
      },
      {
        CURRENCY: '이라크 디나르',
        ISO: 'IQD'
      },
      {
        CURRENCY: '이스라엘 셰켈',
        ISO: 'ILS'
      },
      {
        CURRENCY: '일본 엔',
        ISO: 'JPY'
      },
      {
        CURRENCY: '요르단 디나르',
        ISO: 'JOD'
      },
      {
        CURRENCY: '카자흐스탄 텡게',
        ISO: 'KZT'
      },
      {
        CURRENCY: '케냐 실링',
        ISO: 'KES'
      },
      {
        CURRENCY: '대한민국 원',
        ISO: 'KRW'
      },
      {
        CURRENCY: '쿠웨이트 디나르',
        ISO: 'KWD'
      },
      {
        CURRENCY: '키르기스스탄 솜',
        ISO: 'KGS'
      },
      {
        CURRENCY: '마카오 파타카',
        ISO: 'MOP'
      },
      {
        CURRENCY: '마케도니아 디나르',
        ISO: 'MKD'
      },
      {
        CURRENCY: '말라위 콰차',
        ISO: 'MWK'
      },
      {
        CURRENCY: '말레이시아 링깃',
        ISO: 'MYR'
      },
      {
        CURRENCY: '몰디브 루피야',
        ISO: 'MVR'
      },
      {
        CURRENCY: '모리타니 우기야',
        ISO: 'MRO'
      },
      {
        CURRENCY: '모리셔스 루피',
        ISO: 'MUR'
      },
      {
        CURRENCY: '멕시코 페소',
        ISO: 'MXN'
      },
      {
        CURRENCY: '몰도바 레우',
        ISO: 'MDL'
      },
      {
        CURRENCY: '몽골 투그릭',
        ISO: 'MNT'
      },
      {
        CURRENCY: '모로코 디르함',
        ISO: 'MAD'
      },
      {
        CURRENCY: '미얀마 차트',
        ISO: 'MMK'
      },
      {
        CURRENCY: '나미비아 달러',
        ISO: 'NAD'
      },
      {
        CURRENCY: '네팔 루피',
        ISO: 'NPR'
      },
      {
        CURRENCY: '네덜란드령 안틸레스 굴덴',
        ISO: 'ANG'
      },
      {
        CURRENCY: '뉴질랜드 달러',
        ISO: 'NZD'
      },
      {
        CURRENCY: '니카라과 코르도바',
        ISO: 'NIO'
      },
      {
        CURRENCY: '나이지리아 나이라',
        ISO: 'NGN'
      },
      {
        CURRENCY: '조선민주주의인민공화국 원',
        ISO: 'KPW'
      },
      {
        CURRENCY: '노르웨이 크로네',
        ISO: 'NOK'
      },
      {
        CURRENCY: '오만 리알',
        ISO: 'OMR'
      },
      {
        CURRENCY: 'CFP 프랑',
        ISO: 'XPF'
      },
      {
        CURRENCY: '파키스탄 루피',
        ISO: 'PKR'
      },
      {
        CURRENCY: '파나마 발보아',
        ISO: 'PAB'
      },
      {
        CURRENCY: '파푸아 뉴기니 키나',
        ISO: 'PGK'
      },
      {
        CURRENCY: '파라과이 과라니',
        ISO: 'PYG'
      },
      {
        CURRENCY: '페루 누에보솔',
        ISO: 'PEN'
      },
      {
        CURRENCY: '필리핀 페소',
        ISO: 'PHP'
      },
      {
        CURRENCY: '폴란드 즈워티',
        ISO: 'PLN'
      },
      {
        CURRENCY: '카타르 리알',
        ISO: 'QAR'
      },
      {
        CURRENCY: '루마니아 레우',
        ISO: 'RON'
      },
      {
        CURRENCY: '러시아 루블',
        ISO: 'RUB'
      },
      {
        CURRENCY: '르완다 프랑',
        ISO: 'RWF'
      },
      {
        CURRENCY: '스위스 프랑',
        ISO: 'CHF'
      },
      {
        CURRENCY: '사모아 탈라',
        ISO: 'WST'
      },
      {
        CURRENCY: '상투메 도브라',
        ISO: 'STD'
      },
      {
        CURRENCY: '사우디아라비아 리얄',
        ISO: 'SAR'
      },
      {
        CURRENCY: '세이셸 루피',
        ISO: 'SCR'
      },
      {
        CURRENCY: '시에라리온 레온',
        ISO: 'SLL'
      },
      {
        CURRENCY: '싱가폴 달러',
        ISO: 'SGD'
      },
      {
        CURRENCY: '슬로바키아 코루나',
        ISO: 'SKK'
      },
      {
        CURRENCY: '솔로몬 제도 달러',
        ISO: 'SBD'
      },
      {
        CURRENCY: '소말리아 실링',
        ISO: 'SOS'
      },
      {
        CURRENCY: '남아프리카 공화국 랜드',
        ISO: 'ZAR'
      },
      {
        CURRENCY: '스리랑카 루피',
        ISO: 'LKR'
      },
      {
        CURRENCY: '세인트헬레나 파운드',
        ISO: 'SHP'
      },
      {
        CURRENCY: '수단 파운드',
        ISO: 'SDG'
      },
      {
        CURRENCY: '스와질란드 릴랑게니',
        ISO: 'SZL'
      },
      {
        CURRENCY: '스웨덴 크로나',
        ISO: 'SEK'
      },
      {
        CURRENCY: '시리아 파운드',
        ISO: 'SYP'
      },
      {
        CURRENCY: '태국 바트',
        ISO: 'THB'
      },
      {
        CURRENCY: '터키어 리라',
        ISO: 'TRY'
      },
      {
        CURRENCY: '대만 달러',
        ISO: 'TWD'
      },
      {
        CURRENCY: '탄자니아 실링',
        ISO: 'TZS'
      },
      {
        CURRENCY: '통가 팡가',
        ISO: 'TOP'
      },
      {
        CURRENCY: '트리니다드 토바고 달러',
        ISO: 'TTD'
      },
      {
        CURRENCY: '튀니지 디나르',
        ISO: 'TND'
      },
      {
        CURRENCY: '미국 달러',
        ISO: 'USD'
      },
      {
        CURRENCY: '아랍에미리트 디르함',
        ISO: 'AED'
      },
      {
        CURRENCY: '우간다 실링',
        ISO: 'UGX'
      },
      {
        CURRENCY: '우크라이나 흐리브냐',
        ISO: 'UAH'
      },
      {
        CURRENCY: '우루과이 페소',
        ISO: 'UYU'
      },
      {
        CURRENCY: '우즈베크 솜',
        ISO: 'UZS'
      },
      {
        CURRENCY: '바누아투 바투',
        ISO: 'VUV'
      },
      {
        CURRENCY: '베트남 동',
        ISO: 'VND'
      },
      {
        CURRENCY: '볼리바르 후에르떼',
        ISO: 'VEF'
      },
      {
        CURRENCY: '예멘 리알',
        ISO: 'YER'
      },
      {
        CURRENCY: '잠비아 콰차',
        ISO: 'ZMK'
      }
    ];

    var cur = '';
    var i = 0;

    while (i < data.length) {
      if (val === data[i].ISO) {
        cur = data[i].CURRENCY;
        break;
      }
      i++;
    }

    args.sheet.showMessageTime({
      message: '<span style=\'color:black\'>' + cur + '</span>',
      time: 0
    });
  }
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
      data: this.data // 생성될 시트의 정적데이터
    });
  },
//화면 기능
'sampleBtn':function () {
  },
//조회 데이터
'data':[{"TextData":"장순연","ComboData":"01","ISO":"AUD","Currency":"호주 달러","IntData":0,"FloatData":15.25,"DateData":"","PhoneNo":"01075116521","IDNO":"7801221384251","LinkData":"|./confirm.do|확정|_self ","LinesData":"전국이 대체로 흐리거나 구름많은 가운데 대기불안정으로 중부내륙은 아침과 오후 한때, 남부내륙은 오후 한때 소나기가 오는 곳이 있겠습니다.","Userformat":"1234567890","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/am.jpg|||||./nt/gripInTran.do|_self","PassData":123456,"RadioData":"H:1","CheckData":1},{"TextData":"김정호","ComboData":"02","ISO":"ALL","Currency":"알바니아 렉","IntData":0,"FloatData":234,"DateData":"20100120","PhoneNo":"","IDNO":"6807151852148","LinkData":"|./delayCos.do|재고|_self ","LinesData":"중부지방은 장마전선의 영향을 받겠고, 남부지방은 북태평양 고기압의 가장자리에 들겠습니다.","Userformat":"1111155555","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/am.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},{"TextData":"정상호","ComboData":"01","ISO":"DZD","Currency":"알제리 디나르","IntData":65,"FloatData":123,"DateData":"20020815","PhoneNo":"025815421","IDNO":"1138206820","LinesData":"중부지방은 장마전선의 영향을 받겠고, 남부지방은 북태평양 고기압의 가장자리에 들겠습니다.중부지방과 경북북부는 흐리고 비가 오겠으며, 그 외 남부지방은 구름많은 가운데 오후 한때 전라도와 제주도를 중심으로 소나기가 오겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ca.jpg|||||","PassData":"4564","RadioData":"L:1","CheckData":1},{"TextData":"안수현","ComboData":"02","ISO":"ARS","Currency":"아르헨티나 페소","IntData":190,"FloatData":0,"DateData":"20110526","PhoneNo":"","IDNO":"6098204963","LinesData":"일본 남쪽해상에 위치한 고기압의 가장자리에 들겠으나, 제주도는 약한 기압골의 영향을 받다가 점차 벗어나겠습니다.","LinkData":"|./acceptCos.do|확정|_self ","Userformat":"9898554321","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ca.jpg|||||","PassData":"123456","RadioData":"L:1","CheckData":1},{"TextData":"박만우","ComboData":"02","ISO":"AWG","Currency":"아루바 플로린","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0425741245","IDNO":"","LinesData":"서해상에 위치한 고기압의 영향을 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},{"TextData":"최호건","ComboData":"01","ISO":"GBP","Currency":"영국 파운드","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"6405142384211","LinesData":"","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ch.jpg|||||","PassData":"4564","RadioData":"H:1","CheckData":0},{"TextData":"이민후","ComboData":"01","ISO":"BSD","Currency":"바하마 달러","IntData":0,"FloatData":0,"DateData":"","PhoneNo":"01022116587","IDNO":"7801221384251","LinkData":"|./rejectCos.do|반려|_self ","LinesData":"전국이 흐리고 오전에 전라남도와 제주도에 비가 그치기 시작해 늦은 오후에는 대부분 지역에서 그치겠으나, 강원영동과 경북북부동해안은 늦은 밤까지 이어지겠습니다.","Userformat":"5552221230","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"","RadioData":"H:1","CheckData":1},{"TextData":"김호정","ComboData":"02","ISO":"BHD","Currency":"바레인 디나르","IntData":1120,"FloatData":0,"DateData":"20100922","PhoneNo":"0557256541","IDNO":"8506243051223","LinesData":"전국이 흐리고 새벽에 제주도에 비가 시작되어 오전에 남부지방, 오후에는 전국으로 확대되겠으나, 동풍의 영향을 받는 강원영동은 새벽부터 비가 오겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},{"TextData":"김호수","ComboData":"01","ISO":"BDT","Currency":"방글라데시 타카","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"","LinkData":"|./rejectCos.do|반려|_self ","LinesData":"전국에 구름이 많은 가운데, 대기불안정으로 전남과 경남내륙, 제주도에는 오후 한때 소나기가 오겠습니다.","Userformat":"8949598981","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"4564","RadioData":"L:1","CheckData":1},{"TextData":"오미려","ComboData":"01","ISO":"BBD","Currency":"바베이도스 달러","IntData":190,"FloatData":15.25,"DateData":"20110526","PhoneNo":"0262642080","IDNO":"2118204825","LinesData":"중북부지방은 동해상에 위치한 고기압의 가장자리에 들겠고, 충청이남지방은 장마전선의 영향을 받다가 제 5호 태풍 ‘다나스‘의 영향을 점차 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"123456","RadioData":"H:1","CheckData":1},{"TextData":"차수식","ComboData":"02","ISO":"BYR","Currency":"벨라루스 루블","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0261254045","IDNO":"","LinesData":"","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ko.jpg|||||","PassData":"75646","RadioData":"L:1","CheckData":0},{"TextData":"맹인주","ComboData":"01","ISO":"BZD","Currency":"벨리즈 달러","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"1298261319","LinesData":"중북부지방은 동해상에 위치한 고기압의 가장자리에 들겠으나, 충청이남지방은 장마전선의 영향을 점차 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/er.jpg|||||","PassData":"4564","RadioData":"H:1","CheckData":0},{"TextData":"전명준","ComboData":"01","ISO":"BMD","Currency":"버뮤다 달러","IntData":190,"FloatData":15.25,"DateData":"20110526","PhoneNo":"022222222","IDNO":"7507142063425","LinesData":"중부지방은 동해상에 위치한 고기압의 가장자리에 들겠으나, 남부지방은 장마전선의 영향을 받겠습니다.","Userformat":"5415554321","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"123456","RadioData":"M:1","CheckData":1}]
}
ib.create();
