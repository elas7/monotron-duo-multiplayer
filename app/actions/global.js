/**
 * Global action types
 */
// Emitted when doing mouse down anywhere
export const MOUSE_DOWN_GLOBAL = 'MOUSE_DOWN_GLOBAL';
// Emitted when doing mouse up anywhere
export const MOUSE_UP_GLOBAL = 'MOUSE_UP_GLOBAL';

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