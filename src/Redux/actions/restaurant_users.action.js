import { FETCH_START, GET_LIST_RESTAURANT_USERS, ADD_RESTAURANT_USERS, WAIT_RESTAURANT_USERS, RESTAURANT_USERS_ERR } from "./actions_type";
import { fetchListRestaurantUsers, createRestaurantUsers, editRestaurantUsers, deleteRestaurantUsers } from "../../utils";
import {store} from "../store";


export const getListRestaurantUsers = (restaurant_id) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: FETCH_START
    })
    fetchListRestaurantUsers(restaurant_id).then(r=>{
        dispatch({
            type : GET_LIST_RESTAURANT_USERS,
            payload: r
        })
        resolve(r)
    })
    .catch(err=>rejects(err))
})

export const addRestaurantUsers = (data) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: WAIT_RESTAURANT_USERS
    })
    createRestaurantUsers(data).then(r=>{
        dispatch({
            type : ADD_RESTAURANT_USERS
        })
        resolve(r)
    })
    .catch(err=>{
        dispatch({
            type : RESTAURANT_USERS_ERR
        })
        rejects(err)
    })
})

export const updateRestaurantUsers = ({id},data) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: WAIT_RESTAURANT_USERS
    })
    editRestaurantUsers({id},data).then(r=>{
        dispatch({
            type : ADD_RESTAURANT_USERS
        })
        resolve(r)
    })
    .catch(err=>{
        dispatch({
            type : RESTAURANT_USERS_ERR
        })
        rejects(err)
    })
})

export const removeRestaurantUsers = ({id}) => dispatch => new Promise((resolve,rejects)=>{
    deleteRestaurantUsers({id})
    .then(r=>{
        dispatch(refeshRestaurantUsers())
        resolve(r)
    }).catch(err=>rejects(err))
})

// refesh data
const refeshRestaurantUsers = () => dispatch => new Promise((resolve,rejects)=>{
    const {restaurant_id} = store.getState().roles
    fetchListRestaurantUsers(restaurant_id).then(r=>{
        dispatch({
            type : GET_LIST_RESTAURANT_USERS,
            payload: r
        })
        resolve(r)
    })
    .catch(err=>rejects(err))
})
