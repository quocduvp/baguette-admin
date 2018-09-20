import {
  GET_LIST_NOTIFICATIONS,
  FETCH_START
} from "./actions_type";
import { fetchNotifications, deleteNotifications } from "../../utils";
import {store} from "../store";


export const getListNotifications= (restaurant_id) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: FETCH_START
  })
  fetchNotifications(restaurant_id).then(r => {
    dispatch({
      type: GET_LIST_NOTIFICATIONS,
      payload: r
    })
    resolve(r)
  }).catch(err => rejects(err))
})

export const removeNotifications = (id) => dispatch => new Promise((resolve, rejects) => {
  deleteNotifications(id)
    .then(r => {
      dispatch(refeshNotifications())
      resolve(r)
    }).catch(err => rejects(err))
})

// refesh data
const refeshNotifications = () => dispatch => new Promise((resolve, rejects) => {
  const {restaurant_id} = store.getState().roles
  fetchNotifications(restaurant_id).then(r => {
    dispatch({
      type: GET_LIST_NOTIFICATIONS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})
