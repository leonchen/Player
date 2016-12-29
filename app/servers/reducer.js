import { Map, List } from 'immutable';
import types from './types';

export default {
  name: 'servers',
  init: new Map({
    loading: true,
    servers: new List(),
  }),

  reduce(state, action) {
    switch (action.type) {
      case types.LOAD:
        return state.set('loading', true);

      case types.LOADED:
        return state.set('loading', false)
          .set('servers', new List(action.servers));

      default:
        return state;
    }
  },
};
