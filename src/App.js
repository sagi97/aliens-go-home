import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';
import { useInterval } from './hooks';

const App = props => {
  const [mousePosition, setMousePosition] = useState(null);
  const { angle, gameState, startGame, shoot, moveObjects } = props;

  const aimAndShoot = () => {
    shoot(mousePosition);
  };

  useInterval(() => {
    moveObjects(mousePosition);
  }, 10);

  useEffect(() => {
    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }, []);

  const trackMouse = event => {
    setMousePosition(getCanvasPosition(event));
  };

  return (
    <Canvas
      angle={angle}
      gameState={gameState}
      startGame={startGame}
      trackMouse={event => trackMouse(event)}
      shoot={aimAndShoot}
    />
  );
};

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired,
  gameState: PropTypes.shape({
    monsters: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  shoot: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
};

export default App;
