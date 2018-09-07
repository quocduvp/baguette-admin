import React, { Component } from 'react'
import {Label,FormGroup,Input} from 'reactstrap'
import { connect } from 'react-redux'
import { getListRestaurants } from '../Redux/actions/restaurants.action';

class ListRestaurants extends Component {
    componentDidMount(){
        this.props.dispatch(getListRestaurants())
    }
  render() {
    const {list} = this.props.restaurants
    const {changeRestaurant,value,disabled} = this.props
    return (
        <FormGroup>
            <Label for="Restaurants">Restaurants</Label>
            <Input disabled={disabled} value={value} onChange={changeRestaurant} type="select" name="restaurant_id">
            <option>-- Change restaurant --</option>
            {list.map((res,id)=>(
                <option key={id} value={res.id}>{res.name}</option>
            ))}
            </Input>
        </FormGroup>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        restaurants : state.restaurants
    }
}
export default connect(mapStateToProps)(ListRestaurants) 