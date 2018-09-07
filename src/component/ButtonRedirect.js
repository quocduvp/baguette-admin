import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { createHashHistory } from 'history'
const hist = createHashHistory()
export default class ButtonRedirect extends Component {
  render() {
      const { color,path,children } = this.props
    return (
        <Button onClick={()=> path ? hist.push(path) : ''} {...this.props} color={color ? color : "primary"}>
          {children ? children : 'Button'}
        </Button>
    )
  }
}
