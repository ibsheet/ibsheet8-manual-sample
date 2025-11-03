var securedBlob = null;
var ib = ib || {}
ib = {
  //시트 초기화 구문
  'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "HeaderMerge": 6,
    "FitWidth": 1
  },
  //중앙(메인) 컬럼 설정
  "Cols": [
    {"Header": ["신청인","신청인"],"Type": "Text","MinWidth": 80,"Name": "sName","ColMerge": 1},
    {"Header": ["선택","선택"],"Type": "Bool","MinWidth": 80,"Name": "check","ColMerge": 1},
    {"Header": ["신청사유","신청사유"],"Type": "Enum","MinWidth": 80,"Name": "Reason","ColMerge": 0,"Align": "Center","Enum": "|야근|주말특근|휴일특근","EnumKeys": "|01|02|03"},
    {"Header": ["신청금액","신청금액"],"Type": "Int","MinWidth": 85,"Name": "Qty","ColMerge": 1,"Required": 1},
    {"Header": ["근태기간","시작일"],"Name": "Date1","Extend": {"Type": "Date","Align": "Center","Width": 110,"Format": "yyyy/MM/dd","DataFormat": "yyyyMMdd","EditFormat": "yyyyMMdd","Size": 8,"EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"}},
    {"Header": ["근태기간","종료일"],"Name": "Date2","Extend": {"Type": "Date","Align": "Center","Width": 110,"Format": "yyyy/MM/dd","DataFormat": "yyyyMMdd","EditFormat": "yyyyMMdd","Size": 8,"EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"}},
    {"Header": ["시간","시작"],"Name": "Time1","Extend": {"Type": "Date","Align": "Center","Width": 70,"Format": "HH:mm","EditFormat": "HHmm","DataFormat": "HHmm","Size": 6,"EmptyValue": "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"}},
    {"Header": ["시간","종료"],"Name": "Time2","Extend": {"Type": "Date","Align": "Center","Width": 70,"Format": "HH:mm","EditFormat": "HHmm","DataFormat": "HHmm","Size": 6,"EmptyValue": "<span style='color:#AAA'>시,분 순으로 4개 숫자만 입력해 주세요.</span>"}},
    {"Header": ["rDate","rDate"],"Name": "rDate","Extend": {"Type": "Date","Align": "Center","Width": 110,"Format": "yyyy/MM/dd","DataFormat": "yyyyMMdd","EditFormat": "yyyyMMdd","Size": 8,"EmptyValue": "<span style='color:#AAA'>년,월,일 순으로 숫자만 입력해 주세요.</span>"},"Visible": 0},
    {"Header": ["chk","chk"],"Name": "chk","Type": "Bool","Visible": 0}
  ]
},

