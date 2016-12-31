import types from './types';

export function layout(name, props) {
  return { type: types.LAYOUT, name, props };
}
