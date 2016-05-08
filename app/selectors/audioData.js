import { createSelector } from 'reselect'

const getKnobs = (state) => {
  return state.knobs.byName;
};

const getToggles = (state) => {
  return state.toggles;
};

const getKeys = (state) => {
    return state.keyboard.keysDown.ordered;
};

/**
 * Returns the data needed from the Monotron state to render audio
 * with Web Audio API
 */
export const getAudioData = createSelector(
  [ getKnobs, getToggles, getKeys ],
  (knobs, toggles, keys) => {
    return {
      knobs, toggles, keys
    };
  }
);