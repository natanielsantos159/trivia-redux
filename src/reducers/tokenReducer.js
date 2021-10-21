import { SET_TOKEN_VALUE } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TOKEN_VALUE:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default tokenReducer;
