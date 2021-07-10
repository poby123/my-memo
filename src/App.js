import { useState, useEffect } from 'react';
import rgbHex from 'rgb-hex';
import TextOptionsComponent from './components/TextOptionsComponent';
import TextEditorComponent from './components/TextEditorComponent';

import channelList from './common/channelList';
const { ipcRenderer } = window.require('electron');

import './App.scss';

const App = () => {
  /* changed */
  const sendChanged = () => {
    ipcRenderer.send(channelList.response.isChanged, true);
  };

  /* content */
  const [content, setContent] = useState('');
  const onChangeContent = (content) => {
    setContent(content);
    sendChanged();
  };

  /* color */
  const [showPalette, setShowPalette] = useState(false);
  const [color, setColor] = useState('#000');
  const [fgMode, setFgMode] = useState(true);

  const togglePalette = () => setShowPalette(!showPalette);
  const hidePalette = () => setShowPalette(false);
  const onChangeColor = (c) => {
    setColor(c);
    sendChanged();
  };
  const onChangeFgMode = () => setFgMode(!fgMode);

  /* font */
  const [fontSize, setFontSize] = useState(3);

  const onChangeFontSize = (diff) => {
    const nextFontSize = fontSize + diff;
    if (nextFontSize > 7 || nextFontSize < 1) {
      return;
    }
    setFontSize(nextFontSize);
    sendChanged();
  };

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
        onChangeFontSize={onChangeFontSize}
        fontSize={fontSize}
      />
      <TextEditorComponent
        content={content}
        onChangeContent={onChangeContent}
        onClick={hidePalette}
        color={color}
        fgMode={fgMode}
        fontSize={fontSize}
      />
    </>
  );
};

export default App;
