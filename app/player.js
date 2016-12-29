import React, { Component } from 'react';
import { Provider } from 'react-redux';

import setup from './setup';
import App from './app';

import servers from './servers';

const parameters = [
  servers,
];

class Player extends Component {
  render() {
    const { store } = setup(App, parameters);

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Player;
