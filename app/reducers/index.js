import { combineReducers } from 'redux'

import keyboard from './keyboard'

/**
 * Monotron App main reducer
 */
const monotronApp = combineReducers({
  keyboard
});

export default monotronApp