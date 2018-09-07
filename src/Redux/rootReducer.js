import { combineReducers } from 'redux'
import {categories} from './reducers/categories.reducer'
import {restaurants} from './reducers/restaurants.reducer'
import {restaurant_users} from './reducers/restaurant_users.reducer'
import {restaurant_emails} from './reducers/restaurant_emails.reducer'
import {auth} from './reducers/auth.reducer'
import {users} from './reducers/users.reducer'
import {foods} from './reducers/foods.reducer'
import {roles} from './reducers/roles'
import {food_options} from "./reducers/food_options.reducer";
export const rootReducer = combineReducers({
    roles,categories,auth,restaurants,users,restaurant_users,restaurant_emails,foods,food_options
})  
