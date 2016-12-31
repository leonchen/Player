import React from 'react';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  Text,
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
    paths: state.getIn(['files', 'paths']).toJS(),
    files: state.getIn(['files', 'files']).toJS(),
    loading: state.getIn(['files', 'loading']),
  };
}

class Files extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    server: React.PropTypes.string,
    paths: React.PropTypes.array,
    files: React.PropTypes.array,
    loading: React.PropTypes.bool,
  }

  componentWillMount() {
    this.props.dispatch(actions.listPath(this.props.server, []));
  }

  openFile(file) {
    const { paths } = this.props;
    if (file.type === 'dir') {
      paths.push(file.name);
      this.props.dispatch(actions.listPath(this.props.server, paths));
    }
  }

  upperLevel = () => {
    const { paths } = this.props;
    paths.pop();
    this.props.dispatch(actions.listPath(this.props.server, paths));
  }

  renderFile = (file) => (
    <TouchableWithoutFeedback key={file.name} onPress={() => this.openFile(file)}>
      <View style={styles.server}>
        <Text>{file.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderList() {
    if (this.props.loading) return null;
    return (
      <ScrollView>
        {this.props.files.map(this.renderFile)}
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
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text>{this.props.paths.length}</Text>
          <Text style={styles.upperLevelButton} onPress={this.upperLevel}>back</Text>
        </View>
        <View style={styles.list}>
          {this.renderList()}
          {this.renderLoading()}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Files);
