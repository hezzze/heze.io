import { ADD_MESSAGE } from '../constants/actionTypes';

const initialState = {
  all: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, all: [...state.all, action.payload] };
    default:
      return state;
  }
};

export default reducer;
