import React from 'react';
import PropTypes from 'prop-types';

export const CannonBall = props => {
  const ballStyle = {
    fill: '#777',
    stroke: '#444',
    strokeWidth: '2px'
  };
  const { position } = props;

  return <ellipse style={ballStyle} cx={position.x} cy={position.y} rx="16" ry="16" />;
};

CannonBall.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};
