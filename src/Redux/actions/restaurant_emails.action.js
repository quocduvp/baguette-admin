import {
  ADD_RESTAURANT_EMAILS,
  FETCH_START,
  GET_LIST_RESTAURANT_EMAILS,
  RESTAURANT_EMAILS_ERR,
  WAIT_RESTAURANT_EMAILS,
} from "./actions_type";
import {
  fetchListRestaurantEmails,
  createRestaurantEmails,
  deleteRestaurantEmails,
  editRestaurantEmails
} from "../../utils";
import {store} from "../store";


export const getListRestaurantEmails = (restaurant_name) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: FETCH_START
  })
  fetchListRestaurantEmails(restaurant_name).then(r => {
    dispatch({
      type: GET_LIST_RESTAURANT_EMAILS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})

export const addRestaurantEmails = (data) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: WAIT_RESTAURANT_EMAILS
  })
  createRestaurantEmails(data).then(r => {
    dispatch({
      type: ADD_RESTAURANT_EMAILS
    })
    dispatch(refeshRestaurantEmails())
    resolve(r)
  })
    .catch(err => {
      dispatch({
        type: RESTAURANT_EMAILS_ERR
      })
      rejects(err)
    })
})

export const updateRestaurantEmails = (data, {id}) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: WAIT_RESTAURANT_EMAILS
  })
  editRestaurantEmails(data, {id}).then(r => {
    dispatch({
      type: ADD_RESTAURANT_EMAILS
    })
    dispatch(refeshRestaurantEmails())
    resolve(r)
  })
    .catch(err => {
      dispatch({
        type: RESTAURANT_EMAILS_ERR
      })
      rejects(err)
    })
})

export const removeRestaurantEmails = (id) => dispatch => new Promise((resolve, rejects) => {
  deleteRestaurantEmails(id)
    .then(r => {
      dispatch(refeshRestaurantEmails())
      resolve(r)
    }).catch(err => rejects(err))
})

// refesh data
const refeshRestaurantEmails = () => dispatch => new Promise((resolve, rejects) => {
  const {restaurant_name} = store.getState().roles
  fetchListRestaurantEmails(restaurant_name).then(r => {
    dispatch({
      type: GET_LIST_RESTAURANT_EMAILS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})
