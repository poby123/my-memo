## My Memo

### Todo
- 🎈 글씨체
- 🎈 글씨 크기
- 🎈 배경색
- 🎈 표
- 🎈 코드 뷰티

### Problem
- ⛏ ChromePicker에서 색깔을 선택하면, 선택한 영역의 색깔은 바뀌지만 현 커서위치의 색깔은 바뀌지 않는다.


### Solved
- ✅ 스크롤이 끝까지 위로 올라가지 않는 문제 : min-height 를 height로 바꾸고, scroll을 전체 창이 아닌, editable div 영역에 달아서, sticky가 fixed로 변하지 않도록 했다.
- ✅ TextOptionComponent 의 position을 무엇으로 할 것인가? : sticky
- ✅ 저장 후 리로딩 돼서 내용이 모두 사라지는 문제 : hot reloading 때문이었음. 변화를 감지해서 리로딩 해주는 public 디렉토리에 있어서 그랬음 ㅡㅡ,
- ✅ 불러올 때, 파일이름과 내용을 모두 리액트에 전달해서 innerHtml 과 window.title 로 지정해줌.
- ✅ 새로운 창 만들기. 새로운 창을 만드는 함수를 재사용할 수 있도록 분리해서 해결.
- ✅ 다른 이름으로 저장이 아닌 그냥 저장 기능의 구현. local path는 document.filePath로 저장하고 있다가 필요할 때마다 요청해서 사용.
- ✅ save as 후, dialog 없이 저장된 파일을 열어서 보여줌. save 후에도 혹시 모를 상황을 위해 저장된 파일을 새로 읽어서 보여줌.
- ✅ 윈도우 연결프로그램에서 파일 열기 : React App이 mount 된 후, 메인 프로세스에 준비됐다는 메시지를 보내면, 메인프로세서에서 process.argv[1]에 파일경로가 있는지 확인 후, 있다면 fileOpenWithoutDialog 함수를 통해 react에 보내서, 파일을 연다.
- ✅ 글씨 색 바꾸기