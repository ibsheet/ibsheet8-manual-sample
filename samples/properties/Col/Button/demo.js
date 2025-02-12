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
    {"Header": "Button Check","Type": "Text","Name": "sCheck","Width": 200,"Align": "Center","CanEdit": 1, Button: "Check"},
    {"Header": "Button Clear","Type": "Text","Name": "sClear","Width": 200,"Align": "Center","CanEdit": 1, Button: "Clear"},
    {"Header": "Button Etc","Type": "Text","Name": "sEtc","Width": 200,"Align": "Center","CanEdit": 1, 
      Button: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgNjQwIDY0MCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1Ij48ZGVmcz48cGF0aCBkPSJNMjc5LjczIDM0LjdMMjg5LjAxIDM1LjY0TDI5OC4xNyAzNi45NUwzMDcuMjIgMzguNjFMMzE2LjEzIDQwLjYyTDMyNC45MiA0Mi45OEwzMzMuNTYgNDUuNjZMMzQyLjA1IDQ4LjY4TDM1MC4zOCA1Mi4wMUwzNTguNTUgNTUuNjZMMzY2LjU1IDU5LjYxTDM3NC4zNyA2My44NkwzODIuMDEgNjguMzlMMzg5LjQ1IDczLjIxTDM5Ni42OCA3OC4zMUw0MDMuNzEgODMuNjdMNDEwLjUzIDg5LjNMNDE3LjEyIDk1LjE3TDQyMy40OCAxMDEuMjlMNDI5LjYgMTA3LjY1TDQzNS40OCAxMTQuMjRMNDQxLjEgMTIxLjA2TDQ0Ni40NiAxMjguMDlMNDUxLjU2IDEzNS4zM0w0NTYuMzggMTQyLjc3TDQ2MC45MiAxNTAuNEw0NjUuMTcgMTU4LjIyTDQ2OS4xMiAxNjYuMjJMNDcyLjc2IDE3NC4zOUw0NzYuMSAxODIuNzJMNDc5LjExIDE5MS4yMkw0ODEuOCAxOTkuODZMNDg0LjE1IDIwOC42NEw0ODYuMTYgMjE3LjU2TDQ4Ny44MiAyMjYuNkw0ODkuMTMgMjM1Ljc2TDQ5MC4wNyAyNDUuMDRMNDkwLjY0IDI1NC40Mkw0OTAuODMgMjYzLjlMNDkwLjY0IDI3My4zOEw0OTAuMDcgMjgyLjc2TDQ4OS4xMyAyOTIuMDRMNDg3LjgyIDMwMS4yTDQ4Ni4xNiAzMTAuMjVMNDg0LjE1IDMxOS4xNkw0ODEuOCAzMjcuOTVMNDc5LjExIDMzNi41OUw0NzYuMSAzNDUuMDhMNDcyLjc2IDM1My40MUw0NjkuMTIgMzYxLjU4TDQ2NS4xNyAzNjkuNThMNDYwLjkyIDM3Ny40TDQ1Ni4zOCAzODUuMDRMNDUxLjczIDM5Mi4yMkw1OTYuOTcgNTM3LjQ2TDUzNC40MyA2MDBMMzg5LjE5IDQ1NC43NkwzODIuMDEgNDU5LjQxTDM3NC4zNyA0NjMuOTVMMzY2LjU1IDQ2OC4yTDM1OC41NSA0NzIuMTVMMzUwLjM4IDQ3NS43OUwzNDIuMDUgNDc5LjEzTDMzMy41NiA0ODIuMTRMMzI0LjkyIDQ4NC44M0wzMTYuMTMgNDg3LjE4TDMwNy4yMiA0ODkuMTlMMjk4LjE3IDQ5MC44NUwyODkuMDEgNDkyLjE2TDI3OS43MyA0OTMuMUwyNzAuMzUgNDkzLjY3TDI2MC44NyA0OTMuODZMMjUxLjM5IDQ5My42N0wyNDIuMDEgNDkzLjFMMjMyLjczIDQ5Mi4xNkwyMjMuNTcgNDkwLjg1TDIxNC41MyA0ODkuMTlMMjA1LjYxIDQ4Ny4xOEwxOTYuODMgNDg0LjgzTDE4OC4xOSA0ODIuMTRMMTc5LjY5IDQ3OS4xM0wxNzEuMzYgNDc1Ljc5TDE2My4xOSA0NzIuMTVMMTU1LjE5IDQ2OC4yTDE0Ny4zNyA0NjMuOTVMMTM5Ljc0IDQ1OS40MUwxMzIuMyA0NTQuNTlMMTI1LjA2IDQ0OS40OUwxMTguMDMgNDQ0LjEzTDExMS4yMSA0MzguNTFMMTA0LjYyIDQzMi42M0w5OC4yNiA0MjYuNTFMOTIuMTQgNDIwLjE1TDg2LjI3IDQxMy41Nkw4MC42NCA0MDYuNzRMNzUuMjggMzk5LjcxTDcwLjE4IDM5Mi40OEw2NS4zNiAzODUuMDRMNjAuODIgMzc3LjRMNTYuNTggMzY5LjU4TDUyLjYzIDM2MS41OEw0OC45OCAzNTMuNDFMNDUuNjUgMzQ1LjA4TDQyLjYzIDMzNi41OUwzOS45NSAzMjcuOTVMMzcuNTkgMzE5LjE2TDM1LjU4IDMxMC4yNUwzMy45MiAzMDEuMkwzMi42MSAyOTIuMDRMMzEuNjcgMjgyLjc2TDMxLjEgMjczLjM4TDMwLjkxIDI2My45TDMxLjEgMjU0LjQyTDMxLjY3IDI0NS4wNEwzMi42MSAyMzUuNzZMMzMuOTIgMjI2LjZMMzUuNTggMjE3LjU2TDM3LjU5IDIwOC42NEwzOS45NSAxOTkuODZMNDIuNjMgMTkxLjIyTDQ1LjY1IDE4Mi43Mkw0OC45OCAxNzQuMzlMNTIuNjMgMTY2LjIyTDU2LjU4IDE1OC4yMkw2MC44MiAxNTAuNEw2NS4zNiAxNDIuNzdMNzAuMTggMTM1LjMzTDc1LjI4IDEyOC4wOUw4MC42NCAxMjEuMDZMODYuMjcgMTE0LjI0TDkyLjE0IDEwNy42NUw5OC4yNiAxMDEuMjlMMTA0LjYyIDk1LjE3TDExMS4yMSA4OS4zTDExOC4wMyA4My42N0wxMjUuMDYgNzguMzFMMTMyLjMgNzMuMjFMMTM5Ljc0IDY4LjM5TDE0Ny4zNyA2My44NkwxNTUuMTkgNTkuNjFMMTYzLjE5IDU1LjY2TDE3MS4zNiA1Mi4wMUwxNzkuNjkgNDguNjhMMTg4LjE5IDQ1LjY2TDE5Ni44MyA0Mi45OEwyMDUuNjEgNDAuNjJMMjE0LjUzIDM4LjYxTDIyMy41NyAzNi45NUwyMzIuNzMgMzUuNjRMMjQyLjAxIDM0LjdMMjUxLjM5IDM0LjEzTDI2MC44NyAzMy45NEwyNzAuMzUgMzQuMTNMMjc5LjczIDM0LjdaTTI0OS4yMyAxMjIuNDhMMjQzLjUxIDEyMy4wNkwyMzcuODYgMTIzLjg3TDIzMi4yOCAxMjQuODlMMjI2Ljc3IDEyNi4xM0wyMjEuMzUgMTI3LjU5TDIxNi4wMiAxMjkuMjRMMjEwLjc4IDEzMS4xTDIwNS42NCAxMzMuMTZMMjAwLjYgMTM1LjQxTDE5NS42NiAxMzcuODVMMTkwLjg0IDE0MC40N0wxODYuMTMgMTQzLjI3TDE4MS41NCAxNDYuMjRMMTc3LjA3IDE0OS4zOUwxNzIuNzMgMTUyLjdMMTY4LjUzIDE1Ni4xN0wxNjQuNDYgMTU5Ljc5TDE2MC41NCAxNjMuNTdMMTU2Ljc2IDE2Ny40OUwxNTMuMTQgMTcxLjU2TDE0OS42NyAxNzUuNzZMMTQ2LjM2IDE4MC4xTDE0My4yMSAxODQuNTdMMTQwLjI0IDE4OS4xNkwxMzcuNDQgMTkzLjg3TDEzNC44MiAxOTguNjlMMTMyLjM4IDIwMy42M0wxMzAuMTMgMjA4LjY3TDEyOC4wNyAyMTMuODFMMTI2LjIxIDIxOS4wNUwxMjQuNTYgMjI0LjM4TDEyMy4xIDIyOS44TDEyMS44NiAyMzUuMzFMMTIwLjg0IDI0MC44OUwxMjAuMDMgMjQ2LjU0TDExOS40NSAyNTIuMjZMMTE5LjEgMjU4LjA1TDExOC45OCAyNjMuOUwxMTkuMSAyNjkuNzVMMTE5LjQ1IDI3NS41NEwxMjAuMDMgMjgxLjI2TDEyMC44NCAyODYuOTJMMTIxLjg2IDI5Mi41TDEyMy4xIDI5OEwxMjQuNTYgMzAzLjQyTDEyNi4yMSAzMDguNzVMMTI4LjA3IDMxMy45OUwxMzAuMTMgMzE5LjEzTDEzMi4zOCAzMjQuMTdMMTM0LjgyIDMyOS4xMUwxMzcuNDQgMzMzLjkzTDE0MC4yNCAzMzguNjRMMTQzLjIxIDM0My4yM0wxNDYuMzYgMzQ3LjdMMTQ5LjY3IDM1Mi4wNEwxNTMuMTQgMzU2LjI0TDE1Ni43NiAzNjAuMzFMMTYwLjU0IDM2NC4yM0wxNjQuNDYgMzY4LjAxTDE2OC41MyAzNzEuNjRMMTcyLjczIDM3NS4xMUwxNzcuMDcgMzc4LjQyTDE4MS41NCAzODEuNTZMMTg2LjEzIDM4NC41M0wxOTAuODQgMzg3LjMzTDE5NS42NiAzODkuOTZMMjAwLjYgMzkyLjM5TDIwNS42NCAzOTQuNjRMMjEwLjc4IDM5Ni43TDIxNi4wMiAzOTguNTZMMjIxLjM1IDQwMC4yMkwyMjYuNzcgNDAxLjY3TDIzMi4yOCA0MDIuOTFMMjM3Ljg2IDQwMy45NEwyNDMuNTEgNDA0Ljc0TDI0OS4yMyA0MDUuMzJMMjU1LjAyIDQwNS42N0wyNjAuODcgNDA1Ljc5TDI2Ni43MiA0MDUuNjdMMjcyLjUxIDQwNS4zMkwyNzguMjMgNDA0Ljc0TDI4My44OSA0MDMuOTRMMjg5LjQ3IDQwMi45MUwyOTQuOTcgNDAxLjY3TDMwMC4zOSA0MDAuMjJMMzA1LjcyIDM5OC41NkwzMTAuOTYgMzk2LjdMMzE2LjEgMzk0LjY0TDMyMS4xNCAzOTIuMzlMMzI2LjA4IDM4OS45NkwzMzAuOSAzODcuMzNMMzM1LjYxIDM4NC41M0wzNDAuMiAzODEuNTZMMzQ0LjY3IDM3OC40MkwzNDkuMDEgMzc1LjExTDM1My4yMSAzNzEuNjRMMzU3LjI4IDM2OC4wMUwzNjEuMiAzNjQuMjNMMzY0Ljk4IDM2MC4zMUwzNjguNjEgMzU2LjI0TDM3Mi4wOCAzNTIuMDRMMzc1LjM5IDM0Ny43TDM3OC41MyAzNDMuMjNMMzgxLjUgMzM4LjY0TDM4NC4zIDMzMy45M0wzODYuOTMgMzI5LjExTDM4OS4zNiAzMjQuMTdMMzkxLjYxIDMxOS4xM0wzOTMuNjcgMzEzLjk5TDM5NS41MyAzMDguNzVMMzk3LjE5IDMwMy40MkwzOTguNjQgMjk4TDM5OS44OCAyOTIuNUw0MDAuOTEgMjg2LjkyTDQwMS43MSAyODEuMjZMNDAyLjI5IDI3NS41NEw0MDIuNjQgMjY5Ljc1TDQwMi43NiAyNjMuOUw0MDIuNjQgMjU4LjA1TDQwMi4yOSAyNTIuMjZMNDAxLjcxIDI0Ni41NEw0MDAuOTEgMjQwLjg5TDM5OS44OCAyMzUuMzFMMzk4LjY0IDIyOS44TDM5Ny4xOSAyMjQuMzhMMzk1LjUzIDIxOS4wNUwzOTMuNjcgMjEzLjgxTDM5MS42MSAyMDguNjdMMzg5LjM2IDIwMy42M0wzODYuOTMgMTk4LjY5TDM4NC4zIDE5My44N0wzODEuNSAxODkuMTZMMzc4LjUzIDE4NC41N0wzNzUuMzkgMTgwLjFMMzcyLjA4IDE3NS43NkwzNjguNjEgMTcxLjU2TDM2NC45OCAxNjcuNDlMMzYxLjIgMTYzLjU3TDM1Ny4yOCAxNTkuNzlMMzUzLjIxIDE1Ni4xN0wzNDkuMDEgMTUyLjdMMzQ0LjY3IDE0OS4zOUwzNDAuMiAxNDYuMjRMMzM1LjYxIDE0My4yN0wzMzAuOSAxNDAuNDdMMzI2LjA4IDEzNy44NUwzMjEuMTQgMTM1LjQxTDMxNi4xIDEzMy4xNkwzMTAuOTYgMTMxLjFMMzA1LjcyIDEyOS4yNEwzMDAuMzkgMTI3LjU5TDI5NC45NyAxMjYuMTNMMjg5LjQ3IDEyNC44OUwyODMuODkgMTIzLjg3TDI3OC4yMyAxMjMuMDZMMjcyLjUxIDEyMi40OEwyNjYuNzIgMTIyLjEzTDI2MC44NyAxMjIuMDFMMjU1LjAyIDEyMi4xM0wyNDkuMjMgMTIyLjQ4WiIgaWQ9ImJpVVlobFRwNiI+PC9wYXRoPjwvZGVmcz48Zz48Zz48Zz48dXNlIHhsaW5rOmhyZWY9IiNiaVVZaGxUcDYiIG9wYWNpdHk9IjEiIGZpbGw9IiM1OTU5NTkiIGZpbGwtb3BhY2l0eT0iMSI+PC91c2U+PC9nPjwvZz48L2c+PC9zdmc+"
    },
    {"Header": "Button Button","Type": "Text","Name": "sButton","Width": 200,"Align": "Center","CanEdit": 1, Button: "Button", ButtonText: "버튼", WidthPad: 50}
  ]
},
//시트 이벤트
'event':{
  onRenderFirstFinish: function (evt) {
    evt.sheet.loadSearchData(ib.data);
  },
  onButtonClick: function (evt) {
    if(evt.col == "sEtc") {
      var opt = {
        row: evt.row,
        col: evt.col,
        dialog: {
          Modal: 1,
          Body: "<div>Button Click !!</div>"
          +"<div style='text-align: center'><button type='button' onclick='func_process()'>닫기</button></div>"
        }
      }
      evt.sheet.showDialog(opt);
      return 1;
    } else if(evt.col == "sButton") {
      var msg;
      switch(evt.sheet.getValue(evt.row, evt.col)) {
        case "한국": msg = "KOR"; break;
        case "일본": msg = "JPN"; break;
        case "중국": msg = "CHN"; break;
        case "인도": msg = "IND"; break;
        case "미국": msg = "USA"; break;
        case "캐나다": msg = "CAN"; break;
        case "독일": msg = "DEU"; break;
        case "프랑스": msg = "FRA"; break;
        case "영국": msg = "GBR"; break;
        case "브라질": msg = "BRA"; break;
        case "베트남": msg = "VNM"; break;
        case "멕시코": msg = "MEX"; break;
        case "아르헨티나": msg = "ARG"; break;
      }
      evt.sheet.showMessageTime({message: '<span style=\'color:black\'>' + msg + '</span>', time: 0});
      return 1;
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
    });
  },