//시트 이벤트
event: {
  onRenderFirstFinish: function (evtParam) {
    // 시트에 데이터를 넣습니다.
    evtParam.sheet.loadSearchData(ib.data)
  },  

  onBeforeExport: function (evtParam) {
  
  (async () => {
        try {
          const workbook = await XlsxPopulate.fromDataAsync(
            evtParam.data.blob,
          )

          
          const password = evtParam.sheet.downPass;// 원하는 비밀번호 입력

          securedBlob = await workbook.outputAsync({
            password: password,
            type: "blob",
          })
          //evtParam.data.blob = securedBlob;

          // 다운로드 처리
          const url = URL.createObjectURL(securedBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = evtParam.sheet.fileName; //파일명
          a.click();
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error("엑셀 변환 실패:", error)
          alert("엑셀 암호 설정 중 오류가 발생했습니다.")
        }
      })()
  
  return 1 //코어쪽 엑셀 다운로드 차단
  
  },
},
//시트객체 생성
create: function () {
  var options = this.init

  options.Events = this.event
  IBSheet.create({
    id: "sheet", // 생성할 시트의 id
    el: "sheetDiv", // 시트를 생성할 Dom 객체 및 id
    options: options, // 생성될 시트의 속성
  })
},
//화면 기능
sampleBtn: function (obj) {
  let userInput = "";
   switch (obj.textContent) {
      case 'exportData':
        userInput = prompt("비밀번호를 입력해주세요");

        if (userInput !== null) {
          // 사용자가 입력하고 확인을 눌렀을 때
          console.log("입력한 값:", userInput);
          //onBeforeExport 이벤트에서 파일명과 비밀번호를 알아야 하기 때문에 패스워드값과 파일명을 따로 기억한다.
          sheet.downPass = userInput;
          sheet.fileName = "비밀번호_테스트.xlsx" 
          sheet.exportData({fileName:"비밀번호_테스트.xlsx"}); 
          
        } 
        break;
      case 'importData':
        userInput = prompt("엑셀파일에 설정한 비밀번호를 입력해주세요");
        console.log("비번", userInput);
        if (userInput == null){
          alert("비밀번호를 설정하지 않았습니다.");
          return;
        }
         // 1️.동적으로 input[type=file] 생성
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx';
        fileInput.style.display = 'none'; // 화면에 표시되지 않도록 숨김
        document.body.appendChild(fileInput);

        // 2️. 파일 선택 후 처리
        fileInput.addEventListener('change', async () => {
          if (!fileInput.files.length) {
            alert('파일을 선택하지 않았습니다.');
            document.body.removeChild(fileInput);
            return;
          }

          const file = fileInput.files[0];
          try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = await XlsxPopulate.fromDataAsync(arrayBuffer, { password:userInput });

            // 암호 제거 후 Blob 생성
            const buffer = await workbook.outputAsync();
            const blob = new Blob([buffer], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            //비밀번호를 해제한 엑셀 파일을 file속성에 설정한다. 이때는 파일 선택창을 따로 띄우지 않고 blob를 바로 로드 한다.
            sheet.importData({file:blob});

          } catch (err) {
            //console.error(err);
            alert('Excel 잠금을 해제하지 못했습니다. 비밀번호와 파일 형식을 확인하세요.');
          } finally {
            // 사용 후 input 제거
            document.body.removeChild(fileInput);
          }
        });
        // 3️. 클릭해서 파일 선택 창 열기
        fileInput.click();
        break;
    }

},
//조회 데이터
'data':[{"Reason":"01","sName":"강인철","rDate":"20030908","chk":0,"Qty":545000,"Time1":"1300","Time2":"1800"},{"Reason":"01","sName":"김수용","rDate":"20030906","chk":1,"Qty":500000,"Date1":"20030906","Date2":"20030906","Time1":"0900","Time2":"1800"},{"Reason":"02","sName":"김수용","rDate":"20030905","chk":1,"Qty":500000,"Date1":"20030905","Date2":"20030905","Time1":"0900","Time2":"1800"},{"Reason":"03","sName":"조문성","rDate":"20030905","chk":0,"Qty":50000,"Date1":"20030905","Date2":"20030905","Time1":"1400","Time2":"1500"},{"Reason":"03","sName":"조문성","rDate":"20030905","chk":1,"Qty":150000,"Date1":"20030901","Date2":"20030902","Time1":"0900","Time2":"1800"},{"Reason":"02","sName":"조문성","rDate":"20030830","chk":0,"Qty":200000,"Date1":"20030830","Date2":"20030830","Time1":"1500","Time2":"1800"},{"Reason":"01","sName":"박진성","rDate":"20030611","chk":0,"Qty":155000,"Date1":"20030611","Date2":"20030611","Time1":"2000","Time2":"2200"},{"Reason":"01","sName":"박진성","rDate":"20030508","chk":1,"Qty":0,"Date1":"20030508","Date2":"20030508","Time1":"0900","Time2":"1200"},{"Reason":"03","sName":"김응주","rDate":"19990703","chk":0,"Qty":155000,"Date1":"20030611","Date2":"20030611","Time1":"0900","Time2":"1800"},{"Reason":"02","sName":"김응주","rDate":"20050101","chk":1,"Qty":0,"Date1":"20030508","Date2":"20030508","Time1":"0900","Time2":"1200"},{"Reason":"01","sName":"김응주","rDate":"20000819","chk":0,"Qty":155000,"Date1":"20030611","Date2":"20030611","Time1":"1500","Time2":"1900"},{"Reason":"03","sName":"신요한","rDate":"20111125","chk":1,"Qty":0,"Date1":"20010108","Date2":"20030508","Time1":"0900","Time2":"1200"}]
}
ib.create()

