import React from 'react';
import PropTypes from 'prop-types';

const AlienEyes = props => {
  const style = {
    fill: '#000',
    stroke: '#000'
  };
  const { position } = props;
  const halfBase = 10;

  return (
    <>
      <path
        style={style}
        d={`
          M ${position.x - 21}, ${position.y - 2.5} a 6,12 -20 1,0 1,0
        `}
      />
      <path
        style={style}
        d={`
          M ${position.x + 11 + halfBase}, ${position.y - 2.5} a 6,12 20 1,0 1,0
        `}
      />
    </>
  );
};

AlienEyes.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default AlienEyes;
