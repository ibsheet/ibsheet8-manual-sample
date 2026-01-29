var minus_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAARdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASWEvQAAAF10Uk5TABxfn8PGqW0pR7f++tK1y/X/yl0DB3/u4X00FAYFESxs9J6hC378yBNV+6edcm/gBN4BDlMa3JygAqhJ2/NkjdW0kYoQ1NCqCkP9V9Gv6wl8UIfywg1w4yRu3Yyr5Qu2NwAAAS1JREFUeJyFT2lDgkAUJMMLJMEzFUHBg7CCCBUs0vIoNTWvsuP//452ZVHaL+2Hmfdm387OI4j/zknglAyGwhFMjlJ0jKHO4iyXSKaOcjqTPc/lC3xREEtMWRIOusxJBa+pVGt1BdUZrup7TlyojaLrn7306wRxxV7vmdKQj55G1uSNDnPSOTRp3KLC5KIAA7E8vlOz1QZoMV4i2/CKDgOQpHiAd5Zl3TsAHqB9twcg+AjDlTRNc1QAT3CsDy9C8QFuZchDgGFWxD9XRs8AI1wJ9S/enuPJFFLiteL2A3Rhz+YLyMnyG9qcd3nprPackmqm/wdxvdm6lVBX39OebC/XH7tDigZLmk0b5FTGM2ezO74ufn7Rrc53Xx5N5qvtn+h6tM30esOf6QJfCj+/dIcjuGDv0iEAAAAASUVORK5CYII=";
var plus_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAARdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASWEvQAAAF10Uk5TABxfn8PGqW0pR7f++tK1y/X/yl0DB3/u4X00FAYFESxs9J6hC378yBNV+6edcm/gSd4EoN9TGtycAqjb82SN1bSRihAB1NCqQ/1X0WOv6wl8UIfywg1w4yRu3Yyr9ETqMwAAAStJREFUeJyFUGlXgkAUnQwXQBJcU1QQXAgrCkLFKNTS1FJzK1v+/+9oRobk8MX5cO979753zzsDwLF3EjolwpFoLCCTFB1nqLMEyyVT6YOcyebO8wW+WCoLIlORyv+6zEm811Rr9YaC6yxX862DC7VZcvNzl34dgCv2es+UhnNuRBxN3OroTjqPJ407XJgcCTEUL3iGhotWu4Nahg8aVpeBSFBFlG8Yxr0N4QHFPzoQwj10nKhpmq1C6KOxATIiiadg1LM8hBhlhaChjF4gxjgxaIwnU0TJ16rbv/XxUbP5AnGq8u4KetHlpb3ac1qqm/6vEtabrVuVG+pHxpOt5fpz5zVKkyXMlgXvVMYze7M7bJe+vul292cgjybz1dafC3SywzjO8He6AEfeH2DvJKJSKwlYAAAAAElFTkSuQmCC";
var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 2,
   
  },
  "Def": {
    "Col": {
      "Width": 100
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header":"No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": "버튼1","Type": "Text","Name": "btn1","Width": 120, Icon:"Check"},
    {"Header": "버튼2","Type": "Int","Name": "btn2","Width": 100, Icon:"Clear"},
    {"Header": "버튼3","Type": "Text","Name": "btn3","Width": 120, Icon: plus_icon},   
  ]
},
//시트 이벤트
'event':{
	onRenderFirstFinish: function(evtParam) {
  	evtParam.sheet.loadSearchData(loadData);
  },
	onIconClick:function(evtParam) {
    var sheet = evtParam.sheet;
    var msg = `
    ${evtParam.row.HasIndex}행 
    [${sheet.getString(sheet.getRowById("Header"), evtParam.col)}] 열 
    <span style="color:red">${sheet.getValue(evtParam.row, evtParam.col)}</span> 아이콘이 클릭되었습니다.`; 
		evtParam.sheet.showMessageTime({
    	message:msg,
      time:1500, //1.5초
      buttons:["OK"]
    });
	}
},
//시트객체 생성
'create':function () {
    var options = this.init;

    options.Events = this.event;
    IBSheet.create({
      id: 'sheet', // 생성할 시트의 id
      el: 'sheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options // 생성될 시트의 속성
    });
  },
//화면 기능
'sampleBtn':function () {
  }
}
ib.create();

var loadData = [
  {btn1:"SM8201", btn2:98001,btn3:"XZ2482"},
  {btn1:"KC3942",btn2:12345,btn3:"ZIO5621"},
  {btn1:"MT1020",btn2:0,btn3:"KI7291",btn3Icon:minus_icon},
  {btn1:"JX888", btn2:-3921,btn3:"",btn3Icon:minus_icon},
];