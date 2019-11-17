import React from 'react';
import PropTypes from 'prop-types';

const SpaceshipBase = props => {
  const { position, damaged } = props;

  const style = {
    fill: damaged ? '#c0392b' : '#979797',
    stroke: '#5c5c5c'
  };

  return <ellipse cx={position.x} cy={position.y} rx="40" ry="10" style={style} />;
};

SpaceshipBase.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  damaged: PropTypes.bool.isRequired
};

export default SpaceshipBase;
