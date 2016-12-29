import { put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import types from './types';

const SERVERS_KEY = 'Player:Servers';

async function fetchServers() {
  const serversJSON = await AsyncStorage.getItem(SERVERS_KEY);
  return JSON.parse(serversJSON || '[]');
}

function* _loadServers() {
  // yield AsyncStorage.clear();
  const servers = yield fetchServers();
  yield put({ type: types.LOADED, servers });
}

function* _addServer(action) {
  const servers = yield fetchServers();
  servers.unshift(action.server);
  yield AsyncStorage.setItem(SERVERS_KEY, JSON.stringify(servers));
  yield put({ type: types.SERVER_ADDED, servers });
}

function* loadServers() {
  yield takeLatest(types.LOAD, _loadServers);
}

function* addServer() {
  yield takeLatest(types.ADD_SERVER, _addServer);
}

export default [loadServers, addServer];
