import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import sagas from '../sagas';
import initialState from './initialState';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(
  reducers,
  initialState,
  enhancer
);

sagaMiddleware.run(sagas);

export default store;
