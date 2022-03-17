import { SET_TRIVIA_VALUE, SET_OPTIONS, defaultOptions } from '../actions';

const INICIAL_STATE = {
  triviaReturn: {},
  gameOptions: defaultOptions,
};

const gameReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SET_TRIVIA_VALUE:
    return { ...state, triviaReturn: action.payload };
  case SET_OPTIONS:
    return { ...state, gameOptions: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
