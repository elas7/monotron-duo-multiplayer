/**
 * Keyboard actions types
 */
// Emitted when doing mouse down on a keyboard key
export const MOUSE_DOWN_KEY = 'MOUSE_DOWN_KEY';
// Emitted when doing mouse up on a keyboard key
export const MOUSE_UP_KEY = 'MOUSE_UP_KEY';
// Emitted when doing mouse down anywhere
export const MOUSE_DOWN_GLOBAL = 'MOUSE_DOWN_GLOBAL';
// Emitted when doing mouse up anywhere
export const MOUSE_UP_GLOBAL = 'MOUSE_UP_GLOBAL';

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
 * MOUSE_DOWN_GLOBAL Action creator.
 */
export const mouseDownGlobal = () => {
  return {
    type: MOUSE_DOWN_GLOBAL
  }
};


export const mouseUpGlobal = () => {
  return {
    type: MOUSE_UP_GLOBAL
  }
};