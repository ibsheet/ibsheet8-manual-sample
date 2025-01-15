var ib = ib||{};
ib = {
//시트 초기화 구문
'init':{
  //공통기능 설정 부분
  "Cfg": {
    "SearchMode": 0,
    "HeaderMerge": 3,
    "MessageWidth": 300,
    DataMerge: 0
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
    {"Header": "코드번호|코드번호", "Type": "Text", "Width": 120, "Name": "sCodeNo", "Align": "Center"}, 
    {"Header": "강좌명|강좌명", "Type": "Text", "Width": 200, "Name": "sLecName", "Align": "Left"}, 
    {"Header": "강의일시|요일", "Type": "Text", "Width": 120, "Name": "sDay", "Align": "Center"}, 
    {"Header": "강의일시|시간", "Type": "Text", "Width": 120, "Name": "sTime", "Align": "Center"}, 
    {"Header": "강의안내|강사", "Type": "Text", "Width": 120, "Name": "sTeacher", "Align": "Center"}, 
    {"Header": "강의안내|대상", "Type": "Text", "Width": 120, "Name": "sTarget", "Align": "Left"}, 
    {"Header": "강의안내|정원수", "Type": "Int", "Width": 120, "Name": "sLimit", "Align": "Center"}, 
    {"Header": "수강료|수강료", "Type": "Int", "Width": 120, "Name": "sTuition", "Align": "Center"}, 
    {"Header": "강의실|강의실", "Type": "Text", "Width": 120, "SaveName": "sRoom", "Align": "Center"}
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
'data':[{"sRoom":"별관 2층","sTime":"16:00~18:00","sDay":"화","sTuition":"60000","sTarget":"성인 누구나","sTeacher":"전병옥","sCodeNo":"100","sLimit":"20","sLecName":"사물놀이"},{"sRoom":"별관 2층","sTime":"10:00~11:30","sDay":"월","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김경훈","sCodeNo":"101","sLimit":"25","sLecName":"댄스스포츠 (고급)-자이브,왈츠 "},{"sRoom":"별관 2층","sTime":"10:00~11:30","sDay":"목","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김은혜","sCodeNo":"102","sLimit":"25","sLecName":"댄스스포츠 (중급1)-차차차"},{"sRoom":"별관 2층","sTime":"11:30~13:00","sDay":"목","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김은혜","sCodeNo":"102","sLimit":"25","sLecName":"댄스스포츠 (중급1)-차차차"},{"sRoom":"별관 2층","sTime":"10:00~11:30","sDay":"화","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"이은희","sCodeNo":"105","sLimit":"25","sLecName":"라인.살사(초급)"},{"sRoom":"별관 2층","sTime":"10:00~11:30","sDay":"수","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"이은희","sCodeNo":"105","sLimit":"25","sLecName":"라인.살사(초급)"},{"sRoom":"별관 2층","sTime":"15:30~17:00","sDay":"수","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김경자","sCodeNo":"106","sLimit":"20","sLecName":"성인 모듬북 (중급)"},{"sRoom":"별관 2층","sTime":"15:30~17:00","sDay":"목","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김경자","sCodeNo":"106","sLimit":"20","sLecName":"성인 모듬북 (중급)"},{"sRoom":"별관 2층","sTime":"15:30~17:00","sDay":"금","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김경자","sCodeNo":"106","sLimit":"20","sLecName":"성인 모듬북 (중급)"},{"sRoom":"별관 2층","sTime":"14:30~16:00","sDay":"수","sTuition":"45000","sTarget":"성인 여성","sTeacher":"김경자","sCodeNo":"107","sLimit":"25","sLecName":"한국무용 (살풀이,허튼춤,장구춤)"},{"sRoom":"별관 2층","sTime":"18:30~19:30","sDay":"수","sTuition":"45000","sTarget":"성인 여성","sTeacher":"김경자","sCodeNo":"107","sLimit":"25","sLecName":"한국무용 (살풀이,허튼춤,장구춤)"},{"sRoom":"별관 2층","sTime":"10:00~12:00","sDay":"금","sTuition":"120000","sTarget":"성인 누구나","sTeacher":"김경자","sCodeNo":"108","sLimit":"20","sLecName":"성인 풍물 (연구반)(웃다리,삼도,판굿)"},{"sRoom":"별관 2층","sTime":"13:00~14:30","sDay":"금","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김경자","sCodeNo":"109","sLimit":"20","sLecName":"성인 풍물 (중급) (영남,설장고)"},{"sRoom":"별관 2층","sTime":"16:00~17:00","sDay":"목","sTuition":"45000","sTarget":"초등학생이상","sTeacher":"김용숙","sCodeNo":"113","sLimit":"15","sLecName":"가야금 "},{"sRoom":"별관 2층","sTime":"16:00~17:00","sDay":"금","sTuition":"45000","sTarget":"초등학생이상","sTeacher":"김용숙","sCodeNo":"113","sLimit":"15","sLecName":"가야금 "},{"sRoom":"별관 2층","sTime":"16:00~17:00","sDay":"토","sTuition":"45000","sTarget":"초등학생이상","sTeacher":"김용숙","sCodeNo":"113","sLimit":"15","sLecName":"가야금 "},{"sRoom":"별관 2층","sTime":"10:00~11:30","sDay":"수","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"최병문","sCodeNo":"116","sLimit":"30","sLecName":"서도소리 "},{"sRoom":"별관 2층","sTime":"13:00~14:30","sDay":"월","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"서혜준","sCodeNo":"117","sLimit":"30","sLecName":"경기민요 (가락장구)"},{"sRoom":"별관 2층","sTime":"12:00~13:30","sDay":"화","sTuition":"45000","sTarget":"50세 이상 누구나","sTeacher":"신순하","sCodeNo":"120","sLimit":"25","sLecName":"실버 댄스스포츠(중급)-차차차,지르박"},{"sRoom":"별관 2층","sTime":"14:00~15:30","sDay":"화","sTuition":"45000","sTarget":"누구나","sTeacher":"이순경","sCodeNo":"123","sLimit":"30","sLecName":"경기민요"},{"sRoom":"지하1층 생활체육실","sTime":"10:00~11:30","sDay":"목","sTuition":"45000","sTarget":"성인 여성","sTeacher":"최주연","sCodeNo":"301","sLimit":"25","sLecName":"한국무용 (중급)-입춤 "},{"sRoom":"지하1층 생활체육실","sTime":"12:00~13:30","sDay":"목","sTuition":"45000","sTarget":"성인 여성","sTeacher":"최주연","sCodeNo":"302","sLimit":"25","sLecName":"한국무용 (초급)-살풀이"},{"sRoom":"지하1층 생활체육실","sTime":"14:00~15:30","sDay":"목","sTuition":"45000","sTarget":"성인 여성","sTeacher":"최주연","sCodeNo":"302","sLimit":"25","sLecName":"한국무용 (초급)-살풀이"},{"sRoom":"지하1층 생활체육실","sTime":"16:00~17:30","sDay":"목","sTuition":"45000","sTarget":"성인 여성","sTeacher":"최주연","sCodeNo":"302","sLimit":"25","sLecName":"한국무용 (초급)-살풀이"},{"sRoom":"지하1층 생활체육실","sTime":"14:00~15:30","sDay":"수","sTuition":"45000","sTarget":"성인 여성","sTeacher":"이명자","sCodeNo":"303","sLimit":"25","sLecName":"우리춤 (중급)-교방무,진쇄춤,강원도아리랑"},{"sRoom":"지하1층 생활체육실","sTime":"10:00~11:30","sDay":"수","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"권란수","sCodeNo":"304","sLimit":"25","sLecName":"댄스스포츠 (입문반)-자이브"},{"sRoom":"지하1층 생활체육실","sTime":"20:00~21:30","sDay":"화","sTuition":"45000","sTarget":"성인 여성","sTeacher":"임희진","sCodeNo":"318","sLimit":"25","sLecName":"방송재즈댄스"},{"sRoom":"지하1층 생활체육실","sTime":"19:00~20:00","sDay":"화","sTuition":"30000","sTarget":"누구나","sTeacher":"임희진","sCodeNo":"320","sLimit":"30","sLecName":"필라테스요가 "},{"sRoom":"지하1층 생활체육실","sTime":"19:00~20:00","sDay":"목","sTuition":"30000","sTarget":"누구나","sTeacher":"임희진","sCodeNo":"320","sLimit":"30","sLecName":"필라테스요가 "},{"sRoom":"지하1층 생활체육실","sTime":"12:00~13:00","sDay":"월","sTuition":"30000","sTarget":"누구나","sTeacher":"임희진","sCodeNo":"320","sLimit":"30","sLecName":"필라테스요가 "},{"sRoom":"지하1층 생활체육실","sTime":"12:00~13:00","sDay":"수","sTuition":"30000","sTarget":"누구나","sTeacher":"임희진","sCodeNo":"320","sLimit":"30","sLecName":"필라테스요가"},{"sRoom":"지하1층 생활체육실","sTime":"14:00~15:30","sDay":"금","sTuition":"45000","sTarget":"성인 여성","sTeacher":"유미애","sCodeNo":"329","sLimit":"25","sLecName":"한국무용 (민요춤,입춤,도살풀이)"},{"sRoom":"본관2층 1강의실","sTime":"10:00~11:30","sDay":"화","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김봉식","sCodeNo":"501","sLimit":"25","sLecName":"사진(DSLR)"},{"sRoom":"본관2층 1강의실","sTime":"10:00~11:30","sDay":"목","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"홍기용","sCodeNo":"503","sLimit":"15","sLecName":"서양화-데생,유화,수채화"},{"sRoom":"본관2층 1강의실","sTime":"13:00~14:30","sDay":"화","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"김영실","sCodeNo":"504","sLimit":"15","sLecName":"사군자"},{"sRoom":"본관2층 1강의실","sTime":"10:00~11:30","sDay":"월","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"정응균","sCodeNo":"504","sLimit":"15","sLecName":"사군자 "},{"sRoom":"본관2층 1강의실","sTime":"13:00~14:30","sDay":"월","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"양희석","sCodeNo":"507","sLimit":"15","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"13:00~14:30","sDay":"수","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"고홍자","sCodeNo":"507","sLimit":"15","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"13:00~14:30","sDay":"금","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"한명택","sCodeNo":"507","sLimit":"15","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"14:30~16:00","sDay":"금","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"한명택","sCodeNo":"507","sLimit":"15","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"15:00~16:30","sDay":"목","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"한명택","sCodeNo":"507","sLimit":"15","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"10:00~11:30","sDay":"금","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"양수년","sCodeNo":"507","sLimit":"16","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"10:00~11:30","sDay":"수","sTuition":"45000","sTarget":"성인 누구나","sTeacher":"홍춘자","sCodeNo":"507","sLimit":"15","sLecName":"한문서예"},{"sRoom":"본관2층 1강의실","sTime":"16:30~18:00","sDay":"금","sTuition":"월30,000","sTarget":"성인 누구나","sTeacher":"김미경","sCodeNo":"516","sLimit":"15","sLecName":"네일아트(8월 8일 개강)"}]
}
ib.create();

document.querySelector("#sel").addEventListener("change", function(evt) {
  sheet['DataMerge'] = evt.target.value;
})