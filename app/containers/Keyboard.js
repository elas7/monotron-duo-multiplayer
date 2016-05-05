import { connect } from 'react-redux'
import { mouseDownKey, mouseUpKey } from '../actions'
import { Keyboard, KeyboardKey } from '../components/Keyboard'

const mapStateToProps = (state) => {
  return {
    keysDown: state.keyboard.keysDown
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMouseDownKey: (number) => {
      dispatch(mouseDownKey(number));
    },
    onMouseUpKey: (number) => {
      dispatch(mouseUpKey(number));
    }
  }
};

/**
 * Keyboard container component
 */
const KeyboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyboard);

export default KeyboardContainer