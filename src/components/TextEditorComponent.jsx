import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextEditorComponent.scss';
import '../Renderer';

const TextEditorComponent = (props) => {
  const [content, setContent] = useState(props.content);
  const textAreaEl = useRef(null);

  const onInputHandler = (e) => setContent(e.target.innerHTML);
  const { onClick, color } = props;

  useEffect(() => {
    textAreaEl.current.innerHTML = content;
    textAreaEl.current.focus();

    // const onChangeColor = ({rgb}) => {
    //   const { r, g, b, a } = rgb;
    //   document.execCommand('styleWithCSS', false, true);
    //   document.execCommand('foreColor', false, `rgba(${r},${g},${b},${a})`);
    // }

    return () => textAreaEl && textAreaEl.removeEventListener('onInput', onInputHandler);
  }, []);

  useEffect(() => {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    console.log('color updated ', color);
  }, [color]);

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
};

TextEditorComponent.defaultProps = {
  content: '',
  onClick: () => {},
};

export default TextEditorComponent;
