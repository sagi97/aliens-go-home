import React from "react";
import PropTypes from "prop-types";

import Sky from "./Sky";
import Ground from "./Ground";
import { CannonBase, CannonPipe, CannonBall } from "./Cannon";
import CurrentScore from "./CurrentScore";
import Spaceship from './Monsters/Spaceship';
import Alien from './Monsters/Alien';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import Leaderboard from './Leaderboard/Leaderboard';

import { gameHeight } from '../utils/constants';

const Canvas = props => {
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

  const lives = [];
  for (let i = 0; i < props.gameState.lives; i++) {
    const heartPosition = {
      x: -180 - (i * 70),
      y: 35
    };
    lives.push(<Heart key={i} position={heartPosition}/>);
  }

  return (
    <svg
      id="aliens-go-home-canvas"
      preserveAspectRatio="xMaxYMax none"
      onMouseMove={props.trackMouse}
      viewBox={viewBox}
      onClick={props.shoot}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      {props.gameState.cannonBalls.map(cannonBall => (
        <CannonBall
          key={cannonBall.id}
          position={cannonBall.position}
        />
      ))}
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={props.gameState.kills} />

      { !props.gameState.started && 
        <g>
          <StartGame onClick={() => props.startGame()} />
          <Title />
          <Leaderboard currentPlayer={props.currentPlayer} authenticate={ props.login } leaderboard={props.players} />
        </g>
      }

      { props.gameState.started &&
        <g className='aliens'>
          {props.gameState.monsters.map(monster => {
            const { type } = monster;

            if (type === 'alien') {
              return <Alien
                key={monster.id}
                position={monster.position}
              />
            } else if (type === 'spaceship') {
              return <Spaceship
                key={monster.id}
                position={monster.position}
              />
            }
          })}
        </g>
      }
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
  }).isRequired,
  trackMouse: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  shoot: PropTypes.func.isRequired,
};

Canvas.defaultProps = {
  currentPlayer: null,
  players: null,
};

export default Canvas;
