import { getCursorPosition } from '../utils/client'

/**
 * Knob action types
 */
// Emitted when doing mouse down on a knob
export const MOUSE_DOWN_KNOB = 'MOUSE_DOWN_KNOB';
// Emitted when doing mouse move while knob is pressed
export const MOUSE_MOVE_KNOB = 'MOUSE_MOVE_KNOB';

/**
 * MOUSE_DOWN_KNOB Action creator.
 */
export const mouseDownKnob = (name, event) => {
  // Calculate mouse y position when knob is pressed
  let mouseYPosition = getCursorPosition(event).y;

  return {
    type: MOUSE_DOWN_KNOB,
    payload: {
      name: name,
      mouseYPosition: mouseYPosition
    }
  }
};

/**
 * MOUSE_MOVE_KNOB Action creator.
 */
export const mouseMoveKnob = (event) => {
  // Calculate mouse y position when knob is pressed
  let mouseYPosition = getCursorPosition(event).y;

  return {
    type: MOUSE_MOVE_KNOB,
    payload: {
      mouseYPosition: mouseYPosition
    }
  }
};