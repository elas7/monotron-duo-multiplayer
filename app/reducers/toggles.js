import { CLICK_TOGGLE } from '../actions/toggle'

/**
 * Initial state of toggles.
 */
const initialState = {
  toggleOsc2: {
    name: "toggleOsc2",

    // The knob positions are 1 if on, 0 if off
    position: 0
  }
};

/**
 * toggles Reducer
 */
const toggles = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_TOGGLE: {
      // Change toggle position
      let toggleName = action.payload.name;
      let newPosition = state[toggleName].position ? 0 : 1;
      let newState = {...state};
      newState[toggleName] = {...state[toggleName], position: newPosition };
      return newState;
    }
    default:
      return state
  }
};

export default toggles
