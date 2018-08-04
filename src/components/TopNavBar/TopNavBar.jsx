import React, { Component } from 'react';

export default class TopNavBar extends Component {
  render() {
    return (
      <div className="topnavbar">
        { this.props.children }
      </div>
    )
  }
}
