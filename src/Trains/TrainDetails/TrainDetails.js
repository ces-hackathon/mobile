import React, { Component } from 'react';

export default class TrainDetails extends Component {
  render() {
    return (
      <div className="train">
        { this.props.children }
      </div>
    )
  }
}
