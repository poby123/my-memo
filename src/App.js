import { useEffect } from 'react';
import TextEditorComponent from './components/TextEditorComponent';

import channelList from './common/channelList';
const { ipcRenderer } = window.require('electron');

import './App.scss';

const App = () => {

  useEffect(() => {
    ipcRenderer.send(channelList.response.isLoaded);
  }, []);

  return (
    <>
      <TextEditorComponent />
    </>
  );
};

export default App;
