import { put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import types from './types';

const SERVERS_KEY = 'Player:Servers';

function* _loadServers() {
  const serversJSON = yield AsyncStorage.getItem(SERVERS_KEY);
  const servers = JSON.parse(serversJSON || '[]');
  yield put({ type: types.LOADED, servers });
}

function* loadServers() {
  yield* takeLatest(types.LOAD, _loadServers);
}

export default [loadServers];
