import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AlienTop from './AlienTop';
import AlienBottom from './AlienBottom';
import AlienEyes from './AlienEyes';

import { Move } from '../../../animations';

const Alien = props => {
  const { position } = props;

  return (
    <Fly>
      <AlienTop position={position} />
      <AlienBottom position={position} />
      <AlienEyes position={position} />
    </Fly>
  );
};

const Fly = styled.g`
  animation: ${Move} 4s linear;
`;

Alien.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default Alien;
