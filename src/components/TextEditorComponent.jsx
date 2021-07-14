import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import TextOptionsComponent from './TextOptionsComponent';
import './TextEditorComponent.scss';
import '../Renderer';

import channelList from '../common/channelList';
const { ipcRenderer } = window.require('electron');

/* changed */
const sendChanged = () => {
  ipcRenderer.send(channelList.response.isChanged, true);
};

const fontSizeList = {
  'x-small': 1,
  small: 2,
  large: 4,
  'x-large': 5,
  'xx-large': 6,
  'xxx-large': 7,
};

const getSelectionStart = () => {
  const node = document.getSelection().anchorNode;
  return node.nodeType == 3 ? node.parentNode : node;
};

/**
 * TextEditorComponent
 * @param {*} props
 * @returns
 */
const TextEditorComponent = (props) => {
  /* content */
  const [content, setContent] = useState('');
  const onChangeContent = (content) => {
    setContent(content);
    sendChanged();
  };

  /* foreColor */
  const [showForeColorPalette, setShowForeColorPalette] = useState(false);
  const [foreColor, setForeColor] = useState('#000');

  const hideForeColorPalette = () => setShowForeColorPalette(false);
  const toggleForeColorPalette = () => setShowForeColorPalette(!showForeColorPalette);
  const applyForeColor = (c) => {
    if (c) {
      setForeColor(c);
    }
    const targetForeColor = c || foreColor;
    console.log('foreground apply, ', targetForeColor);
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, targetForeColor);
    textAreaEl.current.focus();
  };

  /* backgroundColor */
  const [showBackgroundColorPalette, setShowBackgroundColorPalette] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const hideBackgroundColorPalette = () => setShowBackgroundColorPalette(false);
  const toggleBackgroundColorPalette = () =>
    setShowBackgroundColorPalette(!showBackgroundColorPalette);
  const applyBackgroundColor = (c) => {
    if (c) {
      setBackgroundColor(c);
    }
    const targetBackgroundColor = c || backgroundColor;

    console.log('background apply, ', targetBackgroundColor);
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('hiliteColor', false, targetBackgroundColor);
    textAreaEl.current.focus();
  };

  /* palette */
  const hidePalettes = () => {
    hideForeColorPalette();
    hideBackgroundColorPalette();
  };

  /* font */
  const [fontSize, setFontSize] = useState(3);

  const onChangeFontSize = (diff) => {
    console.log('onChangeFontSize : ', diff);
    const nextFontSize = fontSize + diff;
    if (nextFontSize > 7 || nextFontSize < 1) {
      return;
    }

    document.execCommand('styleWithCSS', false, true);
    document.execCommand('fontSize', false, nextFontSize);

    setFontSize(nextFontSize);
    textAreaEl.current.focus();
  };

  const textAreaEl = useRef(null);
  const onInputHandler = (e) => onChangeContent(e.target.innerHTML);

  const updateState = () => {
    const node = getSelectionStart();
    const targetFontSize = fontSizeList[node.style.fontSize] || 3;
    setFontSize(targetFontSize);

    const targetForeColor = node.style.color || '#000';
    setForeColor(targetForeColor);

    const targetBackgroundColor = node.style.backgroundColor || '#fff';
    setBackgroundColor(targetBackgroundColor);
  };

  useEffect(() => {
    textAreaEl.current.innerHTML = content;

    document.addEventListener('keydown', (e) => {
      const keyCode = e.key;
      const arrowKeyArray = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'];
      if (arrowKeyArray.includes(keyCode)) {
        updateState();
      }
    });

    textAreaEl.current.focus();
  }, []);

  return (
    <>
      <TextOptionsComponent
        onClickForeApplyButton={applyForeColor}
        showForeColorPalette={showForeColorPalette}
        onClickForeColorPalette={() => {
          toggleForeColorPalette();
          hideBackgroundColorPalette();
        }}
        foreColor={foreColor}
        onChangeForeColor={applyForeColor}
        onClickBackgroundApplyButton={applyBackgroundColor}
        showBackgroundColorPalette={showBackgroundColorPalette}
        onClickBackgroundColorPalette={() => {
          toggleBackgroundColorPalette();
          hideForeColorPalette();
        }}
        backgroundColor={backgroundColor}
        onChangeBackgroundColor={applyBackgroundColor}
        onChangeFontSize={onChangeFontSize}
        fontSize={fontSize}
      />
      <div className="TextEditorComponent" spellCheck="false">
        <div
          contentEditable="true"
          className="textArea"
          id="textEditor"
          ref={textAreaEl}
          onInput={onInputHandler}
          onClick={() => {
            hidePalettes();
            updateState();
          }}
        />
      </div>
    </>
  );
};

TextEditorComponent.propTypes = {
  content: PropTypes.string,
  onChangeContent: PropTypes.func,
};

TextEditorComponent.defaultProps = {
  content: '',
  onChangeContent: () => {},
};

export default TextEditorComponent;
