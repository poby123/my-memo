import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextAreaComponent.scss';

import channelList from '../channelList';
const { ipcRenderer } = window.require('electron');

/* Strikethrough request handler */
ipcRenderer.on(channelList.request.strikeThrough, () =>
  document.execCommand('strikeThrough', false, null),
);

/* Save request handler */
ipcRenderer.on(channelList.request.saveAs, () => {
  const area = document.getElementById('textEditor');
  ipcRenderer.send(channelList.response.saveAs, {
    html: area.innerHTML,
    txt: area.innerText,
  });
});

const TextAreaComponent = ({ children }) => {
  let [content, setContent] = useState(children);
  let textAreaEl = useRef(null);

  /* get inner html from event object and set content */
  const onInputHandler = (e) => setContent(e.target.innerHTML);

  /* componentDidMount & componentWillUnMount */
  useEffect(() => {
    textAreaEl.current.innerHTML = content;
    textAreaEl.current.focus();

    return () => textAreaEl && textAreaEl.removeEventListener('onInput', onInputHandler);
  }, []);

  return (
    <>
      <div className="TextAreaComponent">
        <div
          contentEditable="true"
          className="textArea"
          id="textEditor"
          ref={textAreaEl}
          onInput={onInputHandler}
        />
      </div>
    </>
  );
};

TextAreaComponent.propTypes = {
  children: PropTypes.string,
};

TextAreaComponent.defaultProps = {
  children: '',
};

export default TextAreaComponent;
