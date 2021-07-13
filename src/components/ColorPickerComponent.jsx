import PropTypes from 'prop-types';
import PaletteComponent from './PaletteComponent';
import './ColorPickerComponent.scss';

const ColorPickerComponent = (props) => {
  const { onClickPalette, showPalette, modeButton, onClickModeButton, ...paletteProps } = props;

  const paletteButton = (
    <button title="Palette" key="Palette" onClick={onClickPalette} className="optionButton">
      <i className="fas fa-palette"></i>
    </button>
  );

  return (
    <div className="ColorPickerComponent">
      <button className="optionButton" onClick={onClickModeButton}>
        {modeButton}
      </button>
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
