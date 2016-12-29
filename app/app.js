import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Servers from './servers/Servers';

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Servers />
      </View>
    );
  }
}

export default connect()(App);
