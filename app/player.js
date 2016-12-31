import React, { Component } from 'react';
import { Provider } from 'react-redux';

import setup from './setup';
import App from './app';

import layout from './layout';
import servers from './servers';
import files from './files';

const parameters = [
  layout,
  servers,
  files,
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
