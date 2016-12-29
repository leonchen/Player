import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import * as actions from './actions';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingTop: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#444',
  },
  menu: {
    height: 40,
  },
  addServerButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    servers: state.getIn(['servers', 'servers']).toJS(),
    loading: state.getIn(['servers', 'loading']),
  };
}

class Servers extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    servers: React.PropTypes.array,
    loading: React.PropTypes.bool,
    hasMore: React.PropTypes.bool,
  }

  componentWillMount() {
    this.props.dispatch(actions.loadServers());
  }

  showAddServerForm() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.addServerButton} onClick={this.showAddServerForm}>+</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Servers);
