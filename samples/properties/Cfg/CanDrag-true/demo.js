var ib = ib||{};
ib = {
"LeftInit" : {
  //공통기능 설정 부분
  "Cfg": {
      CanDrag: 1
    },
    //중앙(메인) 컬럼 설정
  "Cols": [
      {"Header": "","Type": "Bool","Name": "chk","MinWidth": 35,"Align": "Center","CanEdit": 1},
      {"Header": "직급","Type": "Text","Name": "sPos","MinWidth": 60,"Align": "Center","CanEdit": 0},
      {"Header": "성명","Type": "Text","Name": "sName","MinWidth": 50,"Align": "Center","CanEdit": 0,"RelWidth": 1},
      {"Header": "성별","Type": "Enum","Name": "sSex","MinWidth": 40,"Align": "Center","Enum": "|男|女","EnumKeys": "|남|여"},
      {"Header": "연령대","Type": "Text","Name": "sAge2","MinWidth": 50,"Align": "Center"},
      {"Header": "거주지1","Type": "Text","Name": "sAddr1","MinWidth": 50,"Align": "Center","CanEdit": 0,"RelWidth": 1},
      {"Header": "나이","Type": "Int","Name": "sAge","MinWidth": 50,"Align": "Right","CanEdit": 0}
    ],
  "Events": {
  	onRenderFirstFinish: function(evt) {
      evt.sheet.loadSearchData(ib.data.LeftSheetData)
    },
    onStartDrag:function (evtParam) {
      var sheet = evtParam.sheet;

      if (sheet.id === 'LeftSheet' && evtParam.row.sPos === '대표이사') {
        sheet.showMessageTime('대표이사는 이동할 수 없습니다.', 800);

        return true;
      }
    },
    onAfterRowMoveToSheet:function (evtParam) {
      console.log('onAfterRowMoveToSheet 이벤트 발생:\n' + evtParam.sheet.id + '시트에서 ' + evtParam.tosheet.id + '로 행이 이동하였습니다.');
    }
  }
},
"RightInit": {
    "Cfg": {
      "SearchMode": 2,
      "MainCol": "sName",
      CanDrag: 1
    },
    //틀고정 좌측 컬럼 설정
  "LeftCols": [
      {"Type": "Int","Width": 60,"Align": "Center","Name": "SEQ"}
    ],
    "Cols": [
      {"Header": "부서/성명","Type": "Text","Name": "sName","Width": 150,"Align": "Left"},
      {"Header": "직급","Type": "Text","Name": "sPos","MinWidth": 60,"Align": "Center","CanEdit": 0},
      {"Header": "성별","Type": "Enum","Name": "sSex","MinWidth": 40,"Align": "Center","Enum": "|男|女","EnumKeys": "|남|여"},
      {"Header": "연령대","Type": "Text","Name": "sAge2","MinWidth": 50,"Align": "Center"},
      {"Header": "거주지1","Type": "Text","Name": "sAddr1","MinWidth": 50,"Align": "Center","CanEdit": 0,"RelWidth": 1},
      {"Header": "나이","Type": "Int","Name": "sAge","MinWidth": 50,"Align": "Right","CanEdit": 0,"Format": "#,###"}
    ],
    Events: {
      onRenderFirstFinish: function(evt) {
        evt.sheet.loadSearchData(ib.data.RightSheetData)
      },
      onEndDrag:function (evtParam) {
      var sheet = evtParam.tosheet;
      var deptName = evtParam.torow.sName;
      var deptLastStr = deptName.substring(deptName.length - 1);

      if (sheet.id === 'RightSheet' && (deptName === '지주사' || deptLastStr === '부')) {
        sheet.showMessageTime('지주사 나 부서 아래로는 추가할 수 없습니다.', 800);

        return 0;
      } if (sheet.id === 'RightSheet' && deptLastStr === '팀') {
        if (evtParam.type != 2) {
          sheet.showMessageTime('팀과 같은 레벨로 추가할 수는 없습니다.', 800);

          return 0;
        }
      } else if (evtParam.type == 2) {
        sheet.showMessageTime('개인 밑에 개인을 추가할 수 없습니다.', 800);

        return 0;
      }
    },
    onAfterRowMoveToSheet:function (evtParam) {
      console.log('onAfterRowMoveToSheet 이벤트 발생:\n' + evtParam.sheet.id + '시트에서 ' + evtParam.tosheet.id + '로 행이 이동하였습니다.');
    }
  }
},
//시트객체 생성
'create':function () {
    var options = this.LeftInit;
    IBSheet.create({
      id: 'LeftSheet', // 생성할 시트의 id
      el: 'LeftSheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options, // 생성될 시트의 속성
      //data: this.data.LeftSheetData // 생성될 시트의 정적데이터
    });
    var options2 = this.RightInit;
    IBSheet.create({
      id: 'RightSheet', // 생성할 시트의 id
      el: 'RightSheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options2, // 생성될 시트의 속성
    });
  },
//화면 기능
'sampleBtn':function () {
    
  },
//조회 데이터
'data':{"LeftSheetData":[{"sDept":"CEO","sTeam":" 임원","sPos":"대표이사","sName":"황정열","sSex":"남","sAge2":"50대","sAddr1":"서울","sAge":50,"Color":"#CDCDCD"},{"sDept":"SI사업부","sTeam":"임원","sPos":"상무","sName":"강대호","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":47},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"부장","sName":"김미경","sSex":"여","sAge2":"30대","sAddr1":"강원","sAge":39},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"과장","sName":"김선희","sSex":"여","sAge2":"30대","sAddr1":"경기","sAge":34},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"과장","sName":"최세희","sSex":"여","sAge2":"30대","sAddr1":"경기","sAge":32},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"대리","sName":"이명희","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":29},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"사원","sName":"노효일","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":23},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"사원","sName":"원영국","sSex":"남","sAge2":"20대","sAddr1":"경기","sAge":28},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"사원","sName":"이지선","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":24},{"sDept":"인사부","sTeam":"인사1팀","sPos":"부장","sName":"김상도","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":40},{"sDept":"인사부","sTeam":"인사1팀","sPos":"대리","sName":"한보라","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":28},{"sDept":"인사부","sTeam":"인사2팀","sPos":"사원","sName":"장태우","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":28},{"sDept":"인사부","sTeam":"인사2팀","sPos":"차장","sName":"정필석","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":40},{"sDept":"솔루션사업부","sTeam":"임원","sPos":"이사","sName":"조성목","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":41},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"부장","sName":"유봉근","sSex":"남","sAge2":"40대","sAddr1":"서울","sAge":42},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"차장","sName":"오필환","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":37},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"차장","sName":"송복석","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":39},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"과장","sName":"김남연","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":36},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"대리","sName":"한혜선","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":29},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"조미미","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":25},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"고은혜","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":26},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"성열","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":27},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"김영중","sSex":"여","sAge2":"20대","sAddr1":"인천","sAge":28},{"sDept":"솔루션사업부","sTeam":"개발2팀","sPos":"부장","sName":"김명호","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":38},{"sDept":"솔루션사업부","sTeam":"개발2팀","sPos":"사원","sName":"하태선","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":28},{"sDept":"솔루션사업부","sTeam":"영업팀","sPos":"사원","sName":"김정민","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":32},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"차장","sName":"장성훈","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":37},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"차장","sName":"강윤식","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":35},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"대리","sName":"김수연","sSex":"여","sAge2":"30대","sAddr1":"경기","sAge":30},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"대리","sName":"정은지","sSex":"여","sAge2":"30대","sAddr1":"서울","sAge":30},{"sDept":"영업팀","sTeam":"영업1팀","sPos":"사원","sName":"정창호","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":27},{"sDept":"영업팀","sTeam":"영업2팀","sPos":"대리","sName":"김대현","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":33},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"소장","sName":"안남주","sSex":"여","sAge2":"30대","sAddr1":"서울","sAge":38},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"차장","sName":"이민수","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":38},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"차장","sName":"최갑석","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":38},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"차장","sName":"김태헌","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":37},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"과장","sName":"박정석","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":32},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"과장","sName":"권기윤","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":37},{"sDept":"경영지원팀","sTeam":"경영1팀","sPos":"차장","sName":"김승운","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":39},{"sDept":"경영지원팀","sTeam":"경영1팀","sPos":"사원","sName":"이해영","sSex":"여","sAge2":"20대","sAddr1":"경기","sAge":23}],"RightSheetData":[{"sName":"지주사","CanDrag":0,"Items":[{"sName":"경영부","CanDrag":0,"Items":[{"sName":"총무지원팀","CanDrag":0},{"sName":"인사팀","CanDrag":0}]},{"sName":"영업부","CanDrag":0,"Items":[{"sName":"국내영업팀","CanDrag":0},{"sName":"해외영업팀","CanDrag":0},{"sName":"영업지원팀","CanDrag":0}]},{"sName":"SI사업부","CanDrag":0,"Items":[{"sName":"기술연구소","CanDrag":0},{"sName":"개발1팀","CanDrag":0},{"sName":"개발2팀","CanDrag":0},{"sName":"개발3팀","CanDrag":0}]},{"sName":"솔루션사업부","CanDrag":0,"Items":[{"sName":"솔루션개발1팀","CanDrag":0},{"sName":"솔루션개발2팀","CanDrag":0},{"sName":"QA","CanDrag":0},{"sName":"기술지원팀","CanDrag":0}]}]}]}
}
ib.create();
