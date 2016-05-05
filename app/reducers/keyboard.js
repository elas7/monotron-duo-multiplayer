import { combineReducers } from 'redux'

import {MOUSE_DOWN_KEY, MOUSE_UP_KEY, MOUSE_DOWN_GLOBAL, MOUSE_UP_GLOBAL} from '../actions'

/**
 * keysDown reducer
 * It Additionally gets the current state.globalClick.
 * keysDown is an array with all the keyboard keys currently pressed.
 */
const keysDown = (state = [], action, globalClick) => {
  switch (action.type) {
    case MOUSE_DOWN_KEY:
      // most recently pressed key is added at the top
      return [
        action.payload.number,
        ...state
      ];
    case MOUSE_UP_KEY:
      // remove key from array
      return state.filter((value) => {
        return value !== action.payload.number;
      });
    default:
      return state
  }
};

/**
 * globalClick Reducer
 * globalClick is true is the mouse is currently pressed, false otherwise.
 */
const globalClick = (state = false, action) => {
  switch (action.type) {
    case MOUSE_DOWN_GLOBAL:
      // mouse is currently pressed
      return true;
    case MOUSE_UP_GLOBAL:
      // mouse is not currently pressed
      return false;
    default:
      return state
  }
};

/**
 * keyboard Reducer
 */
const keyboard = (state = {}, action) => {
  return {
    // Additionally pass 'state.globalClick' to keysDown reducer
    keysDown: keysDown(state.keysDown, action, state.globalClick),
    globalClick: globalClick(state.globalClick, action)
  }
};

export default keyboard