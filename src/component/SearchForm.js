import React, { Component } from 'react'
import {Input} from 'reactstrap'
export default class SearchForm extends Component {
  render() {
      const { feedback,input,root }  = styles
    return (
      <div style={root} className="form-group has-search">
        <span style={feedback} className="fa fa-search form-control-feedback"></span>
        <Input onChange={this.props.handleSearch} value={this.props.value} style={input} type="text" className="form-control" placeholder="Search"/>
      </div>
    )
  }
}

const styles = {
    input: {
        paddingLeft: '36px'
    },
    feedback : {
        position: 'absolute',
        zIndex: 2,
        display: 'block',
        width: '2.375rem',
        height: '2.375rem',
        lineHeight: '2.375rem',
        textAlign: 'center',
        pointerEvents: 'none',
        color: '#aaa',
    },
    root : {
        marginBottom: 0
    }
} 
