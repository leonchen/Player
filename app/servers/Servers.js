import React from 'react';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  View,
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
    backgroundColor: '#eee',
  },
  stretchContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    flex: 0,
    height: 40,
    backgroundColor: '#444',
  },
  addServerButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    fontSize: 30,
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
  labelContainer: {
    flex: 0,
    height: 30,
  },
  inputContainer: {
    flex: 0,
    height: 60,
  },
  urlInput: {
    borderWidth: 1,
    borderColor: '#333',
    height: 50,
  },
  server: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

function mapStateToProps(state) {
  return {
    servers: state.getIn(['servers', 'servers']).toJS(),
    loading: state.getIn(['servers', 'loading']),
    showForm: state.getIn(['servers', 'showForm']),
  };
}

class Servers extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    servers: React.PropTypes.array,
    loading: React.PropTypes.bool,
    showForm: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      newServerURL: '',
    };
  }

  componentWillMount() {
    this.props.dispatch(actions.loadServers());
  }

  setNewServerURL = (e) => {
    this.setState({ newServerURL: e.nativeEvent.text });
  }

  showAddServerForm = () => {
    this.props.dispatch(actions.showForm());
  }

  addServer = () => {
    const server = this.state.newServerURL;
    this.props.dispatch(actions.addServer(server));
  }

  connectServer = (server) => {
    this.props.dispatch(actions.connectServer(server));
  }

  renderServer = (server) => (
    <TouchableWithoutFeedback key={server} onPress={() => this.connectServer(server)}>
      <View style={styles.server}>
        <Text>{server}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderList() {
    if (this.props.loading) return null;
    return (
      <ScrollView>
        {this.props.servers.map(this.renderServer)}
      </ScrollView>
    );
  }

  renderLoading() {
    if (!this.props.loading) return null;
    return (
      <View style={[styles.StretchContainer, styles.center]}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }

  renderServers() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.addServerButton} onPress={this.showAddServerForm}>+</Text>
        </View>
        <View style={styles.list}>
          {this.renderList()}
          {this.renderLoading()}
        </View>
      </View>
    );
  }

  renderForm() {
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text>Server URL</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoFocus
            style={styles.urlInput}
            placeholder="smb/ftp url"
            onChange={this.setNewServerURL}
            onEndEditing={this.addServer}
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.props.showForm) return this.renderForm();
    return this.renderServers();
  }
}

export default connect(mapStateToProps)(Servers);
