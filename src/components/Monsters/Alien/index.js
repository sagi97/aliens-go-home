import React from 'react'
import styled, { keyframes } from 'styled-components';
import { gameHeight } from '../../../utils/constants';

import AlienTop from './AlienTop';
import AlienBottom from './AlienBottom';
import AlienEyes from './AlienEyes';

const tmoveVertically = keyframes`
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(${gameHeight}px);
    }
  `;

  const Move = styled.g`
    animation: ${tmoveVertically} 4s linear;
  `;

  const Alien = props => (
    <Move>
      <AlienTop position={props.position} />
      <AlienBottom position={props.position} />
      <AlienEyes position={props.position} />
    </Move>
  );

  export default Alien;