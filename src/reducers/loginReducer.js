import { SET_LOGIN_VALUE } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_LOGIN_VALUE:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default loginReducer;
