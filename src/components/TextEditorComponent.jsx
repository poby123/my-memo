import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextEditorComponent.scss';
import '../Renderer';

const TextEditorComponent = (props) => {
  const [content, setContent] = useState(props.content);
  const textAreaEl = useRef(null);

  const onInputHandler = (e) => setContent(e.target.innerHTML);
  const { onClick, color, fgMode, fontSize } = props;

  useEffect(() => {
    textAreaEl.current.innerHTML = content;
    textAreaEl.current.focus();
  }, []);

  useEffect(() => {
    const mode = fgMode ? 'foreColor' : 'hiliteColor';

    document.execCommand('styleWithCSS', false, true);
    document.execCommand(mode, false, color);
    document.execCommand('fontSize', false, fontSize);

    textAreaEl.current.focus();
  }, [color, fontSize]);

  return (
    <>
      <div className="TextEditorComponent">
        <div
          contentEditable="true"
          className="textArea"
          id="textEditor"
          ref={textAreaEl}
          onInput={onInputHandler}
          onClick={onClick}
        />
      </div>
    </>
  );
};

TextEditorComponent.propTypes = {
  content: PropTypes.string,
  onClick: PropTypes.func,
  fgMode: PropTypes.bool,
  fontSize: PropTypes.number,
};

TextEditorComponent.defaultProps = {
  content: '',
  onClick: () => {},
  fgMode: true,
  fontSize: 3,
};

export default TextEditorComponent;
