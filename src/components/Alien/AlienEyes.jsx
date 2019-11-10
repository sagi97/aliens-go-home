import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { pathFromBezierCurve } from '../../utils/formulas';

const AlienEyes = (props) => {
  const style = {
    fill: '#000',
    stroke: '#000',
  };

  const baseWith = 20;
  const halfBase = 10;
  const height = 10;

  const cubicBezierCurve = {
    initialAxis: {
      x: props.position.x - 10,
      y: props.position.y,
    },
    initialControlPoint: {
      x: halfBase,
      y: height,
    },
    endingControlPoint: {
      x: halfBase,
      y: height,
    },
    endingAxis: {
      x: 0,
      y: 0,
    },
  };

  return (
    <>
      <path
        style={style}
        d={`
          M ${props.position.x - 21}, ${props.position.y - 2.5} a 6,12 -20 1,0 1,0
        `}
    />
    <path
        style={style}
        d={`
          M ${(props.position.x + 11) + halfBase}, ${props.position.y - 2.5} a 6,12 20 1,0 1,0
        `}
    />
    </>
  );
};

AlienEyes.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};

export default AlienEyes;