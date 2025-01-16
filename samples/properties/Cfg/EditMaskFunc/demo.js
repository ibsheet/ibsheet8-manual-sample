var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "HeaderMerge": 3,
    "MessageWidth": 300,
    EditMaskFunc: {
      "sMoney": sMoneyMask,
      "sMoneyResolve": sMoneyResolveMask,
      "sPhone": sPhoneMask,
      "sPhoneResolve": sPhoneResolveMask,
      "sBirth": sBirthMask,
      "sBirthResolve": sBirthResolveMask
    }
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
    {"Header": "이름","Name": "sName","Type": "Text","Width": 80,"Align": "Center"},
    {"Header": "사원번호","Name": "sId","Type": "Text","Width": 80,"Align": "Center","Visible": 0},
    {"Header": "상세보기","Name": "pop","Type": "Button","Width": 80,"Align": "Center","DefaultValue": "확인"},
    {"Header": "선택","Name": "sCheck","Type": "Bool","Width": 80,"Align": "Center"},
    {"Header": "급여","Name": "sMoney","Type": "Int","Format": "#,### 만원","MinWidth": 150,"Align": "Center"},
    {"Header": "전화번호","Name": "sPhone","Type": "Text","CustomFormat": "(###)####-####","MinWidth": 160,"Width": 200,"MaxWidth": 300,"Align": "Center","CanEdit": 1},
    {"Header": "생년월일","Name": "sBirth","Type": "Date","Width": 150,"Align": "Center"},
    {"Header": "우편번호","Name": "sPostNo","Type": "Text","EditMask": "^\\d*$","Size": 6,"CustomFormat": "PostNo","Align": "Center"},
    {"Header": "주소","Name": "sAddr","Type": "Text","Width": 80,"Format": "||[|]","Align": "Center"},
    {"Header": "카드번호","Name": "sCard","Type": "Text","MinWidth": 250,"EditMask": "^\\d*$","CustomFormat": "[General] ####-####-####-####|[ Amex ] ####-######-#####","Size": 16,"Align": "Center"},
    {"Header": "코멘트","Name": "sCustom","Type": "Text","RelWidth": 1}
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
'data':[{"sName":"황정열","sId":"9223123","sMoney":"5000","sPhone":"01015368874","sBirth":"19950907","sAddr":"서울","sPostNo":"137765","sCard":"1234123412341234","sCustom":""},{"sName":"강대호","sId":"9223910","sMoney":"4700","sPhone":"01012312343","sBirth":"19970722","sAddr":"경기","sPostNo":"142571","sCard":"546125847896665","sCustom":""},{"sName":"김미경","sId":"9224697","sMoney":"3900","sPhone":"01021525555","sBirth":"19950201","sAddr":"강원","sPostNo":"570154","sCard":"8547955425411567","sCustom":""},{"sName":"김선희","sId":"9225484","sMoney":"3400","sPhone":"01011112222","sBirth":"19980416","sAddr":"경기","sPostNo":"843521","sCard":"1234123412341234","sCustom":""},{"sName":"최세희","sId":"9226271","sMoney":"3200","sPhone":"01674856874","sBirth":"19960917","sAddr":"경기","sPostNo":"235552","sCard":"4587998856552145","sCustom":""},{"sName":"이명희","sId":"9227058","sMoney":"2900","sPhone":"01015388741","sBirth":"19990316","sAddr":"서울","sPostNo":"615252","sCard":"1234123412341234","sCustom":""},{"sName":"노효일","sId":"9227845","sMoney":"2300","sPhone":"01015368874","sBirth":"19950213","sAddr":"서울","sPostNo":"736566","sCard":"8585666185411125","sCustom":""},{"sName":"원영국","sId":"9228632","sMoney":"2800","sPhone":"01075116521","sBirth":"19980328","sAddr":"경기","sPostNo":"951137","sCard":"7514441556512533","sCustom":""},{"sName":"이지선","sId":"9229419","sMoney":"2400","sPhone":"01058154217","sBirth":"19970524","sAddr":"부산","sPostNo":"515426","sCard":"6841563125655524","sCustom":""},{"sName":"김상도","sId":"9230206","sMoney":"4000","sPhone":"01057412453","sBirth":"19970219","sAddr":"경기","sPostNo":"751123","sCard":"6666555522223333","sCustom":""},{"sName":"한보라","sId":"9230993","sMoney":"2800","sPhone":"01022116587","sBirth":"19951111","sAddr":"서울","sPostNo":"681521","sCard":"9999888855552222","sCustom":""},{"sName":"장태우","sId":"9231780","sMoney":"2800","sPhone":"01072565415","sBirth":"19970307","sAddr":"서울","sPostNo":"354112","sCard":"3333444455556666","sCustom":""},{"sName":"정필석","sId":"9232567","sMoney":"4000","sPhone":"01062642080","sBirth":"19961026","sAddr":"경기","sPostNo":"846311","sCard":"4444222211113255","sCustom":""},{"sName":"조성목","sId":"9233354","sMoney":"4100","sPhone":"01061254045","sBirth":"19980207","sAddr":"경기","sPostNo":"5153655","sCard":"5641122315415133","sCustom":""},{"sName":"유봉근","sId":"9234141","sMoney":"4200","sPhone":"01022222229","sBirth":"19960416","sAddr":"서울","sPostNo":"412132","sCard":"8584154122235565","sCustom":""},{"sName":"오필환","sId":"9234928","sMoney":"3700","sPhone":"01098415521","sBirth":"19980501","sAddr":"서울","sPostNo":"355111","sCard":"3554455516545665","sCustom":""},{"sName":"송복석","sId":"9235715","sMoney":"3900","sPhone":"01057465218","sBirth":"19950107","sAddr":"경기","sPostNo":"512321","sCard":"5546555111415351","sCustom":""},{"sName":"김남연","sId":"9236502","sMoney":"3600","sPhone":"01056154777","sBirth":"19981026","sAddr":"대구","sPostNo":"154234","sCard":"5655154415412335","sCustom":""},{"sName":"한혜선","sId":"9237289","sMoney":"2900","sPhone":"01055555016","sBirth":"19990722","sAddr":"서울","sPostNo":"541657","sCard":"1234123412341234","sCustom":""},{"sName":"조미미","sId":"9238076","sMoney":"2500","sPhone":"01065840714","sBirth":"19950605","sAddr":"울산","sPostNo":"741351","sCard":"5461258478966655","sCustom":""},{"sName":"고은혜","sId":"9238863","sMoney":"2600","sPhone":"01035225415","sBirth":"19990214","sAddr":"서울","sPostNo":"256165","sCard":"8547955425411567","sCustom":""},{"sName":"성미열","sId":"9239650","sMoney":"2700","sPhone":"01058411524","sBirth":"19990803","sAddr":"서울","sPostNo":"984561","sCard":"1234123412341234","sCustom":""},{"sName":"김영중","sId":"9240437","sMoney":"2800","sPhone":"01058898853","sBirth":"19990523","sAddr":"인천","sPostNo":"137765","sCard":"4587998856552145","sCustom":""},{"sName":"김기호","sId":"9241224","sMoney":"3800","sPhone":"01075116521","sBirth":"19990704","sAddr":"서울","sPostNo":"561465","sCard":"1234123412341234","sCustom":""},{"sName":"하태선","sId":"9242011","sMoney":"2800","sPhone":"01058154212","sBirth":"19970804","sAddr":"서울","sPostNo":"846315","sCard":"8585666185411125","sCustom":""},{"sName":"김정민","sId":"9242798","sMoney":"3200","sPhone":"01057412451","sBirth":"19970104","sAddr":"경기","sPostNo":"446123","sCard":"7514441556512533","sCustom":""},{"sName":"장성우","sId":"9243585","sMoney":"3700","sPhone":"01022116587","sBirth":"19980704","sAddr":"서울","sPostNo":"846311","sCard":"6841563125655524","sCustom":""},{"sName":"강윤식","sId":"9244372","sMoney":"3500","sPhone":"01072565415","sBirth":"19960820","sAddr":"서울","sPostNo":"515365","sCard":"6666555522223333","sCustom":""},{"sName":"김수연","sId":"9245159","sMoney":"3000","sPhone":"01062642080","sBirth":"19980603","sAddr":"경기","sPostNo":"412132","sCard":"9999888855552222","sCustom":""},{"sName":"정은지","sId":"9245946","sMoney":"3000","sPhone":"01061254045","sBirth":"19960817","sAddr":"광주","sPostNo":"355111","sCard":"3333444455556666","sCustom":""},{"sName":"정창호","sId":"9246733","sMoney":"2700","sPhone":"01022222226","sBirth":"19971117","sAddr":"서울","sPostNo":"512321","sCard":"4444222211113255","sCustom":""},{"sName":"김대현","sId":"9247520","sMoney":"3300","sPhone":"01098415521","sBirth":"19960207","sAddr":"서울","sPostNo":"154234","sCard":"5641122315415133","sCustom":""},{"sName":"안남주","sId":"9248307","sMoney":"3800","sPhone":"01057465217","sBirth":"19950916","sAddr":"서울","sPostNo":"5416570","sCard":"8584154122235565","sCustom":""},{"sName":"이민수","sId":"9249094","sMoney":"3800","sPhone":"01056154778","sBirth":"19990207","sAddr":"경기","sPostNo":"741351","sCard":"3554455516545665","sCustom":""},{"sName":"최갑석","sId":"9249881","sMoney":"3800","sPhone":"01055555015","sBirth":"19960309","sAddr":"경기","sPostNo":"256165","sCard":"5546555111415351","sCustom":""},{"sName":"김태헌","sId":"9250668","sMoney":"3700","sPhone":"01065840714","sBirth":"19950524","sAddr":"대전","sPostNo":"984561","sCard":"5655154415412335","sCustom":""},{"sName":"박정석","sId":"9251455","sMoney":"3200","sPhone":"01035225414","sBirth":"19960306","sAddr":"서울","sPostNo":"137765","sCard":"9999888855552222","sCustom":""},{"sName":"권기윤","sId":"9252242","sMoney":"3700","sPhone":"01058411522","sBirth":"19960712","sAddr":"경기","sPostNo":"561465","sCard":"3333444455556666","sCustom":""},{"sName":"김승운","sId":"9253029","sMoney":"3900","sPhone":"01058898858","sBirth":"19961119","sAddr":"경기","sPostNo":"846315","sCard":"4444222211113255","sCustom":""},{"sName":"이해영","sId":"9253816","sMoney":"2300","sPhone":"01015368874","sBirth":"19960221","sAddr":"경기","sPostNo":"446123","sCard":"5641122315415133","sCustom":""},{"sName":"김다은","sId":"9254603","sMoney":"3500","sPhone":"01233688745","sBirth":"19970829","sAddr":"강릉","sPostNo":"137765","sCard":"1234123412341234","sCustom":""},{"sName":"이준서","sId":"9255390","sMoney":"4500","sPhone":"01075464123","sBirth":"19980224","sAddr":"경기","sPostNo":"142571","sCard":"546125847896665","sCustom":""},{"sName":"한주원","sId":"9256177","sMoney":"3200","sPhone":"01046575232","sBirth":"19961019","sAddr":"강원","sPostNo":"570154","sCard":"8547955425411567","sCustom":""},{"sName":"도민준","sId":"9256964","sMoney":"3900","sPhone":"01011112222","sBirth":"19990218","sAddr":"경기","sPostNo":"843521","sCard":"1234123412341234","sCustom":""},{"sName":"김지우","sId":"9257751","sMoney":"4200","sPhone":"01074856874","sBirth":"19950201","sAddr":"경기","sPostNo":"235552","sCard":"4587998856552145","sCustom":""},{"sName":"이하윤","sId":"9258538","sMoney":"5900","sPhone":"01035438874","sBirth":"19991109","sAddr":"서울","sPostNo":"615252","sCard":"1234123412341234","sCustom":""},{"sName":"김서현","sId":"9259325","sMoney":"2350","sPhone":"01021532874","sBirth":"19990412","sAddr":"대구","sPostNo":"736566","sCard":"8585666185411125","sCustom":""},{"sName":"천예준","sId":"9260112","sMoney":"2300","sPhone":"01075126521","sBirth":"19980605","sAddr":"경기","sPostNo":"951137","sCard":"7514441556512533","sCustom":""},{"sName":"양지호","sId":"9260899","sMoney":"2700","sPhone":"01025815421","sBirth":"19960826","sAddr":"광주","sPostNo":"515426","sCard":"6841563125655524","sCustom":""},{"sName":"김지수","sId":"9261686","sMoney":"3500","sPhone":"01042741245","sBirth":"19990314","sAddr":"경기","sPostNo":"751123","sCard":"6666555522223333","sCustom":""},{"sName":"박하은","sId":"9262473","sMoney":"3800","sPhone":"01023116587","sBirth":"19960121","sAddr":"서울","sPostNo":"681521","sCard":"9999888855552222","sCustom":""},{"sName":"이태연","sId":"9263260","sMoney":"2900","sPhone":"01055725541","sBirth":"19970803","sAddr":"서울","sPostNo":"354112","sCard":"3333444455556666","sCustom":""},{"sName":"김민수","sId":"9264047","sMoney":"4000","sPhone":"01022642080","sBirth":"19950621","sAddr":"경기","sPostNo":"846311","sCard":"4444222211113255","sCustom":""},{"sName":"한재원","sId":"9264834","sMoney":"4200","sPhone":"01026254045","sBirth":"19990319","sAddr":"부산","sPostNo":"5153655","sCard":"5641122315415133","sCustom":""},{"sName":"김영한","sId":"9265621","sMoney":"3900","sPhone":"01022222222","sBirth":"19970916","sAddr":"서울","sPostNo":"412132","sCard":"8584154122235565","sCustom":""},{"sName":"이민경","sId":"9266408","sMoney":"2500","sPhone":"01098315521","sBirth":"19970316","sAddr":"서울","sPostNo":"355111","sCard":"3554455516545665","sCustom":""},{"sName":"이혜수","sId":"9267195","sMoney":"3400","sPhone":"01042574621","sBirth":"19990128","sAddr":"경기","sPostNo":"512321","sCard":"5546555111415351","sCustom":""},{"sName":"이현석","sId":"9267982","sMoney":"3100","sPhone":"01054615477","sBirth":"19961120","sAddr":"서울","sPostNo":"154234","sCard":"5655154415412335","sCustom":""},{"sName":"송형진","sId":"9268769","sMoney":"3600","sPhone":"01052555012","sBirth":"19960702","sAddr":"서울","sPostNo":"541657","sCard":"1234123412341234","sCustom":""},{"sName":"송지은","sId":"9269556","sMoney":"2100","sPhone":"01062840714","sBirth":"19980726","sAddr":"대전","sPostNo":"741351","sCard":"5461258478966655","sCustom":""},{"sName":"이현지","sId":"9270343","sMoney":"2300","sPhone":"01035225411","sBirth":"19960412","sAddr":"서울","sPostNo":"256165","sCard":"8547955425411567","sCustom":""},{"sName":"성지현","sId":"9271130","sMoney":"2700","sPhone":"01032841152","sBirth":"19970207","sAddr":"서울","sPostNo":"984561","sCard":"1234123412341234","sCustom":""},{"sName":"임재연","sId":"9271917","sMoney":"2500","sPhone":"01025839885","sBirth":"19960419","sAddr":"인천","sPostNo":"137765","sCard":"4587998856552145","sCustom":""},{"sName":"서지원","sId":"9272704","sMoney":"4800","sPhone":"01073126521","sBirth":"19991110","sAddr":"서울","sPostNo":"561465","sCard":"1234123412341234","sCustom":""},{"sName":"신호진","sId":"9273491","sMoney":"3500","sPhone":"01058254213","sBirth":"19951012","sAddr":"서울","sPostNo":"846315","sCard":"8585666185411125","sCustom":""},{"sName":"김정만","sId":"9274278","sMoney":"3200","sPhone":"01057412454","sBirth":"19970225","sAddr":"경기","sPostNo":"446123","sCard":"7514441556512533","sCustom":""},{"sName":"김성우","sId":"9275065","sMoney":"3700","sPhone":"01022112587","sBirth":"19951123","sAddr":"서울","sPostNo":"846311","sCard":"6841563125655524","sCustom":""},{"sName":"강준식","sId":"9275852","sMoney":"3300","sPhone":"01017256541","sBirth":"19950410","sAddr":"서울","sPostNo":"515365","sCard":"6666555522223333","sCustom":""},{"sName":"오지현","sId":"9276639","sMoney":"3100","sPhone":"01026420805","sBirth":"19950513","sAddr":"경기","sPostNo":"412132","sCard":"9999888855552222","sCustom":""},{"sName":"정민지","sId":"9277426","sMoney":"3900","sPhone":"01062540454","sBirth":"19990927","sAddr":"서울","sPostNo":"355111","sCard":"3333444455556666","sCustom":""},{"sName":"김천호","sId":"9278213","sMoney":"2700","sPhone":"01021222222","sBirth":"19980315","sAddr":"서울","sPostNo":"512321","sCard":"4444222211113255","sCustom":""},{"sName":"신대현","sId":"9279000","sMoney":"3700","sPhone":"01093415521","sBirth":"19981010","sAddr":"서울","sPostNo":"154234","sCard":"5641122315415133","sCustom":""},{"sName":"안기호","sId":"9279787","sMoney":"3300","sPhone":"01052465211","sBirth":"19990505","sAddr":"울산","sPostNo":"5416570","sCard":"8584154122235565","sCustom":""},{"sName":"이진수","sId":"9280574","sMoney":"3800","sPhone":"01025615477","sBirth":"19980705","sAddr":"울산","sPostNo":"741351","sCard":"3554455516545665","sCustom":""},{"sName":"최현석","sId":"9281361","sMoney":"3800","sPhone":"01055525013","sBirth":"19950726","sAddr":"경기","sPostNo":"256165","sCard":"5546555111415351","sCustom":""},{"sName":"김태수","sId":"9282148","sMoney":"3700","sPhone":"01065840714","sBirth":"19950322","sAddr":"경기","sPostNo":"984561","sCard":"5655154415412335","sCustom":""},{"sName":"김주연","sId":"9282935","sMoney":"4500","sPhone":"01035225416","sBirth":"19980601","sAddr":"서울","sPostNo":"137765","sCard":"9999888855552222","sCustom":""},{"sName":"이기원","sId":"9283722","sMoney":"3700","sPhone":"01058412152","sBirth":"19970407","sAddr":"대전","sPostNo":"561465","sCard":"3333444455556666","sCustom":""},{"sName":"김성현","sId":"9284509","sMoney":"2900","sPhone":"01058898857","sBirth":"19990428","sAddr":"경기","sPostNo":"846315","sCard":"4444222211113255","sCustom":""},{"sName":"이해준","sId":"9715144","sMoney":"2300","sPhone":"01015368874","sBirth":"19950511","sAddr":"경기","sPostNo":"446123","sCard":"5641122315415133","sCustom":""}]
}
ib.create();

// 외부 함수
function sMoneyMask(input) {
  $(input).inputmask('numeric', {
    groupSeparator: ',', // separator 설정
    autoGroup: true, // 천단위 그룹
    integerDigits: 15, // 자리수 설정
    suffix: '만원'
  });
}
function sMoneyResolveMask(input) {
  return $(input)[0].inputmask.unmaskedvalue();
}
function sPhoneMask(input) {
  $(input).inputmask('(999)9999-9999');
}
function sPhoneResolveMask(input) {
  return $(input)[0].inputmask.unmaskedvalue();
}
function sBirthMask(input) {
  $(input).inputmask('9999/99/99', { placeholder: 'yyyy/mm/dd' });
}
function sBirthResolveMask(input) {
  return $(input)[0].inputmask.unmaskedvalue();
}
