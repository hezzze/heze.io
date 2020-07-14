import {
  CHANNEL_ON,
  CHANNEL_OFF,
  SERVER_ON,
  SERVER_OFF,
  UPDATE_NUM_OF_USERS
} from '../constants/actionTypes';

const initialState = {
  channelStatus: 'off',
  serverStatus: 'unknown',
  numOfUsers: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case SERVER_OFF:
      return { ...state, serverStatus: 'off', numOfUsers: 0 };
    case SERVER_ON:
      return { ...state, serverStatus: 'on' };
    case UPDATE_NUM_OF_USERS:
      return { ...state, numOfUsers: action.payload };
    default:
      return state;
  }
};

export default reducer;
