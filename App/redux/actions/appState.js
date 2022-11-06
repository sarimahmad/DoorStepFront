import {
  SET_BOTTOM_TAB_BAR,
  SET_BOTTOM_TAB_BAR_INDEX,
  SET_LANGUAGE,
} from './types';

function setOpacityOfTabBar(opacity) {
  return dispatch => {
    dispatch({type: SET_BOTTOM_TAB_BAR, payload: opacity});
  };
}
function setBottomIndexOftabBar(index) {
  return dispatch => {
    dispatch({type: SET_BOTTOM_TAB_BAR_INDEX, payload: index});
  };
}
function setApplicationLanguage(language) {
  return dispatch => {
    dispatch({type: SET_LANGUAGE, payload: language});
  };
}

export {setOpacityOfTabBar, setBottomIndexOftabBar, setApplicationLanguage};
