import { put, takeLatest } from 'redux-saga/effects';
import Promise from 'bluebird';
import smb from 'smb2';

import types from './types';

async function listFTP(server, paths) {
  return [];
}

async function listSMB(server, paths) {
  return [];
}

async function listPath(server, paths) {
  if (server.match(/^ftp/i)) {
    return await listFTP(server, paths);
  } else if (server.match(/^smb/i)) {
    return await listSMB(server, paths);
  }
  return [];
}

function* _list(action) {
  const { server, paths } = action;
  const files = yield listPath(server, paths);
  yield put({ type: types.LISTED, files });
}

function* list() {
  yield takeLatest(types.LIST, _list);
}


export default [list];
