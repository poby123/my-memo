import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextAreaComponent.scss';

import channelList from '../channelList';
const { ipcRenderer } = window.require('electron');

/* Strikethrough request handler */
ipcRenderer.on(channelList.request.strikeThrough, () =>
  document.execCommand('strikeThrough', false, null),
);

/* Sava request handler */
ipcRenderer.on(channelList.request.save, () => {
  const area = document.getElementById('textEditor');

  /* send textArea content to electron main process to local save */
  ipcRenderer.send(channelList.response.save, {
    fileName: document.title,
    filePath: document.filePath,
    fileContent: {
      html: area.innerHTML,
      txt: area.innerText,
    },
  });
});

/* SaveAs request handler */
ipcRenderer.on(channelList.request.saveAs, () => {
  const area = document.getElementById('textEditor');

  /* send textArea content to electron main process to local save as */
  ipcRenderer.send(channelList.response.saveAs, {
    html: area.innerHTML,
    txt: area.innerText,
  });
});

/* File Open Handler */
ipcRenderer.on(channelList.request.sendFileContent, (e, { fileContent, fileName, filePath }) => {
  const area = document.getElementById('textEditor');

  console.log('sendfileContent! ', fileContent);

  /* get data from main process and set as content and file name */
  area.innerHTML = fileContent;
  document.title = fileName;
  document.filePath = filePath;
});

/* Text Editor Component */
const TextAreaComponent = ({ children }) => {
  const [content, setContent] = useState(children);
  const textAreaEl = useRef(null);

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
