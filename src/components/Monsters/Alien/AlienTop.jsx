import React from 'react';
import PropTypes from 'prop-types';

import { pathFromBezierCurve } from '../../../utils/formulas';

const AlienTop = props => {
  const style = {
    fill: '#979797',
    stroke: '#5c5c5c'
  };
  const { position } = props;
  const baseWith = 70;
  const halfBase = 35;
  const height = 40;

  const cubicBezierCurve = {
    initialAxis: {
      x: position.x - halfBase,
      y: position.y
    },
    initialControlPoint: {
      x: 17.5,
      y: -height
    },
    endingControlPoint: {
      x: 52.5,
      y: -height
    },
    endingAxis: {
      x: baseWith,
      y: 0
    }
  };

  return <path style={style} d={pathFromBezierCurve(cubicBezierCurve)} />;
};

AlienTop.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default AlienTop;
