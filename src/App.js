import { useState, useEffect } from 'react';
import rgbHex from 'rgb-hex';
import TextOptionsComponent from './components/TextOptionsComponent';
import TextEditorComponent from './components/TextEditorComponent';

import channelList from './common/channelList';
const { ipcRenderer } = window.require('electron');

import './App.scss';

const App = () => {
  const [color, setColor] = useState('#000');
  const [showPalette, setShowPalette] = useState(false);

  const togglePalette = () => setShowPalette(!showPalette);
  const hidePalette = () => setShowPalette(false);
  const onChangeColor = ({ rgb, hex }) => {
    if (rgb) {
      setColor('#' + rgbHex(rgb.r, rgb.g, rgb.b, rgb.a));
    } else if (hex) {
      setColor(hex);
    }
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
      />
      <TextEditorComponent onClick={hidePalette} color={color} />
    </>
  );
};

export default App;
