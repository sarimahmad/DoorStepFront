import {
  SET_BOTTOM_TAB_BAR,
  SET_BOTTOM_TAB_BAR_INDEX,
  SET_LANGUAGE,
} from '../actions/types';

const INITIAL_MESSAGE = {
  opacity: 1,
  indexOfBottomTab: 0,
  languageOfApp: '',
};

const appStateReducer = (state = INITIAL_MESSAGE, action) => {
  switch (action.type) {
    case SET_BOTTOM_TAB_BAR:
      state = null;
      state = new Object.assign({}, state, {opacity: action.payload});
      return state;
    case SET_BOTTOM_TAB_BAR_INDEX:
      state = null;
      state = new Object.assign({}, state, {
        indexOfBottomTab: action.payload,
      });
      return state;
    case SET_LANGUAGE:
      state = Object.assign({}, state, {languageOfApp: action.payload});
      return state;

    default:
      return state;
  }
};

export default appStateReducer;
