import React from 'react';
import PropTypes from 'prop-types';

const AlienEyes = props => {
  const style = {
    fill: 'none',
    stroke: '#000',
    strokeWidth: '2px'
  };
  const { position } = props;
  const halfBase = 10;

  const smileStartX = `${position.x - halfBase}`;
  const smileStartY = `${position.y + 28}`;

  return (
    <path
      style={style}
      d={`
          M ${smileStartX}, ${smileStartY} q 10,20 20,0
        `}
    />
  );
};

AlienEyes.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default AlienEyes;
