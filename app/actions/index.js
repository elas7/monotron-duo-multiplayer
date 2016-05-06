import { qwertytoMidi } from '../lib/keyboard'

/**
 * Keyboard actions types
 */
// Emitted when doing mouse down on a keyboard key
export const MOUSE_DOWN_KEY = 'MOUSE_DOWN_KEY';
// Emitted when doing mouse up on a keyboard key
export const MOUSE_UP_KEY = 'MOUSE_UP_KEY';
// Emitted when doing mouse over to a keyboard key
export const MOUSE_OVER_KEY = 'MOUSE_OVER_KEY';
// Emitted when doing mouse out from a keyboard key
export const MOUSE_OUT_KEY = 'MOUSE_OUT_KEY';
// Emitted when doing mouse down anywhere
export const MOUSE_DOWN_GLOBAL = 'MOUSE_DOWN_GLOBAL';
// Emitted when doing mouse up anywhere
export const MOUSE_UP_GLOBAL = 'MOUSE_UP_GLOBAL';

// Emitted when doing QWERTY key down anywhere
export const KEY_DOWN_GLOBAL = 'KEY_DOWN_GLOBAL';
// Emitted when doing QWERTY key up anywhere
export const KEY_UP_GLOBAL = 'KEY_UP_GLOBAL';

/**
 * MOUSE_DOWN_KEY Action creator.
 * @param number
 */
export const mouseDownKey = (number) => {
  return {
    type: MOUSE_DOWN_KEY,
    payload: {
      number: number
    }
  }
};

/**
 * MOUSE_UP_KEY Action creator.
 * @param number
 */
export const mouseUpKey = (number) => {
  return {
    type: MOUSE_UP_KEY,
    payload: {
      number: number
    }
  }
};

/**
 * MOUSE_OVER_KEY Action creator.
 * @param number
 */
export const mouseOverKey = (number) => {
  return {
    type: MOUSE_OVER_KEY,
    payload: {
      number: number
    }
  }
};

/**
 * MOUSE_OUT_KEY Action creator.
 * @param number
 */
export const mouseOutKey = (number) => {
  return {
    type: MOUSE_OUT_KEY,
    payload: {
      number: number
    }
  }
};

/**
 * MOUSE_DOWN_GLOBAL Action creator.
 */
export const mouseDownGlobal = () => {
  return {
    type: MOUSE_DOWN_GLOBAL
  }
};

/**
 * MOUSE_UP_GLOBAL Action creator.
 */
export const mouseUpGlobal = () => {
  return {
    type: MOUSE_UP_GLOBAL
  }
};

/**
 * KEY_DOWN_GLOBAL Action creator.
 * Takes a keyCode but returns a MIDI number in the payload
 */
export const keyDownGlobal = (keyCode) => {
  return {
    type: KEY_DOWN_GLOBAL,
    payload: {
      number: qwertytoMidi(keyCode)
    }
  }
};

/**
 * KEY_UP_GLOBAL Action creator.
 * Takes a keyCode but returns a MIDI number in the payload
 */
export const keyUpGlobal = (keyCode) => {
  return {
    type: KEY_UP_GLOBAL,
    payload: {
      number: qwertytoMidi(keyCode)
    }
  }
};