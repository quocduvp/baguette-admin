import React, { Component } from 'react'

export default class Text extends Component {
  render() {
    return (
    <div>
        <b>{this.props.title}:</b>
        <p>{this.props.children}</p>
    </div>
    )
  }
}
