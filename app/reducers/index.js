import { combineReducers } from 'redux'

import keyboard from './keyboard'
import knobs from './knobs'

/**
 * Monotron App main reducer
 */
const monotronApp = combineReducers({
  keyboard,
  knobs
});

export default monotronApp