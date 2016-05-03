import React from 'react';

/**
 * Toggle Component.
 */
export default class Toggle extends React.Component {
  render() {
    var className = `toggle ${this.props.name}`;

    return (
      <g className={className}>
        <rect x="51.1" y="373.7" fill="#FFFFFF" stroke="#414042" stroke-miterlimit="10" width="20.7" height="40.3"/>
        <rect x="53.8" y="378.3" fill="#414042" stroke="#414042" stroke-miterlimit="10" width="15.3" height="30.9"/>
        <g className="switch">
          <rect x="53.8" y="398.6" fill="#FFFFFF" stroke="#414042" stroke-miterlimit="10" width="15.3" height="10.5"/>
          <line fill="none" stroke="#414042" stroke-miterlimit="10" x1="53.8" y1="401.1" x2="69.3" y2="401.1"/>
          <line fill="none" stroke="#414042" stroke-miterlimit="10" x1="53.8" y1="403.8" x2="69.3" y2="403.8"/>
          <line fill="none" stroke="#414042" stroke-miterlimit="10" x1="53.8" y1="406.5" x2="69.3" y2="406.5"/>
        </g>
      </g>
    );
  }
}