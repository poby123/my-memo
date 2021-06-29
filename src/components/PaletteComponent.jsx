import PropTypes from 'prop-types';
import './PaletteComponent.scss';

const PaletteComponent = (props) => {
  const { onChangeColor, colors } = props;

  const palette = colors.map((c) => {
    return (
      <button
        style={{ backgroundColor: `${c}` }}
        key={c}
        className={'colorButtons'}
        onClick={() => onChangeColor(c)}
      ></button>
    );
  });

  return <div className="PaletteComponent">{palette}</div>;
};

/* Prop Types */
PaletteComponent.propTypes = {
  colors: PropTypes.array,
  onChangeColor: PropTypes.func,
};

/* Default Props */
PaletteComponent.defaultProps = {
  colors: [
    '#FFFFFF',
    '#000000',
    '#FF6900',
    '#FCB900',
    '#00D084',
    '#0693E3',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
  ],
  onChangeColor: () => {},
};

export default PaletteComponent;
