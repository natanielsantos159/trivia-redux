import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ loginReducer, gameReducer, tokenReducer });

export default rootReducer;
