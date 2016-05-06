import { combineReducers } from 'redux'

import { MOUSE_UP_GLOBAL } from '../actions/global'
import { MOUSE_DOWN_KNOB } from '../actions/knob'

/**
 * Initial state of byName.
 * It has one key for every type of knob.
 * name: {name, position, dragging}
 * 'position' is the value of the knob, the full range is 0 to 1.
 * 'dragging' is whether the knobs is being dragged
 */
const byNameInitialState = () => {
  let state = {};
  let knobNames = ["knobOsc1", "knobXmod", "knobOsc2", "knobCutoff", "knobPeak"];

  for (let name of knobNames) {
    state[name] = {
      name: name,
      position: 0.5,
      dragging: false
    }
  }

  return state;
};

/**
 * byName Reducer
 */
const byName = (state = byNameInitialState(), action) => {
  switch (action.type) {
    case MOUSE_DOWN_KNOB:
      // Set dragging true in knob
      let knobName = action.payload.name;
      let newState = {...state};
      newState[knobName] = {...state[knobName], dragging: true };
      return newState;
    case MOUSE_UP_GLOBAL:
      // Set dragging false if a knob is dragging
      let draggingKnob = Object.keys(state).find((name) => {
        return state[name].dragging === true;
      });
      if (draggingKnob) {
        let newState = {...state};
        newState[draggingKnob] = {...state[draggingKnob], dragging: false };
        return newState;
      } else {
        return state
      }
    default:
      return state
  }
};

/**
 * dragging Reducer
 * Whether any of the knobs is being dragged
 */
const dragging = (state = false, action) => {
  switch (action.type) {
    case MOUSE_DOWN_KNOB:
      // set dragging true
      return true;
    case MOUSE_UP_GLOBAL:
      // set dragging false
      return false;
    default:
      return state
  }
};


/**
 * knobs Reducer
 */
const knobs = combineReducers({
  byName,
  dragging
});

export default knobs
