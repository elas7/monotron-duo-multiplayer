/**
 * Knob action types
 */
// Emitted when doing mouse down on a knob
export const MOUSE_DOWN_KNOB = 'MOUSE_DOWN_KNOB';

/**
 * MOUSE_DOWN_KNOB Action creator.
 * @param name
 */
export const mouseDownKnob = (name) => {
  return {
    type: MOUSE_DOWN_KNOB,
    payload: {
      name: name
    }
  }
};