import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TextAreaComponent.scss';

const TextAreaComponent = ({ children }) => {
  let [content, setContent] = useState(children);
  let textAreaEl = useRef(null);

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
          onScroll={() => console.log('scroll')}
          contentEditable="true"
          className="textArea"
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
