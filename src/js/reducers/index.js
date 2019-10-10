import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import messages from './messages';
import status from './status';

const reducer = combineReducers({
  status,
  messages,
  toastr: toastrReducer
});

export default reducer;
