/**
 * Toggle action types
 */
// Emitted when clicking a toggle
export const CLICK_TOGGLE = 'CLICK_TOGGLE';

/**
 * CLICK_TOGGLE Action creator.
 */
export const clickToggle = (name) => {
  return {
    type: CLICK_TOGGLE,
    payload: {
      name: name
    }
  }
};