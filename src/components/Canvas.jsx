import React from 'react';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import { CannonBase, CannonPipe, CannonBall } from './Cannon';
import CurrentScore from './CurrentScore';
import Spaceship from './Monsters/Spaceship';
import Alien from './Monsters/Alien';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';

import { gameHeight } from '../utils/constants';

const Canvas = props => {
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

  const { trackMouse, shoot, gameState, startGame, angle } = props;

  const lives = [];
  for (let i = 0; i < gameState.lives; i += 1) {
    const heartPosition = {
      x: -180 - i * 70,
      y: 35
    };
    lives.push(<Heart key={i} position={heartPosition} />);
  }

  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={trackMouse}
      viewBox={viewBox}
      onClick={shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      {gameState.cannonBalls.map(cannonBall => (
        <CannonBall key={cannonBall.id} position={cannonBall.position} />
      ))}
      <CannonPipe rotation={angle} />
      <CannonBase />
      <CurrentScore score={gameState.kills} />

      {!gameState.started && (
        <g>
          <StartGame onClick={() => startGame()} />
          <Title />
        </g>
      )}

      {gameState.started && (
        <g className="aliens">
          {gameState.monsters.map(monster => {
            const { type } = monster;

            if (type === 'alien')
              return <Alien key={monster.id} position={monster.position} lives={monster.lives} />;

            if (type === 'spaceship')
              return (
                <Spaceship key={monster.id} position={monster.position} lives={monster.lives} />
              );

            return '';
          })}
        </g>
      )}
      {lives}
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    cannonBalls: PropTypes.array.isRequired,
    monsters: PropTypes.array.isRequired
  }).isRequired,
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired
};

export default Canvas;
