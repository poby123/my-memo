import PropTypes from 'prop-types';
import PaletteComponent from './PaletteComponent';
import './ColorPickerComponent.scss';

const ColorPickerComponent = (props) => {
  const { showPalette, onClickPalette, applyButton, ...paletteProps } = props;

  const paletteButton = (
    <button title="Palette" key="Palette" onClick={onClickPalette} className="optionButton">
      <i className="fas fa-palette"></i>
    </button>
  );

  return (
    <div className="ColorPickerComponent">
      {applyButton}
      {paletteButton}
      {showPalette && <PaletteComponent {...paletteProps} />}
    </div>
  );
};

/* Prop Types */
ColorPickerComponent.propTypes = {
  showPalette: PropTypes.bool,
  onClickPalette: PropTypes.func,
  applyButton: PropTypes.node,
};

/* Default Props */
ColorPickerComponent.defaultProps = {
  showPalette: false,
  onClickPalette: () => {},
  applyButton: <button></button>,
};

export default ColorPickerComponent;
