import { useState, useEffect } from 'react';
import rgbHex from 'rgb-hex';
import TextOptionsComponent from './components/TextOptionsComponent';
import TextEditorComponent from './components/TextEditorComponent';

import channelList from './common/channelList';
const { ipcRenderer } = window.require('electron');

import './App.scss';

const App = () => {
  const [color, setColor] = useState('#000');
  const [fgMode, setFgMode] = useState(true);
  const [showPalette, setShowPalette] = useState(false);

  const togglePalette = () => setShowPalette(!showPalette);
  const hidePalette = () => setShowPalette(false);
  const onChangeColor = (c) => setColor(c);
  const onChangeFgMode = () => setFgMode(!fgMode);

  useEffect(() => {
    ipcRenderer.send(channelList.response.isLoaded);
  }, []);

  return (
    <>
      <TextOptionsComponent
        showPalette={showPalette}
        onClickPalette={togglePalette}
        color={color}
        onChangeColor={onChangeColor}
        fgMode={fgMode}
        onChangeFgMode={onChangeFgMode}
      />
      <TextEditorComponent onClick={hidePalette} color={color} fgMode={fgMode} />
    </>
  );
};

export default App;
