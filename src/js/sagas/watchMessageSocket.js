import io from 'socket.io-client';
import {
  take, put, call, apply, delay, race, fork, cancelled, takeEvery
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
// import { createWebSocketConnection } from './socketConnection';
import {
  CHANNEL_ON,
  CHANNEL_OFF,
  SERVER_ON,
  SERVER_OFF,
  START_CHANNEL,
  STOP_CHANNEL,
  ADD_MESSAGE,
  SEND_MESSAGE
} from '../constants/actionTypes';

import config from '../../config';

const socketServerURL = process.env === 'production' ? config.apiUrl : 'https://app.meng2x.com';

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel((emit) => {
    const messageHandler = (data) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(data);
    };

    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason));
    };

    // setup the subscription
    socket.on('message', messageHandler);
    socket.on('error', errorHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('message', messageHandler);
    };

    return unsubscribe;
  });
}

// reply with a `pong` message by invoking `socket.emit('pong')`
// function* pong(socket) {
//   yield delay(5000);
//   yield apply(socket, socket.emit, ['pong']); // call `emit` as a method with `socket` as context
// }

// export function* watchMessageSocket1() {
//   const socket = yield call(createWebSocketConnection);
//   const socketChannel = yield call(createSocketChannel, socket);
//
//   while (true) {
//     try {
//       // An error from socketChannel will cause the saga jump to the catch block
//       const payload = yield take(socketChannel);
//       yield put({ type: INCOMING_MESSAGE_PAYLOAD, payload });
//       yield fork(pong, socket);
//     } catch (err) {
//       console.error('socket error:', err);
//       // socketChannel is still open in catch block
//       // if we want end the socketChannel, we need close it explicitly
//       // socketChannel.close()
//     }
//   }
// }

// wrapping functions for socket events (connect, disconnect, reconnect)
let socket;
const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

// connection monitoring sagas
const listenDisconnectSaga = function* () {
  while (true) {
    yield call(disconnect);
    yield put({ type: SERVER_OFF });
  }
};

const listenConnectSaga = function* () {
  while (true) {
    yield call(reconnect);
    yield put({ type: SERVER_ON });
  }
};

const watchSendMessage = function* (sock) {
  yield takeEvery(SEND_MESSAGE, function* sendMessage(action) {
    // call `emit` as a method with `socket` as context
    yield apply(sock, sock.emit, ['message', action.payload]);
  });
};


// Saga to switch on channel.
const listenServerSaga = function* () {
  try {
    yield put({ type: CHANNEL_ON });
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put({ type: SERVER_OFF });
    }
    const socketInstance = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socketInstance);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put({ type: SERVER_ON });
    yield fork(watchSendMessage, socketInstance);

    while (true) {
      const payload = yield take(socketChannel);
      yield put({ type: ADD_MESSAGE, payload });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: CHANNEL_OFF });
    }
  }
};

// saga listens for start and stop actions
export default function* watchMessageSocket() {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
}
