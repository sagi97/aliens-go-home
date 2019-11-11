import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import SpaceshipBase from './SpaceshipBase';
import SpaceshipTop from './SpaceshipTop';
import { gameHeight } from '../../../utils/constants';

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`;

const Spaceship = props => (
  <Move>
    <SpaceshipBase position={props.position} />
    <SpaceshipTop position={props.position} />
  </Move>
);

Spaceship.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default Spaceship;