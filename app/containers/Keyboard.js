import { connect } from 'react-redux'
import { mouseDownKey, mouseUpKey, mouseOverKey, mouseOutKey } from '../actions'
import { Keyboard, KeyboardKey } from '../components/Keyboard'

const mapStateToProps = (state) => {
  return {
    keysDown: state.keyboard.keysDown.ordered
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMouseDownKey: (number) => {
      dispatch(mouseDownKey(number));
    },
    onMouseUpKey: (number) => {
      dispatch(mouseUpKey(number));
    },
    onMouseOverKey: (number) => {
      dispatch(mouseOverKey(number));
    },
    onMouseOutKey: (number) => {
      dispatch(mouseOutKey(number));
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