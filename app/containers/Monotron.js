import { connect } from 'react-redux'

import { mouseDownKnob } from '../actions/knob'
import Monotron from '../components/Monotron'

const mapStateToProps = (state) => {
  return {
    knobs: state.knobs.byName,
    dragging: state.knobs.dragging
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMouseDownKnob: (name) => {
      dispatch(mouseDownKnob(name));
    }
  }
};

/**
 * Monotron container component
 */
const MonotronContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Monotron);

export default MonotronContainer