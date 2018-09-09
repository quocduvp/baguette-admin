import {GET_LIST_USERS, ADD_USERS, WAIT_USERS, USERS_ERR, FETCH_START} from "./actions_type";
import {fetchListUsers, createUsers, editUsers} from "../../utils";

export const getListUsers = () => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: FETCH_START
  })
  fetchListUsers().then(r => {
    dispatch({
      type: GET_LIST_USERS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})

export const addUsers = (data) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: WAIT_USERS
  })
  createUsers(data).then(r => {
    dispatch({
      type: ADD_USERS
    })
    dispatch(refeshUsers())
    resolve(r)
  })
    .catch(err => {
      dispatch({
        type: USERS_ERR
      })
      rejects(err)
    })
})

export const updateUsers = ({id}, data) => dispatch => new Promise((resolve, rejects) => {
  dispatch({
    type: WAIT_USERS
  })
  editUsers({id}, data).then(r => {
    dispatch({
      type: ADD_USERS
    })
    dispatch(refeshUsers())
    resolve(r)
  })
    .catch(err => {
      dispatch({
        type: USERS_ERR
      })
      rejects(err)
    })
})

//
const refeshUsers = () => dispatch => new Promise((resolve, rejects) => {
  fetchListUsers().then(r => {
    dispatch({
      type: GET_LIST_USERS,
      payload: r
    })
    resolve(r)
  })
    .catch(err => rejects(err))
})
