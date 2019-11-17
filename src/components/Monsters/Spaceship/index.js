import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import SpaceshipBase from './SpaceshipBase';
import SpaceshipTop from './SpaceshipTop';

import { Move, Shake } from '../Animations';

const Spaceship = props => {
  const { position, shake } = props;

  return (
    <MyMove shake={shake}>
      <SpaceshipBase position={position} />
      <SpaceshipTop position={position} />
    </MyMove>
  );
};

export const MyMove = styled.g`
  animation: ${Move} 4s linear ${({ shake }) => (shake ? css`, ${Shake} .8s linear;` : ';')};
`;

Spaceship.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  shake: PropTypes.bool
};

export default Spaceship;
