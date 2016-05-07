import { combineReducers } from 'redux'

import { MOUSE_UP_GLOBAL } from '../actions/global'
import { MOUSE_DOWN_KNOB, MOUSE_MOVE_KNOB, DOUBLE_CLICK_KNOB } from '../actions/knob'
import { rangeMin, rangeMax, rangeCenter, responsivity } from '../lib/knob'
import { clamp } from '../utils/client'

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
      position: rangeCenter,
      dragging: false
    }
  }

  return state;
};

/**
 * byName Reducer
 */
const byName = (state = byNameInitialState(), action, oldYPosition) => {
  switch (action.type) {
    case MOUSE_DOWN_KNOB: {
      // Set dragging true in knob
      let knobName = action.payload.name;
      let newState = {...state};
      newState[knobName] = {...state[knobName], dragging: true };
      return newState;
    }
    case MOUSE_MOVE_KNOB: {
      // set new position in the currently dragging knob
      let draggingKnob = Object.keys(state).find((name) => {
        return state[name].dragging === true;
      });
      let deltaY = action.payload.mouseYPosition - oldYPosition;
      // Change knob position based on delta.
      // 'clamp' prevents the knob position from leaving the range
      let newPosition = clamp(
        state[draggingKnob].position - (deltaY * responsivity), rangeMin, rangeMax
      );
      let newState = {...state};
      newState[draggingKnob] = {...state[draggingKnob], position: newPosition };
      return newState;
    }
    case MOUSE_UP_GLOBAL: {
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
    }
    case DOUBLE_CLICK_KNOB: {
      // Set knob position to initial position
      let knobName = action.payload.name;
      let newState = {...state};
      newState[knobName] = {...state[knobName], position: rangeCenter };
      return newState;
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
 * mouseYPosition Reducer
 * Y position of the mouse while a knob is being dragged. Used to calculate
 * Y delta when dragging knob.
 */
const mouseYPosition = (state = null, action) => {
  switch (action.type) {
    case MOUSE_DOWN_KNOB:
      // set position
      return action.payload.mouseYPosition;
    case MOUSE_MOVE_KNOB:
      // set position
      return action.payload.mouseYPosition;
    case MOUSE_UP_GLOBAL:
      // remove position
      return null;
    default:
      return state
  }
};

/**
 * knobs Reducer
 */
const knobs = (state = {}, action) => {
  return {
    dragging: dragging(state.dragging, action),
    mouseYPosition: mouseYPosition(state.mouseYPosition, action),

    // Pass 'state.mouseYPosition' to byName reducer
    byName: byName(state.byName, action, state.mouseYPosition)
  }
};

export default knobs
