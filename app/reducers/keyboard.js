import { MOUSE_DOWN_GLOBAL, MOUSE_UP_GLOBAL } from '../actions/global'
import { MOUSE_DOWN_KEY, MOUSE_UP_KEY, MOUSE_OUT_KEY, MOUSE_OVER_KEY,
         KEY_DOWN_GLOBAL, KEY_UP_GLOBAL } from '../actions/keyboard'

/**
 * Initial state of keysDown.
 * Contains data and order of each key currently pressed.
 */
const keysDownInitialState = {
  // number: {number, pressedCount}
  // 'pressedCount' is the number of devices (QWERTY or mouse) that are
  // currently pressing the key.
  byId: {},

  // key numbers ordered by most recently pressed
  ordered: []
};

/**
 * Returns a new keysDown state obtained by pressing the key with the
 * provided number.
 */
const pressKey = (keysDownState, keyNumber) => {
  let alreadyPressed = keysDownState.byId[keyNumber];

  // new states
  let newById = {...keysDownState.byId};
  let newOrdered = [...keysDownState.ordered];

  // If the key is already pressed, new pressedCount is 2
  let pressedCount = alreadyPressed ? 2 : 1;
  newById[keyNumber] = {number: keyNumber, pressedCount: pressedCount};

  // Add key number at the top of 'ordered' if it wasn't pressed
  if (!alreadyPressed) {
    newOrdered.unshift(keyNumber);
  }

  return {byId: newById, ordered: newOrdered};

};

/**
 * Returns a new keysDown state obtained by releasing the key with the
 * provided number.
 */
const releaseKey = (keysDownState, keyNumber) => {
  let pressedOnce = keysDownState.byId[keyNumber].pressedCount === 1;

  // new states
  let newById = {...keysDownState.byId};
  let newOrdered = [...keysDownState.ordered];

  if (pressedOnce) {
    // delete key from 'byId' and 'ordered'
    delete newById[keyNumber];
    newOrdered.splice(newOrdered.indexOf(keyNumber), 1);
  } else {
    // reduce pressedCount to 1
    newById[keyNumber] = {number: keyNumber, pressedCount: 1};
  }

  return {byId: newById, ordered: newOrdered};

};

/**
 * keysDown reducer
 * It Additionally gets the current state.globalClick.
 */
const keysDown = (state = keysDownInitialState, action, globalClick) => {
  switch (action.type) {
    case MOUSE_DOWN_KEY:
      return pressKey(state, action.payload.number);
    case MOUSE_UP_KEY:
      return releaseKey(state, action.payload.number);
    case MOUSE_OVER_KEY:
      // press key only if mouse was clicking
      if (globalClick) {
        return pressKey(state, action.payload.number);
      } else {
        return state
      }
    case MOUSE_OUT_KEY:
      // release key only if mouse was clicking
      if (globalClick) {
        return releaseKey(state, action.payload.number);
      } else {
        return state
      }
    case KEY_DOWN_GLOBAL:
      return pressKey(state, action.payload.number);
    case KEY_UP_GLOBAL:
      return releaseKey(state, action.payload.number);
    default:
      return state
  }
};

/**
 * globalClick Reducer
 * globalClick is true is the mouse is currently pressed, false otherwise.
 * This is used to see if mouseover and mouseout should be considered as
 * pressing or releasing a key, respectively.
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
    globalClick: globalClick(state.globalClick, action),

    // Pass 'state.globalClick' to keysDown reducer
    keysDown: keysDown(state.keysDown, action, state.globalClick)
  }
};

export default keyboard