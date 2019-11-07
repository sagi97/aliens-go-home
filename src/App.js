import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth0 from 'auth0-web';
import io from 'socket.io-client';

import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';

const auth0Client = new Auth0({
  domain: 'sagi-rika.auth0.com',
  audience: 'https://aliens-go-home.digituz.com.br',
  clientID: 'udT6xy73Xq1T5BsNUdcI6CUdkNQ7mMlb',
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.currentPlayer = null;
  }
  state = {
    interval: null
  }

  shoot = () => {
    this.props.shoot(this.canvasMousePosition);
  }

  componentDidMount() {
    const self = this;
    auth0Client.checkSession().then(auth => {
      if (auth) {
        self.playerProfile = auth0Client.getProfile();
        self.currentPlayer = {
          id: self.playerProfile.sub,
          maxScore: 0,
          name: self.playerProfile.name,
          picture: self.playerProfile.picture,
        };
    
        this.props.loggedIn(self.currentPlayer);
    
        self.socket = io('http://localhost:3001', {
          query: `token=${auth0Client.getAccessToken()}`,
        });

        self.socket.on('players', (players) => {
          self.props.leaderboardLoaded(players);
    
          players.forEach((player) => {
            if (player.id === self.currentPlayer.id) {
              self.currentPlayer.maxScore = player.maxScore;
            }
          });
        });
      }
    })

    const myInterval = setInterval(() => {
        self.props.moveObjects(self.canvasMousePosition);
    }, 10);
    this.setState({ interval: myInterval });

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.gameState.started && this.props.gameState.started) {
      if (this.currentPlayer.maxScore < this.props.gameState.kills) {
        this.socket.emit('new-max-score', {
          ...this.currentPlayer,
          maxScore: this.props.gameState.kills,
        });
      }
    }
  }

  componentWillUnmount() {
    const { myInterval } = this.state;
    clearInterval(myInterval);
    this.setState({ interval: null })
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        currentPlayer={this.props.currentPlayer}
        gameState={this.props.gameState}
        startGame={this.props.startGame}
        players={this.props.players}
        trackMouse={event => (this.trackMouse(event))}
        login={auth0Client.signIn.bind(auth0Client)}
        shoot={this.shoot}
      />
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired,
  gameState: PropTypes.shape({
    flyingObjects: PropTypes.arrayOf(PropTypes.shape({
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