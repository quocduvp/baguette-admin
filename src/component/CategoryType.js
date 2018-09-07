import React, { Component } from 'react'
import {Label,FormGroup,Input} from 'reactstrap'
export default class CategoryType extends Component {
  render() {
    const {changeCategoryType,value,disabled} = this.props
    return (
        <FormGroup>
          <Label for="Category_Type">Category Type</Label>
          <Input disabled={disabled} value={value} onChange={changeCategoryType} type="select" name="category_type">
            <option>-- Change type --</option>
            <option value="menu">Menu</option>
            <option value="catering">Catering</option>
          </Input>
        </FormGroup>
    )
  }
}
