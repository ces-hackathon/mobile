import React, { Component } from 'react';

export default class UserLogin extends Component {
  render() {
    return (
      <div className="userlogin">
        { this.props.children }
      </div>
    )
  }
}
