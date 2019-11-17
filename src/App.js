import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Auth0 from 'auth0-web';
import io from 'socket.io-client';

import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';
import { useInterval, usePrevious } from './hooks';

const auth0Client = new Auth0({
  domain: 'sagi-rika.auth0.com',
  audience: 'https://aliens-go-home.digituz.com.br',
  clientID: 'udT6xy73Xq1T5BsNUdcI6CUdkNQ7mMlb',
  redirectUri: process.env.REACT_APP_HOME_URL,
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
});

const App = props => {
  const [socket, setSocket] = useState(null);
  // const [playerProfile, setPlayerProfile] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const prevGameState = usePrevious(props.gameState);

  const shoot = () => {
    props.shoot(mousePosition);
  }

  useInterval(() => {
    props.moveObjects(mousePosition);
  }, 10)

  useEffect(() => {
    auth0Client.checkSession().then(auth => {
      if (auth) {
        const profile = auth0Client.getProfile();
        const currentPlayer = {
          id: profile.sub,
          maxScore: 0,
          name: profile.name,
          picture: profile.picture,
        };
        props.loggedIn(currentPlayer);
    
        const socket = io('http://localhost:3001', {
          query: `token=${auth0Client.getAccessToken()}`,
        });

        socket.on('players', (players) => {
          props.leaderboardLoaded(players);
    
          players.forEach((player) => {
            if (player.id === currentPlayer.id) {
              currentPlayer.maxScore = player.maxScore;
            }
          });
        });

        setSocket(socket);
        setCurrentPlayer(currentPlayer);
      }
    })

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }, [])

  useEffect(() => {
    if (props.gameState && !props.gameState.started && prevGameState && prevGameState.started) {
      if (currentPlayer && currentPlayer.maxScore < props.gameState.kills) {
        socket.emit('new-max-score', {
          ...currentPlayer,
          maxScore: props.gameState.kills,
        });
      }
    }
  }, [props.gameState.started])

  const trackMouse = (event) => {
    setMousePosition(getCanvasPosition(event));
  }

  return (
    <Canvas
      angle={props.angle}
      currentPlayer={props.currentPlayer}
      gameState={props.gameState}
      startGame={props.startGame}
      players={props.players}
      trackMouse={event => (trackMouse(event))}
      login={auth0Client.signIn.bind(auth0Client)}
      shoot={shoot}
    />
  );
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired,
  gameState: PropTypes.shape({
    monsters: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  shoot: PropTypes.func.isRequired
};

App.defaultProps = {
  currentPlayer: null,
  players: null
}

export default App;