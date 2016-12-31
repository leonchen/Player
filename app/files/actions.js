import types from './types';

export function listPath(server, paths) {
  return { type: types.LIST, server, paths };
}
