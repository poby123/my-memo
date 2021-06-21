## My Memo

### Todo
- 🎈 글씨체
- 🎈 글씨 색깔

### Problem
- ⛏ 다른 이름으로 저장이 아닌 그냥 저장 기능의 구현. path를 어떻게 어디서 저장하고 있을 것인가
- ⛏ save as 후 저장된 파일을 열어서 보여줘야 함. dialog 없이.

### Solved
- ✅ 스크롤이 끝까지 위로 올라가지 않는 문제 : min-height 를 height로 바꾸고, scroll을 전체 창이 아닌, editable div 영역에 달아서, sticky가 fixed로 변하지 않도록 했다.
- ✅ TextOptionComponent 의 position을 무엇으로 할 것인가? : sticky
- ✅ 저장 후 리로딩 돼서 내용이 모두 사라지는 문제 : hot reloading 때문이었음. 변화를 감지해서 리로딩 해주는 public 디렉토리에 있어서 그랬음 ㅡㅡ,
- ✅ 불러올 때, 파일이름과 내용을 모두 리액트에 전달해서 innerHtml 과 window.title 로 지정해줌.
- ✅ 새로운 창 만들기. 새로운 창을 만드는 함수를 재사용할 수 있도록 분리해서 해결.