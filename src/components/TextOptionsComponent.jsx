import PropTypes from 'prop-types';
import ColorPickerComponent from './ColorPickerComponent';
import './TextOptionsComponent.scss';

const TextOptionsComponent = (props) => {
  let { options } = props;

  let present = options.map((item) => {
    return (
      <button title={item.title} key={item.title} onClick={item.callback} className="optionButton">
        <i className={item.iconName}></i>
      </button>
    );
  });

  return (
    <div className="TextOptionsComponent">
      {present}
      <ColorPickerComponent {...props} />
    </div>
  );
};

/* Prop Types */
TextOptionsComponent.propTypes = {
  options: PropTypes.array,
  onClickPalette: PropTypes.func,
  showPalette: PropTypes.bool,
  color: PropTypes.string,
  onChangeColor: PropTypes.func,
};

/* Default Props */
TextOptionsComponent.defaultProps = {
  options: [
    {
      title: 'Bold: Ctrl+B',
      iconName: 'fas fa-bold',
      callback: () => {
        document.execCommand('bold', false, null);
      },
    },
    {
      title: 'Italic: Ctrl+I',
      iconName: 'fas fa-italic',
      callback: () => {
        document.execCommand('italic', false, null);
      },
    },
    {
      title: 'Ctrl+Shift+S',
      iconName: 'fas fa-strikethrough',
      callback: () => {
        document.execCommand('strikeThrough', false, null);
      },
    },
    {
      title: 'Underline: Ctrl+U',
      iconName: 'fas fa-underline',
      callback: () => {
        document.execCommand('underline', false, null);
      },
    },
  ],
  onClickPalette: () => {},
  showPalette: false,
  color: '#000',
  onChangeColor: () => {},
};

export default TextOptionsComponent;
