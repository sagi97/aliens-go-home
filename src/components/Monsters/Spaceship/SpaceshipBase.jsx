import React from 'react';
import PropTypes from 'prop-types';

const SpaceshipBase = props => {
  const style = {
    fill: '#979797',
    stroke: '#5c5c5c'
  };
  const { position } = props;

  return <ellipse cx={position.x} cy={position.y} rx="40" ry="10" style={style} />;
};

SpaceshipBase.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default SpaceshipBase;
