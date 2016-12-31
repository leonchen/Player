import { Map } from 'immutable';
import types from './types';

export default {
  name: 'layout',
  init: new Map({
    name: 'servers',
    props: new Map({}),
  }),

  reduce(state, action) {
    switch (action.type) {
      case types.LAYOUT: {
        return state.set('name', action.name)
          .set('props', new Map(action.props));
      }

      default:
        return state;
    }
  },
};