//화면 기능
'sampleBtn':function () {
},
//조회 데이터
'data':[{"sCheck":"장순연","sCheckChecked":1,"sClear":"굿바이 싱글","sEtc":"보헤미안랩소디","sButton":"한국"},{"sCheck":"김정호","sClear":"봉이 김선달","sEtc":"국가부도의날","sButton":"일본"},{"sCheck":"정상호","sClear":"도리를 찾아서","sEtc":"범블비","sButton":"중국"},{"sCheck":"안수현","sCheckChecked":1,"sClear":"레전드 오브 타잔","sEtc":"완벽한타인","sButton":"인도"},{"sCheck":"박만우","sClear":"사냥","sEtc":"로마","sButton":"미국"},{"sCheck":"최호건","sClear":"나우 유 씨 미 2","sEtc":"신데렐라","sButton":"캐나다"},{"sCheck":"이민후","sClear":"인디펜던스 데이 : 리써전스","sEtc":"뷰티풀데이즈","sButton":"독일"},{"sCheck":"김호정","sClear":"정글북","sEtc":"신과함께-인과연","sButton":"프랑스"},{"sCheck":"김호수","sCheckChecked":1,"sClear":"컨저링 2","sEtc":"박물관이진짜살아있다","sButton":"영국"},{"sCheck":"오미려","sClear":"500일의 썸머","sEtc":"해피투게더","sButton":"브라질"},{"sCheck":"차수식","sClear":"곡성","sEtc":"안시성","sButton":"베트남"},{"sCheck":"맹인주","sClear":"본 얼티메이텀","sEtc":"원더풀고스트","sButton":"멕시코"},{"sCheck":"전명준","sClear":"부산행","sEtc":"카메라를멈추면안돼!","sButton":"아르헨티나"}]}
ib.create();

function func_process() {
  sheet.Dialog.close();
}