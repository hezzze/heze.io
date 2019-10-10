import { all } from 'redux-saga/effects';
import watchMessageSocket from './watchMessageSocket';

export default function* rootSaga() {
  yield all([
    watchMessageSocket(),
  ]);
}
