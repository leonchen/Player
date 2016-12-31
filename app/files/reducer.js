import { Map, List } from 'immutable';
import types from './types';

export default {
  name: 'files',
  init: new Map({
    loading: true,
    server: '',
    paths: new List(),
    files: new List(),
  }),

  reduce(state, action) {
    switch (action.type) {
      case types.LIST:
        return state.set('server', action.server)
          .set('paths', new List(action.paths))
          .set('loading', true);

      case types.LISTED:
        return state.set('loading', false)
          .set('files', new List(action.files));

      default:
        return state;
    }
  },
};
