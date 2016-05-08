import React, { Component } from 'react'
import App from '../components/App'

/**
 * App container component
 */
export default class AppContainer extends Component {

  componentWillMount() {
    // Create audio context
    this.audioContext = new window.AudioContext();
  }

  render() {
    console.log('AppContainer render', this);
    return (
      <App audioContext={this.audioContext} />
    );
  }
}