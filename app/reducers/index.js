import { combineReducers } from 'redux'

import {PRESS_KEY, RELEASE_KEY} from '../actions'

const keys = (state = [], action) => {
  switch (action.type) {
    case PRESS_KEY:
      // most recently pressed key is at the top
      return [
        action.payload.number,
        ...state
      ];
    case RELEASE_KEY:
      // remove key from array
      return state.filter((value) => {
        return value !== action.payload.number;
      });
    default:
      return state
  }
};

const monotronApp = combineReducers({
  keys
});

export default monotronApp