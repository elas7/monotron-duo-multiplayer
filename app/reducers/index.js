import { combineReducers } from 'redux'

import keyboard from './keyboard'
import knobs from './knobs'

/**
 * Monotron App main reducer
 */
const monotronApp = (state = {}, action) => {
  const dragging = state.knobs ? state.knobs.dragging : undefined;

  return {
    knobs: knobs(state.knobs, action),

    // Pass 'state.knobs.dragging' to keyboard reducer
    keyboard: keyboard(state.keyboard, action, dragging)
  };
};

export default monotronApp