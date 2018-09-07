import React, { Component } from 'react'
import {Label,FormGroup,Input} from 'reactstrap'
import { connect } from 'react-redux'
import { getListUsers } from '../Redux/actions/users.action';

class ListUsers extends Component {
    componentDidMount(){
        this.props.dispatch(getListUsers())
    }
  render() {
    const {list} = this.props.users
    const {changeUser,value,disabled} = this.props
    return (
        <FormGroup>
            <Label for="Users">Users</Label>
            <Input disabled={disabled} value={value} onChange={changeUser} type="select" name="user_id">
            <option>-- Change user --</option>
            {list.filter(v=>v.id !== 1).map((res,id)=>(
                <option key={id} value={res.id}>{res.name}</option>
            ))}
            </Input>
        </FormGroup>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        users : state.users
    }
}
export default connect(mapStateToProps)(ListUsers) 