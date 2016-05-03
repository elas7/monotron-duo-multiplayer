import React from 'react';

/**
 * Knob Component.
 */
export default class Knob extends React.Component {
  render() {
    var className = `knob ${this.props.name}`;
    var knobs = {
      "knobOsc1":
        <g className={className}>
          <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="180.2" cy="393.7" r="14.1"/>
          <circle fill="#414042" stroke="#414042" stroke-miterlimit="10" cx="180.2" cy="393.7" r="12.7"/>
          <path fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" d="M182.6,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H182.6z"/>
        </g>,
      "knobOsc2":
        <g className={className}>
          <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="347.5" cy="393.7" r="14.1"/>
          <circle fill="#EC7C76" cx="347.5" cy="393.7" r="12.7"/>
          <path fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" d="M349.9,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H349.9z"/>
        </g>,
      "knobCutoff":
        <g className={className}>
          <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="431.6" cy="393.7" r="14.1"/>
          <circle fill="#414042" stroke="#414042" stroke-miterlimit="10" cx="431.6" cy="393.7" r="12.7"/>
          <path fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" d="M433.9,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H433.9z"/>
        </g>,
      "knobPeak":
        <g className={className}>
          <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="514.3" cy="393.7" r="14.1"/>
          <circle fill="#414042" stroke="#414042" stroke-miterlimit="10" cx="514.3" cy="393.7" r="12.7"/>
          <path fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" d="M516.6,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H516.6z"/>
        </g>,
      "knobXmod":
        <g className={className}>
          <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="264" cy="393.7" r="14.1"/>
          <circle fill="#414042" stroke="#414042" stroke-miterlimit="10" cx="264" cy="393.7" r="12.7"/>
          <path fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" d="M266.4,379.8c-0.7-0.1-1.6-0.2-2.3-0.2s-1.6,0.1-2.3,0.2v8h4.8v-8H266.4z"/>
        </g>
    };

    return knobs[this.props.name];
  }
}
