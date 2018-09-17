import {
  FETCH_START,
  GET_LIST_ORDERS
} from "./actions_type";
import {
  fetchOrders,
  deleteOrder
} from "../../utils";
import {store} from "../store";


export const getListOrders = (restaurant_name) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: FETCH_START
  })
  fetchOrders(restaurant_name).then(r => {
    dispatch({
      type: GET_LIST_ORDERS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})

export const removeOrder = (id) => dispatch => new Promise((resolve, rejects) => {
  deleteOrder(id)
    .then(r => {
      dispatch(refeshOrders())
      resolve(r)
    }).catch(err => rejects(err))
})

// refesh data
const refeshOrders = () => dispatch => new Promise((resolve, rejects) => {
  const {restaurant_name} = store.getState().roles
  fetchOrders(restaurant_name).then(r => {
    dispatch({
      type: GET_LIST_ORDERS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})
