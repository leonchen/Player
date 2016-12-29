import types from './types';

export function loadServers() {
  return { type: types.LOAD };
}

export function showForm() {
  return { type: types.SHOW_FORM };
}

export function addServer(server) {
  return { type: types.ADD_SERVER, server };
}

export function connectServer(server) {
  return { type: types.CONNECT_SERVER, server };
}
