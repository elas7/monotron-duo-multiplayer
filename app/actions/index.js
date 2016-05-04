
export const PRESS_KEY = 'PRESS_KEY';
export const pressKey = (number) => {
  return {
    type: PRESS_KEY,
    payload: {
      number: number
    }
  }
};

export const RELEASE_KEY = 'RELEASE_KEY';
export const releaseKey = (number) => {
  return {
    type: RELEASE_KEY,
    payload: {
      number: number
    }
  }
};