import { SET_TRIVIA_VALUE } from '../actions';

const INICIAL_STATE = {
  triviaReturn: {},
};

const gameReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SET_TRIVIA_VALUE:
    return { ...state, triviaReturn: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
