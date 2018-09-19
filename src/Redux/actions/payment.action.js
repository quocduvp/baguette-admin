import {
  FETCH_START,
  GET_LIST_PAYMENTS
} from "./actions_type";
import { fetchPayments } from "../../utils";
import {store} from "../store";


export const getListPayments= (restaurant_name) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: FETCH_START
  })
  fetchPayments(restaurant_name).then(r => {
    dispatch({
      type: GET_LIST_PAYMENTS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})

// export const removePayments = (id) => dispatch => new Promise((resolve, rejects) => {
//   deleteOrder(id)
//     .then(r => {
//       dispatch(refeshOrders())
//       resolve(r)
//     }).catch(err => rejects(err))
// })

// refesh data
const refeshPayments = () => dispatch => new Promise((resolve, rejects) => {
  const {restaurant_name} = store.getState().roles
  fetchPayments(restaurant_name).then(r => {
    dispatch({
      type: GET_LIST_PAYMENTS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})
