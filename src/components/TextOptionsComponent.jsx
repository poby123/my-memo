import PropTypes from 'prop-types';
import ColorPickerComponent from './ColorPickerComponent';
import FontPickerComponent from './FontPickerComponent';
import './TextOptionsComponent.scss';

const TextOptionsComponent = (props) => {
  const {
    options,

    onClickForeApplyButton,
    showForeColorPalette,
    onClickForeColorPalette,
    foreColor,
    onChangeForeColor,

    onClickBackgroundApplyButton,
    showBackgroundColorPalette,
    onClickBackgroundColorPalette,
    backgroundColor,
    onChangeBackgroundColor,
  } = props;

  const defaultButtons = options.map((item) => {
    return (
      <button title={item.title} key={item.title} onClick={item.callback} className="optionButton">
        <i className={item.iconName}></i>
      </button>
    );
  });

  return (
    <div className="TextOptionsComponent">
      {defaultButtons}
      <b className="optionLine">|</b>
      <ColorPickerComponent
        showPalette={showForeColorPalette}
        onClickPalette={onClickForeColorPalette}
        applyButton={
          <button className="optionButton" onClick={onClickForeApplyButton}>
            <i className="fas fa-font" style={{ color: foreColor }}></i>
          </button>
        }
        onChangeColor={onChangeForeColor}
      />
      <b className="optionLine">|</b>
      <ColorPickerComponent
        showPalette={showBackgroundColorPalette}
        onClickPalette={onClickBackgroundColorPalette}
        applyButton={
          <button className="optionButton" onClick={onClickBackgroundApplyButton}>
            <i className="fas fa-highlighter" style={{ color: backgroundColor }}></i>
          </button>
        }
        onChangeColor={onChangeBackgroundColor}
      />
      <b className="optionLine">|</b>
      <FontPickerComponent {...props} />
    </div>
  );
};

/* Prop Types */
TextOptionsComponent.propTypes = {
  options: PropTypes.array,

  onClickForeApplyButton: PropTypes.func,
  showForeColorPalette: PropTypes.bool,
  onClickForeColorPalette: PropTypes.func,
  foreColor: PropTypes.string,
  onChangeForeColor: PropTypes.func,

  onClickBackgroundApplyButton: PropTypes.func,
  showBackgroundColorPalette: PropTypes.bool,
  onClickBackgroundColorPalette: PropTypes.func,
  backgroundColor: PropTypes.string,
  onChangeBackgroundColor: PropTypes.func,

  onChangeFontSize: PropTypes.func,
  fontSize: PropTypes.number,
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
  onClickForeApplyButton: () => {},
  showForeColorPalette: false,
  onClickForeColorPalette: () => {},
  foreColor: '#000',
  onChangeForeColor: () => {},

  onClickBackgroundApplyButton: () => {},
  showBackgroundColorPalette: false,
  onClickBackgroundColorPalette: () => {},
  backgroundColor: '#fff',
  onChangeBackgroundColor: () => {},

  onChangeFontSize: () => {},
  fontSize: 3,
};

export default TextOptionsComponent;
