import {
  CHANNEL_ON,
  CHANNEL_OFF,
  SERVER_ON,
  SERVER_OFF
} from '../constants/actionTypes';

const initialState = {
  channelStatus: 'off',
  serverStatus: 'unknown',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case SERVER_ON:
      return { ...state, serverStatus: 'on' };
    default:
      return state;
  }
};

export default reducer;
