import PropTypes from 'prop-types';
import './TextOptionsComponent.scss';

const TextOptionsComponent = (props) => {
  let options = props.options;

  let present = options.map((item) => {
    return (
      <button title={item.buttonTitle} key={item.buttonTitle} onClick={item.callback}>
        <i className={item.iconName}></i>
      </button>
    );
  });

  return <div className="TextOptionsComponent">{present}</div>;
};

/* Prop Types */
TextOptionsComponent.propTypes = {
  options: PropTypes.array,
};

/* Default Props */
TextOptionsComponent.defaultProps = {
  options: [
    {
      buttonTitle: 'Bold: Ctrl+B',
      iconName: 'fas fa-bold',
      callback: () => {
        document.execCommand('bold', false, null);
      },
    },
    {
      buttonTitle: 'Italic: Ctrl+I',
      iconName: 'fas fa-italic',
      callback: () => {
        document.execCommand('italic', false, null);
      },
    },
    {
      buttonTitle: 'Ctrl+Shift+S',
      iconName: 'fas fa-strikethrough',
      callback: () => {
        document.execCommand('strikeThrough', false, null);
      },
    },
    {
      buttonTitle: 'Underline: Ctrl+U',
      iconName: 'fas fa-underline',
      callback: () => {
        document.execCommand('underline', false, null);
      },
    },
  ],
};

export default TextOptionsComponent;
