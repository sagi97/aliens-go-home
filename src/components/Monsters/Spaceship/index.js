import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SpaceshipBase from './SpaceshipBase';
import SpaceshipTop from './SpaceshipTop';

import { Move } from '../../../animations';

const Spaceship = props => {
  const { position, lives } = props;

  return (
    <Fly>
      <SpaceshipBase position={position} damaged={lives === 1} />
      <SpaceshipTop position={position} damaged={lives === 1} />
    </Fly>
  );
};

export const Fly = styled.g`
  animation: ${Move} 4s linear;
`;

Spaceship.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  lives: PropTypes.number.isRequired
};

export default Spaceship;
