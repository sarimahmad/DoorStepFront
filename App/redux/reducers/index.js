import {combineReducers} from 'redux';
import userReducer from './user';
import appState from './appState';

const reducer = combineReducers({
  user: userReducer,
  appState: appState,
});
export default reducer;
