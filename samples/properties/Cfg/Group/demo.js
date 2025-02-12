var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
    "MessageWidth": 300,
    "CanSort": 0,
    "FitWidth": 1,
    Group: "sIndutyCodeName,sName",
    GroupMain: "sName",
    GroupFormat: "<span style='color: black;display:inline'>{%s}</span> <span style='color: red'>({%c}건)</span>"
  },
  "Def": {
    "Row": {
      "CanFormula": true
    },
    Group: {
      "Expanded": 1,
      "sPrice": {
        "Formula": sPriceFormula
      }
    },
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "업소명","Name": "sName","Type": "Text","MinWidth": 140,"Align": "Left","GroupWidth": 300,"Width": 140},
    {"Header": "업소아이디","Name": "sShId","Type": "Text","MinWidth": 140,"Width": 140,"Align": "Left"},
    {"Header": "분류코드명","Name": "sIndutyCodeName","Type": "Text","MinWidth": 140,"Width": 140,"GroupDef": "myGroupRow"},
    {"Header": "분류코드","Name": "sIndutyCode","Type": "Text","MinWidth": 140,"Align": "Left","Width": 140},
    {"Header": "업소 주소","Name": "sAddr","Type": "Text","MinWidth": 220,"Align": "Left","Width": 220},
    {"Header": "업소 전화번호","Name": "sPhone","Type": "Text","MinWidth": 120,"Align": "Left","Width": 120},
    {"Header": "추천수","Name": "sRcmn","Type": "Int","Format": "#,###","MinWidth": 140,"Width": 140},
    {"Header": "상품명","Name": "sProdName","Type": "Text","MinWidth": 140,"Align": "Left","Width": 140},
    {"Header": "상품가격","Name": "sPrice","Type": "Int","Format": "#,###","MinWidth": 100,"Align": "Right","Width": 100}
  ],
  "Solid": [
    {
      "Kind": "Group",
      "Space": -1,
      "id": "Group",
      "Cells": "Custom,btnMinus,btnPlus",
      "btnMinus": {
        "Type": "Button",
        "Button": "Button",
        "AddClass": "targetBtn",
        "ButtonText": " - ",
        "OnClick": minusClick,
        "Width": 25
      },
      "btnPlus": {
        "Type": "Button",
        "Button": "Button",
        "AddClass": "targetBtn",
        "ButtonText": " + ",
        "OnClick": plusClick,
        "Width": 25
      }
    }
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish: function(evt) {
    	evt.sheet.loadSearchData(ib.data);
    },
    onBeforeGroup:function (evt) {
      console.log(evt.eventName + ' 발생');
    },
    onAfterGroup:function (evt) {
      console.log(evt.eventName + ' 발생');
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
'data':[{"sRcmn":974,"sPrice":7000,"sIndutyCodeName":"한식","sPhone":"437-0175","sAddr":"서울특별시 중랑구 용마산로 490","sProdName":"유기농쌈밥","sShId":"00002350","sIndutyCode":"001","sName":"망우찜쌈밥"},{"sRcmn":974,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"437-0175","sAddr":"서울특별시 중랑구 용마산로 490","sProdName":"돈가스","sShId":"00002350","sIndutyCode":"001","sName":"망우찜쌈밥"},{"sRcmn":450,"sPrice":27000,"sIndutyCodeName":"이 미용업","sPhone":"495-7337","sAddr":"서울특별시 중랑구 사가정로50길 67","sProdName":"미용료(파마)","sShId":"00006017","sIndutyCode":"005","sName":"아폴로헤어크리닉"},{"sRcmn":432,"sPrice":14000,"sIndutyCodeName":"이 미용업","sPhone":"","sAddr":"서울특별시 중랑구 동일로 99길 22","sProdName":"미용료(파마)","sShId":"00006015","sIndutyCode":"005","sName":"상록수 미용실"},{"sRcmn":336,"sPrice":5000,"sIndutyCodeName":"이 미용업","sPhone":"","sAddr":"서울특별시 관악구 난곡로40길16","sProdName":"커트(어르신 포함)","sShId":"00004506","sIndutyCode":"005","sName":"열린미용실"},{"sRcmn":336,"sPrice":20000,"sIndutyCodeName":"이 미용업","sPhone":"","sAddr":"서울특별시 관악구 난곡로40길16","sProdName":"파마","sShId":"00004506","sIndutyCode":"005","sName":"열린미용실"},{"sRcmn":318,"sPrice":200,"sIndutyCodeName":"기타서비스업종","sPhone":"871-7070","sAddr":"서울특별시 관악구 호암로26길1","sProdName":"인화료","sShId":"00003002","sIndutyCode":"013","sName":"미림17분칼라"},{"sRcmn":310,"sPrice":16000,"sIndutyCodeName":"이 미용업","sPhone":"864-6196","sAddr":"서울특별시 관악구 남부순환로145길11","sProdName":"파마","sShId":"00004534","sIndutyCode":"005","sName":"노랑머리미용실"},{"sRcmn":310,"sPrice":7000,"sIndutyCodeName":"이 미용업","sPhone":"864-6196","sAddr":"서울특별시 관악구 남부순환로145길11","sProdName":"커트","sShId":"00004534","sIndutyCode":"005","sName":"노랑머리미용실"},{"sRcmn":264,"sPrice":7000,"sIndutyCodeName":"이 미용업","sPhone":"882-5875","sAddr":"서울특별시 관악구 남부순환로1712","sProdName":"이용료(커트)","sShId":"00004242","sIndutyCode":"005","sName":"덕성이발관"},{"sRcmn":258,"sPrice":3000,"sIndutyCodeName":"이 미용업","sPhone":"3285-8002","sAddr":"서울특별시 관악구 은천로93 벽산아파트상가 101동401호","sProdName":"커트","sShId":"00005948","sIndutyCode":"005","sName":"헤어디자인하우스"},{"sRcmn":258,"sPrice":15000,"sIndutyCodeName":"이 미용업","sPhone":"3285-8002","sAddr":"서울특별시 관악구 은천로93 벽산아파트상가 101동401호","sProdName":"파마","sShId":"00005948","sIndutyCode":"005","sName":"헤어디자인하우스"},{"sRcmn":256,"sPrice":10000,"sIndutyCodeName":"한식","sPhone":"588-7399","sAddr":"서울특별시 관악구 남현1길68-10","sProdName":"삼겹살(200g)","sShId":"00001739","sIndutyCode":"001","sName":"목우촌 부추삼겹살"},{"sRcmn":256,"sPrice":6000,"sIndutyCodeName":"한식","sPhone":"588-7399","sAddr":"서울특별시 관악구 남현1길68-10","sProdName":"냉동삼겹살","sShId":"00001739","sIndutyCode":"001","sName":"목우촌 부추삼겹살"},{"sRcmn":256,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"588-7399","sAddr":"서울특별시 관악구 남현1길68-10","sProdName":"된장찌개","sShId":"00001739","sIndutyCode":"001","sName":"목우촌 부추삼겹살"},{"sRcmn":256,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"588-7399","sAddr":"서울특별시 관악구 남현1길68-10","sProdName":"김치찌개","sShId":"00001739","sIndutyCode":"001","sName":"목우촌 부추삼겹살"},{"sRcmn":251,"sPrice":4500,"sIndutyCodeName":"한식","sPhone":"875-9882","sAddr":"서울특별시 관악구 관악로 105 동산빌딩1층","sProdName":"냉면","sShId":"00004325","sIndutyCode":"001","sName":"박막례청진동해장국"},{"sRcmn":251,"sPrice":3500,"sIndutyCodeName":"한식","sPhone":"875-9882","sAddr":"서울특별시 관악구 관악로 105 동산빌딩1층","sProdName":"선지해장국","sShId":"00004325","sIndutyCode":"001","sName":"박막례청진동해장국"},{"sRcmn":249,"sPrice":15000,"sIndutyCodeName":"이 미용업","sPhone":"2208-7385","sAddr":"서울특별시 중랑구 동일로 120길 121-11","sProdName":"미용료(파마)","sShId":"00006688","sIndutyCode":"005","sName":"행운미용실"},{"sRcmn":248,"sPrice":4000,"sIndutyCodeName":"한식","sPhone":"889-4740","sAddr":"서울특별시 관악구 신림로66길 20","sProdName":"돼지갈비(200g)","sShId":"00000581","sIndutyCode":"001","sName":"꽃돼지와황금송아지"},{"sRcmn":248,"sPrice":3000,"sIndutyCodeName":"한식","sPhone":"889-4740","sAddr":"서울특별시 관악구 신림로66길 20","sProdName":"삼겹살(200g)","sShId":"00000581","sIndutyCode":"001","sName":"꽃돼지와황금송아지"},{"sRcmn":248,"sPrice":5500,"sIndutyCodeName":"한식","sPhone":"889-4740","sAddr":"서울특별시 관악구 신림로66길 20","sProdName":"차돌박이","sShId":"00000581","sIndutyCode":"001","sName":"꽃돼지와황금송아지"},{"sRcmn":244,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"877-5949","sAddr":"서울특별시 관악구 당곡2길 14","sProdName":"된장찌개","sShId":"00003517","sIndutyCode":"001","sName":"재희분식"},{"sRcmn":244,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"877-5949","sAddr":"서울특별시 관악구 당곡2길 14","sProdName":"김치찌개","sShId":"00003517","sIndutyCode":"001","sName":"재희분식"},{"sRcmn":235,"sPrice":4500,"sIndutyCodeName":"한식","sPhone":"414-2261","sAddr":"서울특별시 송파구 가락로 112","sProdName":"김치찌개백반","sShId":"00007851","sIndutyCode":"001","sName":"오백냥분식"},{"sRcmn":235,"sPrice":4000,"sIndutyCodeName":"한식","sPhone":"414-2261","sAddr":"서울특별시 송파구 가락로 112","sProdName":"칼국수","sShId":"00007851","sIndutyCode":"001","sName":"오백냥분식"},{"sRcmn":235,"sPrice":4500,"sIndutyCodeName":"한식","sPhone":"414-2261","sAddr":"서울특별시 송파구 가락로 112","sProdName":"된장찌개백반","sShId":"00007851","sIndutyCode":"001","sName":"오백냥분식"},{"sRcmn":235,"sPrice":1500,"sIndutyCodeName":"한식","sPhone":"414-2261","sAddr":"서울특별시 송파구 가락로 112","sProdName":"김밥","sShId":"00007851","sIndutyCode":"001","sName":"오백냥분식"},{"sRcmn":213,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"874-6895","sAddr":"서울특별시 관악구 신림로22길 5","sProdName":"닭곰탕(육수+가슴살) ","sShId":"00006764","sIndutyCode":"001","sName":"토방 닭 한마리"},{"sRcmn":213,"sPrice":16000,"sIndutyCodeName":"한식","sPhone":"874-6895","sAddr":"서울특별시 관악구 신림로22길 5","sProdName":"닭볶음탕(소)","sShId":"00006764","sIndutyCode":"001","sName":"토방 닭 한마리"},{"sRcmn":213,"sPrice":4500,"sIndutyCodeName":"한식","sPhone":"874-6895","sAddr":"서울특별시 관악구 신림로22길 5","sProdName":"닭칼국수","sShId":"00006764","sIndutyCode":"001","sName":"토방 닭 한마리"},{"sRcmn":209,"sPrice":5000,"sIndutyCodeName":"목욕업","sPhone":"433-5490","sAddr":"서울특별시 중랑구 봉화산로56길 153, 지하2층","sProdName":"목욕료(성인)","sShId":"00006412","sIndutyCode":"006","sName":"호계대중사우나"},{"sRcmn":181,"sPrice":6000,"sIndutyCodeName":"이 미용업","sPhone":"889-1882","sAddr":"서울특별시 관악구 삼성동 388-11","sProdName":"커트","sShId":"00006220","sIndutyCode":"005","sName":"행복한미용실"},{"sRcmn":181,"sPrice":20000,"sIndutyCodeName":"이 미용업","sPhone":"889-1882","sAddr":"서울특별시 관악구 삼성동 388-11","sProdName":"파마","sShId":"00006220","sIndutyCode":"005","sName":"행복한미용실"},{"sRcmn":171,"sPrice":8000,"sIndutyCodeName":"이 미용업","sPhone":"889-8241","sAddr":"서울특별시 관악구 봉천로13길 7","sProdName":"커트","sShId":"00003436","sIndutyCode":"005","sName":"재경헤어라인"},{"sRcmn":165,"sPrice":4000,"sIndutyCodeName":"세탁업","sPhone":"433-2058","sAddr":"서울특별시 중랑구 동일로 752 1층","sProdName":"양복세탁료","sShId":"00006408","sIndutyCode":"007","sName":"한독세탁"},{"sRcmn":163,"sPrice":3500,"sIndutyCodeName":"한식","sPhone":"2668-3608","sAddr":"서울특별시 강서구 공항대로 423(등촌동)","sProdName":"냉면","sShId":"00003986","sIndutyCode":"001","sName":"왕세숫대야냉면(행복을파는집)"},{"sRcmn":163,"sPrice":4000,"sIndutyCodeName":"한식","sPhone":"2668-3608","sAddr":"서울특별시 강서구 공항대로 423(등촌동)","sProdName":"돈가스","sShId":"00003986","sIndutyCode":"001","sName":"왕세숫대야냉면(행복을파는집)"},{"sRcmn":157,"sPrice":5000,"sIndutyCodeName":"이 미용업","sPhone":"885-8894","sAddr":"서울특별시 관악구 관악로140-18","sProdName":"커트","sShId":"00005638","sIndutyCode":"005","sName":"하버드미용실"},{"sRcmn":157,"sPrice":15000,"sIndutyCodeName":"이 미용업","sPhone":"885-8894","sAddr":"서울특별시 관악구 관악로140-18","sProdName":"파마","sShId":"00005638","sIndutyCode":"005","sName":"하버드미용실"},{"sRcmn":154,"sPrice":5000,"sIndutyCodeName":"한식","sPhone":"423-6231","sAddr":"서울특별시 송파구 가락로 66","sProdName":"물냉면","sShId":"00008633","sIndutyCode":"001","sName":"돌마리유황오리"},{"sRcmn":154,"sPrice":10000,"sIndutyCodeName":"한식","sPhone":"423-6231","sAddr":"서울특별시 송파구 가락로 66","sProdName":"삼겹살(국내산/200g)","sShId":"00008633","sIndutyCode":"001","sName":"돌마리유황오리"},{"sRcmn":148,"sPrice":4500,"sIndutyCodeName":"한식","sPhone":"3664-0460","sAddr":"서울특별시 강서구 강서로 416, 110호 호서프라자(등촌동)","sProdName":"냉면","sShId":"00005939","sIndutyCode":"001","sName":"길거리야"},{"sRcmn":148,"sPrice":5500,"sIndutyCodeName":"한식","sPhone":"3664-0460","sAddr":"서울특별시 강서구 강서로 416, 110호 호서프라자(등촌동)","sProdName":"돈가스","sShId":"00005939","sIndutyCode":"001","sName":"길거리야"},{"sRcmn":137,"sPrice":25000,"sIndutyCodeName":"이 미용업","sPhone":"","sAddr":"서울특별시 중랑구 용마산로 125가길 26","sProdName":"미용료(파마)","sShId":"00000263","sIndutyCode":"005","sName":"장미 미용실"},{"sRcmn":110,"sPrice":25000,"sIndutyCodeName":"이 미용업","sPhone":"2208 - 4790     ","sAddr":"서울특별시 중랑구 면목로 430","sProdName":"파마","sShId":"00000784","sIndutyCode":"005","sName":"강헤어컬렉션"},{"sRcmn":106,"sPrice":4000,"sIndutyCodeName":"한식","sPhone":"408-5151","sAddr":"서울특별시 송파구 마천로41길 22","sProdName":"물냉면","sShId":"00008171","sIndutyCode":"001","sName":"벧엘 칼국수"},{"sRcmn":106,"sPrice":3000,"sIndutyCodeName":"한식","sPhone":"408-5151","sAddr":"서울특별시 송파구 마천로41길 22","sProdName":"칼국수","sShId":"00008171","sIndutyCode":"001","sName":"벧엘 칼국수"},{"sRcmn":101,"sPrice":4000,"sIndutyCodeName":"한식","sPhone":"2604-6952","sAddr":"서울특별시 양천구 신월로 17길 21","sProdName":"양푼비빔밥","sShId":"00003906","sIndutyCode":"001","sName":"보라매25시해장국"},{"sRcmn":101,"sPrice":4000,"sIndutyCodeName":"한식","sPhone":"2604-6952","sAddr":"서울특별시 양천구 신월로 17길 21","sProdName":"돌솥비빔밥","sShId":"00003906","sIndutyCode":"001","sName":"보라매25시해장국"}]
}
ib.create();

// 외부 함수
function sPriceFormula(obj) {
  var sum = 0;
  var rows = obj.Sheet.getChildRows(obj.Row);

  for (var i = 0; i < rows.length; i++) {
    if ((rows[i].id && rows[i].id.indexOf(obj.Sheet.GroupIdPrefix) >= 0)) { continue; }
    sum += rows[i].sPrice;
  }

  return sum;
}
function minusClick(evtParam) { evtParam.sheet.showTreeLevel(1); }
function plusClick(evtParam) { evtParam.sheet.showTreeLevel(10); }