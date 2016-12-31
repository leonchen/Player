import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  View,
} from 'react-native';

import Servers from '../servers/Servers';
import Files from '../files/Files';

const COMPONENTS = {
  servers: Servers,
  files: Files,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingTop: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
  },
});

function mapStateToProps(state) {
  return {
    name: state.getIn(['layout', 'name']),
    props: state.getIn(['layout', 'props']).toJS(),
  };
}

class Layout extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    name: React.PropTypes.string,
    props: React.PropTypes.object,
  }

  render() {
    const { name, props } = this.props;
    const Component = COMPONENTS[name];
    return (
      <View style={styles.container}>
        <Component {...props} />
      </View>
    );
  }
}

export default connect(mapStateToProps)(Layout);
