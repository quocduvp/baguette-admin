import React, {Component} from 'react'
import {AppHeaderDropdown} from '@coreui/react';
import {DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap'
import restaurantImage from '../../images/restaurant.png'
import {connect} from 'react-redux'
import {decryptedString} from '../../encrypt.config';
import {setRoles} from '../../Redux/actions/roles.action';
import {getListCategories} from '../../Redux/actions/categories.action';
import {getListFoods} from '../../Redux/actions/foods.action';
import {getListFoodOptions} from "../../Redux/actions/food_options.action";
import {getListRestaurantUsers} from "../../Redux/actions/restaurant_users.action";
import {getListRestaurantEmails} from "../../Redux/actions/restaurant_emails.action";

class ListRestaurant extends Component {
  state = {
    restaurants: [],
    restaurant_id: 0
  }

  //set deafult restaurant
  componentDidMount() {
    const sessionAuth = JSON.parse(decryptedString(sessionStorage.getItem("auth")))
    if (sessionAuth) {
      const res = sessionAuth.data.restaurant_users
      this.setState({
        restaurants: res,
        restaurant_id: res[0].restaurant_id
      })
      const {restaurant_id, role, user_id} = res[0]
      const restaurant_name = res[0].restaurant.name
      //set default
      if (!this.props.roles.restaurant_id) {
        this.props.dispatch(setRoles({restaurant_id, restaurant_name, role, user_id}))
      }
      if (this.props.categories.list.length < 1)
        this.props.dispatch(getListCategories(restaurant_id))
      if (this.props.foods.list.length < 1)
        this.props.dispatch(getListFoods(restaurant_id))
      if (this.props.food_options.list.length < 1)
        this.props.dispatch(getListFoodOptions(restaurant_id))
      if (this.props.restaurant_users.list.length < 1)
        this.props.dispatch(getListRestaurantUsers())
      if (this.props.restaurant_emails.list.length < 1)
        this.props.dispatch(getListRestaurantEmails(restaurant_name))
    }
  }

  changeRes(res, e) {
    e.preventDefault()
    const {restaurant_id, role, user_id} = res
    const restaurant_name = res.restaurant.name
    this.setState({
      restaurant_id: restaurant_id
    })
    //update set restaurant
    this.props.dispatch(setRoles({restaurant_id, restaurant_name, role, user_id}))
    this.props.dispatch(getListCategories(restaurant_id))
    this.props.dispatch(getListFoods(restaurant_id))
    this.props.dispatch(getListFoodOptions(restaurant_id))
    this.props.dispatch(getListRestaurantUsers())
    this.props.dispatch(getListRestaurantEmails(restaurant_name))
  }

  render() {
    const {restaurant_id, restaurants} = this.state
    return (
      <AppHeaderDropdown direction="down">
        <DropdownToggle nav>
          <img src={restaurantImage} className="img-avatar" alt="restaurant"/>
        </DropdownToggle>
        <DropdownMenu right style={{right: 'auto'}}>
          <DropdownItem header tag="div" className="text-center"><strong>Restaurants</strong></DropdownItem>
          <DropdownItem divider/>
          {restaurants.map((res) => {
            return (
              <DropdownItem key={res.id} onClick={this.changeRes.bind(this, res)}><i
                className={Number(restaurant_id) === Number(res.restaurant_id) ? 'fa fa-check-square-o' : 'fa fa-square-o'}></i> {res.restaurant.name}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </AppHeaderDropdown>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    users: state.users,
    restaurants: state.restaurants,
    roles: state.roles,
    foods: state.foods,
    restaurant_users: state.restaurant_users,
    restaurant_emails: state.restaurant_emails,
    food_options: state.food_options,
    categories: state.categories
  }
}
export default connect(mapStateToProps)(ListRestaurant)
