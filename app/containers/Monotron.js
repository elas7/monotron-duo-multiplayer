import React, { Component } from 'react'
import { connect } from 'react-redux'

import { qwertytoMidi } from '../lib/keyboard'
import { mouseDownGlobal, mouseUpGlobal } from '../actions/global';
import { keyUpGlobal, keyDownGlobal } from '../actions/keyboard';
import { mouseDownKnob, mouseMoveKnob, doubleClickKnob } from '../actions/knob'
import { clickToggle } from '../actions/toggle'
import Monotron from '../components/Monotron'

/**
 * Monotron container component
 */
class MonotronContainer extends Component {

  constructor(props) {
    super(props);

    // Keep track of which keys are down, to avoid repetitive 'keydown' events
    this.qwertyDown = {};
  }

  mouseDownHandler = () => {
    this.props.onMouseDownGlobal();
  };

  mouseUpHandler = () => {
    this.props.onMouseUpGlobal();
  };

  keyDownHandler = (e) => {
    let keyCode = e.keyCode;
    if (this.qwertyDown[keyCode] == null) { // first press
      let midiValue = qwertytoMidi(keyCode);
      if (midiValue) {
        this.props.onKeyDownGlobal(midiValue);
        this.qwertyDown[keyCode] = true;
      }
    }
  };

  keyUpHandler = (e) => {
    let keyCode = e.keyCode;
    let midiValue = qwertytoMidi(keyCode);
    if (midiValue) {
      this.props.onKeyUpGlobal(midiValue);
      this.qwertyDown[keyCode] = null;
    }
  };

  mouseMoveHandler = (e) => {
    // Dispatch event only if a knob is being dragged
    if (this.props.dragging) {
      this.props.onMouseMoveKnob(e);
    }
  };

  componentDidMount() {
    // We track if the user has the mouse clicked when outside
    // the keyboard element because he may try a "slide-in"
    window.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);

    // Track QWERTY events
    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);

    // Track 'mousemove' events when a knob is being dragged
    window.addEventListener('mousemove', this.mouseMoveHandler);
  }

  componentWillUnmount() {
    // Remove all handlers
    window.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    window.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  render () {
    const { toggles, onClickToggle, knobs, dragging, onMouseDownKnob, onDoubleClickKnob } = this.props;

    return (
      <Monotron
        toggles={toggles}
        onClickToggle={onClickToggle}
        knobs={knobs}
        dragging={dragging}
        onMouseDownKnob={onMouseDownKnob}
        onDoubleClickKnob={onDoubleClickKnob}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toggles: state.toggles,
    knobs: state.knobs.byName,
    dragging: state.knobs.dragging
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMouseDownGlobal: () => {
      dispatch(mouseDownGlobal());
    },
    onMouseUpGlobal: () => {
      dispatch(mouseUpGlobal());
    },
    onKeyDownGlobal: (midiValue) => {
      dispatch(keyDownGlobal(midiValue));
    },
    onKeyUpGlobal: (midiValue) => {
      dispatch(keyUpGlobal(midiValue));
    },
    onMouseDownKnob: (name, event) => {
      dispatch(mouseDownKnob(name, event));
    },
    onMouseMoveKnob: (event) => {
      dispatch(mouseMoveKnob(event));
    },
    onDoubleClickKnob: (name) => {
      dispatch(doubleClickKnob(name));
    },
    onClickToggle: (name) => {
      dispatch(clickToggle(name));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonotronContainer);

