import TextOptionsComponent from './components/TextOptionsComponent';
import TextAreaComponent from './components/TextAreaComponent';
import './App.scss';
const { ipcRenderer } = window.require('electron');

ipcRenderer.on('strikeThrough', () => document.execCommand('strikeThrough', false, null));

const App = () => {
  return (
    <>
      <TextOptionsComponent />
      <TextAreaComponent></TextAreaComponent>
    </>
  );
};

export default App;
