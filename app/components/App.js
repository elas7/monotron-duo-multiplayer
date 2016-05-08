import React from 'react';
import Toggle from './Toggle';
import Knob from './Knob';
import MonotronContainer from '../containers/Monotron';

/**
 * App Component.
 */
export default function App({audioContext}) {

  return (
    <div>
      <MonotronContainer audioContext={audioContext} />
    </div>
  )
}