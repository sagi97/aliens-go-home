import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth0 from 'auth0-web';

import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';

const auth0Client = new Auth0({
  domain: 'sagi-rika.auth0.com',
  clientID: 'udT6xy73Xq1T5BsNUdcI6CUdkNQ7mMlb',
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
});

class App extends Component {
  state = {
    interval: null
  }

  componentDidMount() {
    const self = this;
    auth0Client.checkSession();

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
        gameState={this.props.gameState}
        startGame={this.props.startGame}
        trackMouse={event => (this.trackMouse(event))}
        login={auth0Client.signIn.bind(auth0Client)}
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
};

export default App;