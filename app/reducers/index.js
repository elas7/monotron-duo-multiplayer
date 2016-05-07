import { combineReducers } from 'redux'

import keyboard from './keyboard'
import knobs from './knobs'
import toggles from './toggles'

/**
 * Monotron App main reducer
 */
const monotronApp = (state = {}, action) => {
  const dragging = state.knobs ? state.knobs.dragging : undefined;

  return {
    knobs: knobs(state.knobs, action),
    toggles: toggles(state.toggles, action),

    // Pass 'state.knobs.dragging' to keyboard reducer
    keyboard: keyboard(state.keyboard, action, dragging)
  };
};

export default monotronApp