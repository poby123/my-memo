import PropTypes from 'prop-types';
import './FontPickerComponent.scss';

const FontPickerComponent = (props) => {
  const { fontSize, onChangeFontSize } = props;

  const fontSizeButton = (
    <>
      <button
        title="fontSizeUpButton"
        key="fontSizeUpButton"
        className="optionButton"
        onClick={() => onChangeFontSize(1)}
      >
        <i className="fas fa-angle-up"></i>
      </button>

      <b className="fontSize">{fontSize}</b>

      <button
        title="fontSizeDownButton"
        key="fontSizeDownButton"
        className="optionButton"
        onClick={() => onChangeFontSize(-1)}
      >
        <i className="fas fa-angle-down"></i>
      </button>
    </>
  );

  return <div className="FontPickerComponent">{fontSizeButton}</div>;
};

/* Prop Types */
FontPickerComponent.propTypes = {
  fontSize: PropTypes.number,
  onChangeFontSize: PropTypes.func,
};

/* Default Props */
FontPickerComponent.defaultProps = {
  fontSize: 3,
  onChangeFontSize: () => {},
};

export default FontPickerComponent;
