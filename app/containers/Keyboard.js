import { connect } from 'react-redux'
import { pressKey, releaseKey } from '../actions'
import { Keyboard, KeyboardKey } from '../components/Keyboard'

const mapStateToProps = (state) => {
  return {
    keysDown: state.keysDown
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPressKey: (number) => {
      dispatch(pressKey(number));
    },
    onReleaseKey: (number) => {
      dispatch(releaseKey(number));
    }
  }
};

const KeyboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyboard);

export default KeyboardContainer