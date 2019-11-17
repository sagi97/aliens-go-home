import React from 'react';
import PropTypes from 'prop-types';

import { pathFromBezierCurve } from '../../../utils/formulas';

const AlienBottom = props => {
  const style = {
    fill: '#979797',
    stroke: '#5c5c5c'
  };
  const { position } = props;
  const baseWith = 70;
  const halfBase = 35;
  const height = 65;

  const cubicBezierCurve = {
    initialAxis: {
      x: position.x - halfBase,
      y: position.y
    },
    initialControlPoint: {
      x: 25,
      y: height
    },
    endingControlPoint: {
      x: 45,
      y: height
    },
    endingAxis: {
      x: baseWith,
      y: 0
    }
  };

  return <path style={style} d={pathFromBezierCurve(cubicBezierCurve)} />;
};

AlienBottom.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default AlienBottom;
