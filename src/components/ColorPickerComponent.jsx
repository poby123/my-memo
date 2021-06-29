import PropTypes from 'prop-types';
import PaletteComponent from './PaletteComponent';
import './ColorPickerComponent.scss';

const ColorPickerComponent = (props) => {
  const { onClickPalette, showPalette, fgMode, onChangeFgMode, ...paletteProps } = props;

  const paletteButton = (
    <button title="Palette" key="Palette" onClick={onClickPalette} className="optionButton">
      <i className="fas fa-palette"></i>
    </button>
  );

  const colorModeButton = (
    <button title="colorMode" key="colorMode" onClick={onChangeFgMode} className="optionButton">
      {fgMode ? <i className="fas fa-font"></i> : <i class="fas fa-highlighter"></i>}
    </button>
  );

  return (
    <div className="ColorPickerComponent">
      {colorModeButton}
      {paletteButton}
      {showPalette && <PaletteComponent {...paletteProps} />}
    </div>
  );
};

/* Prop Types */
ColorPickerComponent.propTypes = {
  showPalette: PropTypes.bool,
  onChangeColor: PropTypes.func,
};

/* Default Props */
ColorPickerComponent.defaultProps = {
  showPalette: false,
  onChangeColor: () => {},
};

export default ColorPickerComponent;
