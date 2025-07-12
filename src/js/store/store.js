import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';
import initialState from './initialState';

const sagaMiddleware = createSagaMiddleware({
  onError: (error, { sagaStack }) => {
    console.log(error);
    console.log(sagaStack);
  }
});

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // We're using saga instead of thunk
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(sagas);

export default store;
