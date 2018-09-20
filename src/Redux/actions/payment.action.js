import {
  FETCH_START,
  GET_LIST_PAYMENTS,
  PAYMENTS_ERR,
  ADD_PAYMENTS,
  WAIT_PAYMENTS
} from "./actions_type";
import { fetchPayments, deletePayments, createPayments, editPayments } from "../../utils";
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

export const removePayments = (id) => dispatch => new Promise((resolve, rejects) => {
  deletePayments(id)
    .then(r => {
      dispatch(refeshPayments())
      resolve(r)
    }).catch(err => rejects(err))
})

//add payment
export const addPayments = (data) => dispatch => new Promise((resolve,rejects)=>{
  dispatch({
    type: WAIT_PAYMENTS
  })
  createPayments(data)
    .then(async r=>{
      await dispatch({
        type: ADD_PAYMENTS
      })
      resolve(r)
      await dispatch(refeshPayments())
    }).catch(err=>{
      dispatch({
        type: PAYMENTS_ERR
      })
      rejects(err)
    })
})

//edit payment
export const updatePayments = (data,{id}) => dispatch => new Promise((resolve,rejects)=>{
  dispatch({
    type: WAIT_PAYMENTS
  })
  editPayments(data,{id})
    .then(async r=>{
      await dispatch({
        type: ADD_PAYMENTS
      })
      resolve(r)
      await dispatch(refeshPayments())
    }).catch(err=>{
      dispatch({
        type: PAYMENTS_ERR
      })
      resolve(err)
    })
})

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
