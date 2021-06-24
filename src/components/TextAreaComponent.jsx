import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextAreaComponent.scss';
import '../Renderer'

const TextEditorComponent = ({ children }) => {
  const [content, setContent] = useState(children);
  const textAreaEl = useRef(null);

  const onInputHandler = (e) => setContent(e.target.innerHTML);

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

TextEditorComponent.propTypes = {
  children: PropTypes.string,
};

TextEditorComponent.defaultProps = {
  children: '',
};

export default TextEditorComponent;
