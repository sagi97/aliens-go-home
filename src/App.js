import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getCanvasPosition } from './utils/formulas';
import Canvas from './components/Canvas';

class App extends Component {
  state = {
    interval: null
  }

  componentDidMount() {
    const self = this;
    const myInterval = setInterval(() => {
        self.props.moveObjects(self.canvasMousePosition);
    }, 10);
    this.setState({ interval: myInterval });
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
        trackMouse={event => (this.trackMouse(event))}
      />
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired,
};

export default App;