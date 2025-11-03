var samplePageObj = samplePageObj||{};
samplePageObj = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "HeaderMerge": 6,
    "FitWidth": 1,
    "Export": {
      "Url": "https://api.ibsheet.com/ibsheet/v8/"
    }
  },
  //틀고정 좌측 컬럼 설정
  "LeftCols": [
    {"Header": ["No","No"],"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0}
  ],
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["신청인","신청인"],"Type": "Text","MinWidth": 80,"Name": "sName","Align": "Center"},
    {"Header": ["선택","선택"],"Type": "Bool","MinWidth": 80,"Name": "check"},
    {"Header": ["신청사유","신청사유"],"Type": "Enum","MinWidth": 80,"Name": "Reason","ColMerge": 0,"Align": "Center","Enum": "|야근|주말특근|휴일특근","EnumKeys": "|01|02|03"},
    {"Header": ["신청금액","신청금액"],"Type": "Int","MinWidth": 125,"Name": "Qty","Required": 1},
    {"Header": ["근태기간","시작일"],"Name": "Date1","Extend": IB_Preset.YMD},
    {"Header": ["근태기간","종료일"],"Name": "Date2","Extend": IB_Preset.YMD},
    {"Header": ["시간","시작"],"Name": "Time1","Extend": IB_Preset.HM,"Width": 100,"TimePicker": 1},
    {"Header": ["시간","종료"],"Name": "Time2","Extend": IB_Preset.HM,"Width": 100,"TimePicker": 1}
  ]
},
//시트 이벤트
'event':{
    onRenderFirstFinish:function (evtParam) {
      //create 함수는 비동기로 동작하므로 생성 직후 동작은 여기서 진행
      var sheet = evtParam.sheet;
      sheet.loadSearchData(samplePageObj.data);
    },
    onBeforeExport:function (evtParam) {
      console.log(evtParam.eventName + ' 발생');
    },
    onExportFinish:function (evtParam) {
      console.log(evtParam.eventName + ' 발생');
    }
},
//시트객체 생성
'create':function () {
    document.getElementById('filename').value = IBSheet.dateToString(new Date(), 'yyyy-MM-dd HH:mm') + '_IBSheet엑셀 예제_비밀번호설정';
    var options = this.init;

    options.Events = this.event;
    IBSheet.create({
      id: 'sheet', // 생성할 시트의 id
      el: 'sheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options // 생성될 시트의 속성
    });
    sheet.Name = '엑셀다운로드 예제';
  },
//화면 기능
'sampleBtn':function (obj) {
  
  let userInput = "";
   switch (obj.textContent) {
      case 'down2Excel':
        userInput = prompt("비밀번호를 입력해주세요");

        if (userInput !== null) {
          // 사용자가 입력하고 확인을 눌렀을 때
          console.log("입력한 값:", userInput);
          
          sheet.down2Excel({fileName:document.getElementById('filename').value + ".xlsx",workbookPassword :userInput}); 
          
        } 
      break;
    case 'loadExcel':
       userInput = prompt("엑셀파일에 설정한 비밀번호를 입력해주세요");

        if (userInput !== null) {
          // 사용자가 입력하고 확인을 눌렀을 때
          console.log("입력한 값:", userInput);
          
          sheet.loadExcel({workbookPassword :userInput}); 
          
        } 
    break
  }
     
},
//조회 데이터
'data':[{"Reason":"01","sName":"강인철","rDate":"20030908","chk":0,"Qty":545000,"Date1":"20030813","Date2":"20030813","Time1":"1300","Time2":"1800"},{"Reason":"01","sName":"김수용","rDate":"20030906","chk":1,"Qty":500000,"Date1":"20030906","Date2":"20030906","Time1":"0900","Time2":"1800"},{"Reason":"02","sName":"김수용","rDate":"20030905","chk":1,"Qty":500000,"Date1":"20030905","Date2":"20030905","Time1":"0900","Time2":"1800"},{"Reason":"03","sName":"조문성","rDate":"20030905","chk":0,"Qty":50000,"Date1":"20030905","Date2":"20030905","Time1":"1400","Time2":"1500"},{"Reason":"03","sName":"조문성","rDate":"20030905","chk":1,"Qty":150000,"Date1":"20030901","Date2":"20030902","Time1":"0900","Time2":"1800"},{"Reason":"02","sName":"조문성","rDate":"20030830","chk":0,"Qty":200000,"Date1":"20030830","Date2":"20030830","Time1":"1500","Time2":"1800"},{"Reason":"01","sName":"박진성","rDate":"20030611","chk":0,"Qty":155000,"Date1":"20030611","Date2":"20030611","Time1":"2000","Time2":"2200"},{"Reason":"01","sName":"박진성","rDate":"20030508","chk":1,"Qty":0,"Date1":"20030508","Date2":"20030508","Time1":"0900","Time2":"1200"},{"Reason":"03","sName":"김응주","rDate":"19990703","chk":0,"Qty":155000,"Date1":"20030611","Date2":"20030611","Time1":"0900","Time2":"1800"},{"Reason":"02","sName":"김응주","rDate":"20050101","chk":1,"Qty":0,"Date1":"20030508","Date2":"20030508","Time1":"0900","Time2":"1200"},{"Reason":"01","sName":"김응주","rDate":"20000819","chk":0,"Qty":155000,"Date1":"20030611","Date2":"20030611","Time1":"1500","Time2":"1900"},{"Reason":"03","sName":"신요한","rDate":"20111125","chk":1,"Qty":0,"Date1":"20010108","Date2":"20030508","Time1":"0900","Time2":"1200"}]
}
samplePageObj.create();
