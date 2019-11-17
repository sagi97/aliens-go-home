import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AlienTop from './AlienTop';
import AlienBottom from './AlienBottom';
import AlienEyes from './AlienEyes';

import { Move, Shake } from '../Animations';

const Alien = props => {
  const { shake, position } = props;
  return (
    <MyMove>
      {shake ? (
        <MyShake>
          <AlienTop position={position} />
          <AlienBottom position={position} />
          <AlienEyes position={position} />
        </MyShake>
      ) : (
        <>
          <AlienTop position={position} />
          <AlienBottom position={position} />
          <AlienEyes position={position} />
        </>
      )}
    </MyMove>
  );
};

const MyMove = styled.g`
  animation: ${Move} 4s linear;
`;

const MyShake = styled.g`
  animation: ${Shake} 0.8s linear;
`;

Alien.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  shake: PropTypes.bool
};

export default Alien;
