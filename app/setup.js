import { Map } from 'immutable';

// redux
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';

// redux saga
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';

export default function setup(App, components) {
  const sagas = [];
  const reducers = {};

  let state = new Map({});

  for (const c of components) {
    const { sagas: _sagas, reducer } = c;
    if (_sagas) {
      if (_sagas instanceof Array) {
        sagas.push(..._sagas);
      } else {
        sagas.push(_sagas);
      }
    }

    if (reducer) {
      const compReducers = reducer instanceof Array ? reducer : [reducer];
      for (const r of compReducers) {
        const { init, name, reduce } = r;
        reducers[name] = reduce;
        if (init) state = state.set(name, init);
      }
    }
  }

  function* rootSaga() {
    const tasks = [];
    for (const saga of sagas) {
      const task = yield fork(saga);
      task.done.catch(e => { throw e; });
      tasks.push(task);
    }
    return tasks;
  }

  const sagaMiddleware = createSagaMiddleware();
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, state, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return { reducer, store };
}
