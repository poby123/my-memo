import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import './ColorPickerComponent.scss';

const ColorPickerComponent = (props) => {
  const { onClickPalette, color, colorButtonsColor, onChangeColor, showPalette } = props;

  const paletteButton = (
    <button title="Palette" key="Palette" onClick={onClickPalette} className="optionButton">
      <i className="fas fa-palette"></i>
    </button>
  );

  const colorButtons = colorButtonsColor.map((c) => {
    return (
      <button
        key={c}
        className="colorButton"
        style={{ backgroundColor: `${c}` }}
        onClick={() => {
          console.log(c, ' button is clicked.');
          onChangeColor({ hex: c });
        }}
      ></button>
    );
  });

  const picker = showPalette ? (
    <ChromePicker className="ChromePicker" onChange={onChangeColor} color={color} />
  ) : (
    ''
  );

  return (
    <div className="ColorPickerComponent">
      {paletteButton}
      {colorButtons}
      {picker}
    </div>
  );
};

/* Prop Types */
ColorPickerComponent.propTypes = {
  showPalette: PropTypes.bool,
  colorButtonsColor: PropTypes.array,
  onChangeColor: PropTypes.func,
};

/* Default Props */
ColorPickerComponent.defaultProps = {
  showPalette: false,
  colorButtonsColor: ['#000', '#fff', '#ff0000', '#00ff00', '#0000ff'],
  onChangeColor: () => {},
};

export default ColorPickerComponent;
