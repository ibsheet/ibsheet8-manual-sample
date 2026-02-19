var ib = ib||{};
ib = {
"LeftInit" : {
  //공통기능 설정 부분
  "Cfg": {
      CanDrag : 1,
      SelectingCells :0,
     
    },
    //중앙(메인) 컬럼 설정
  "Cols": [
      {"Header": " ","Type": "Bool","Name": "chk","MinWidth": 35,"Align": "Center","CanEdit": 1},
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
      
      // 단일 행일 경우 rows 배열이 없으므로 row 객체 사용
      const rowsToCheck = evtParam.rows && evtParam.rows.length ? evtParam.rows : [evtParam.row];

      // 특정 행 조건에서 드래그 취소
      for (let i = 0; i < rowsToCheck.length; i++) {
          const rowData = rowsToCheck[i];
          if(sheet.id === 'LeftSheet' && rowData.sPos === '대표이사'){
              sheet.showMessageTime('대표이사는 이동할 수 없습니다.', 800);
              return true;  // 드래그 취소
          }
      }

    if (evtParam.more) {
      // 복수행일때만 드래그 표시용 HTML
      const firstRow = rowsToCheck[0];
      const count = rowsToCheck.length;

      return `
        <div style="
          padding:8px 12px;
          background:#1976d2;
          color:#fff;
          font-weight:bold;
          border-radius:8px;
          box-shadow:0 4px 10px rgba(0,0,0,0.3);
          white-space:nowrap;
        ">
          ${firstRow.sName} 외 ${count - 1}건 이동
        </div>
      `;
  
    }
    
    },
    
    onEndDrag : function(evtParam) {
     
      // 다른 시트로 이동하는 경우만 검사
      if (evtParam.sheet !== evtParam.tosheet) {

        // 복수행 드래그인 경우만 처리
        var rowsToCheck = evtParam.rows && evtParam.rows.length
        ? evtParam.rows
        : evtParam.row
          ? [evtParam.row]
          : [];

        var blocked = false;
        for (var i = rowsToCheck.length - 1; i >= 0; i--) {

          var moveRow = rowsToCheck[i];

          // 여기서 개별 행마다 체크
          if (
            moveRow.sName === "김미경" &&
            evtParam.torow &&
            evtParam.torow.deptId &&
            evtParam.torow.deptId.startsWith("SALES")
          ) {

            blocked = true;
            
            setTimeout(function(){
              evtParam.sheet.showMessageTime(
                "김미경은 영업부서로 이동할 수 없습니다.",
                800
              );
            },10);
            
            // 복수 드래그일 경우 실제 배열 제거
            if (evtParam.rows && evtParam.rows.length) {
              evtParam.rows.splice(i, 1);
            } else {
              // 단일 드래그면 전체 취소
              return 0;
            }
          }
        }
        
      }


    },
    onAfterRowMoveToSheet:function (evtParam) {
      console.log('right onAfterRowMoveToSheet 이벤트 발생:\n' + evtParam.sheet.id + '시트에서 ' + evtParam.tosheet.id + '로 행이 이동하였습니다.');
    }
  }
},
"RightInit": {
    "Cfg": {
      "SearchMode": 2,
      "MainCol": "sName"
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
      }
  }
},
//시트객체 생성
'create':function () {
    var options = this.LeftInit;
    IBSheet.create({
      id: 'LeftSheet', // 생성할 시트의 id
      el: 'LeftSheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options // 생성될 시트의 속성
    });
    var options2 = this.RightInit;
    IBSheet.create({
      id: 'RightSheet', // 생성할 시트의 id
      el: 'RightSheetDiv', // 시트를 생성할 Dom 객체 및 id
      options: options2, // 생성될 시트의 속성
    });
},
//조회 데이터
'data':{"LeftSheetData":[{"sDept":"CEO","sTeam":" 임원","sPos":"대표이사","sName":"황정열","sSex":"남","sAge2":"50대","sAddr1":"서울","sAge":50,"Color":"#CDCDCD"},{"sDept":"SI사업부","sTeam":"임원","sPos":"상무","sName":"강대호","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":47},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"부장","sName":"김미경","sSex":"여","sAge2":"30대","sAddr1":"강원","sAge":39},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"과장","sName":"김선희","sSex":"여","sAge2":"30대","sAddr1":"경기","sAge":34},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"과장","sName":"최세희","sSex":"여","sAge2":"30대","sAddr1":"경기","sAge":32},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"대리","sName":"이명희","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":29},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"사원","sName":"노효일","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":23},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"사원","sName":"원영국","sSex":"남","sAge2":"20대","sAddr1":"경기","sAge":28},{"sDept":"SI사업부","sTeam":"개발1팀","sPos":"사원","sName":"이지선","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":24},{"sDept":"인사부","sTeam":"인사1팀","sPos":"부장","sName":"김상도","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":40},{"sDept":"인사부","sTeam":"인사1팀","sPos":"대리","sName":"한보라","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":28},{"sDept":"인사부","sTeam":"인사2팀","sPos":"사원","sName":"장태우","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":28},{"sDept":"인사부","sTeam":"인사2팀","sPos":"차장","sName":"정필석","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":40},{"sDept":"솔루션사업부","sTeam":"임원","sPos":"이사","sName":"조성목","sSex":"남","sAge2":"40대","sAddr1":"경기","sAge":41},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"부장","sName":"유봉근","sSex":"남","sAge2":"40대","sAddr1":"서울","sAge":42},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"차장","sName":"오필환","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":37},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"차장","sName":"송복석","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":39},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"과장","sName":"김남연","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":36},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"대리","sName":"한혜선","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":29},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"조미미","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":25},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"고은혜","sSex":"여","sAge2":"20대","sAddr1":"서울","sAge":26},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"성열","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":27},{"sDept":"솔루션사업부","sTeam":"개발1팀","sPos":"사원","sName":"김영중","sSex":"여","sAge2":"20대","sAddr1":"인천","sAge":28},{"sDept":"솔루션사업부","sTeam":"개발2팀","sPos":"부장","sName":"김명호","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":38},{"sDept":"솔루션사업부","sTeam":"개발2팀","sPos":"사원","sName":"하태선","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":28},{"sDept":"솔루션사업부","sTeam":"영업팀","sPos":"사원","sName":"김정민","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":32},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"차장","sName":"장성훈","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":37},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"차장","sName":"강윤식","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":35},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"대리","sName":"김수연","sSex":"여","sAge2":"30대","sAddr1":"경기","sAge":30},{"sDept":"솔루션사업부","sTeam":"기술지원팀","sPos":"대리","sName":"정은지","sSex":"여","sAge2":"30대","sAddr1":"서울","sAge":30},{"sDept":"영업팀","sTeam":"영업1팀","sPos":"사원","sName":"정창호","sSex":"남","sAge2":"20대","sAddr1":"서울","sAge":27},{"sDept":"영업팀","sTeam":"영업2팀","sPos":"대리","sName":"김대현","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":33},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"소장","sName":"안남주","sSex":"여","sAge2":"30대","sAddr1":"서울","sAge":38},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"차장","sName":"이민수","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":38},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"차장","sName":"최갑석","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":38},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"차장","sName":"김태헌","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":37},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"과장","sName":"박정석","sSex":"남","sAge2":"30대","sAddr1":"서울","sAge":32},{"sDept":"기술연구소","sTeam":"연구1팀","sPos":"과장","sName":"권기윤","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":37},{"sDept":"경영지원팀","sTeam":"경영1팀","sPos":"차장","sName":"김승운","sSex":"남","sAge2":"30대","sAddr1":"경기","sAge":39},{"sDept":"경영지원팀","sTeam":"경영1팀","sPos":"사원","sName":"이해영","sSex":"여","sAge2":"20대","sAddr1":"경기","sAge":23}]
,"RightSheetData":[{"deptId":"HOLDING","parentDept":null,"sName":"지주사","Items":[{"deptId":"MGMT","parentDept":"HOLDING","sName":"경영부","Items":[{"deptId":"MGMT_GA","parentDept":"MGMT","sName":"총무지원팀"},{"deptId":"MGMT_HR","parentDept":"MGMT","sName":"인사팀"}]},{"deptId":"SALES","parentDept":"HOLDING","sName":"영업부","Items":[{"deptId":"SALES_DOM","parentDept":"SALES","sName":"국내영업팀"},{"deptId":"SALES_INT","parentDept":"SALES","sName":"해외영업팀"},{"deptId":"SALES_SUPPORT","parentDept":"SALES","sName":"영업지원팀"}]},{"deptId":"SI","parentDept":"HOLDING","sName":"SI사업부","Items":[{"deptId":"SI_RND","parentDept":"SI","sName":"기술연구소"},{"deptId":"SI_DEV1","parentDept":"SI","sName":"개발1팀"},{"deptId":"SI_DEV2","parentDept":"SI","sName":"개발2팀"},{"deptId":"SI_DEV3","parentDept":"SI","sName":"개발3팀"}]},{"deptId":"SOLUTION","parentDept":"HOLDING","sName":"솔루션사업부","Items":[{"deptId":"SOLUTION_DEV1","parentDept":"SOLUTION","sName":"솔루션개발1팀"},{"deptId":"SOLUTION_DEV2","parentDept":"SOLUTION","sName":"솔루션개발2팀"},{"deptId":"SOLUTION_QA","parentDept":"SOLUTION","sName":"QA"},{"deptId":"SOLUTION_SUPPORT","parentDept":"SOLUTION","sName":"기술지원팀"}]}]}]
}
}
ib.create();
