import { fetchRestaurants } from "../../utils/fetch_data";
import { FETCH_START, GET_LIST_RESTAURANTS, RESTAURANTS_ERR, ADD_RESTAURANTS, WAIT_RESTAURANTS } from "./actions_type";
import { editRestaurants, createRestaurants,deleteRestaurant } from "../../utils";

export const getListRestaurants = () => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: FETCH_START
    })
    fetchRestaurants().then(r=>{
        dispatch({
            type : GET_LIST_RESTAURANTS,
            payload: r
        })
        resolve(r)
    })
    .catch(err=>rejects(err))
})

export const addRestaurants = (data) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: WAIT_RESTAURANTS
    })
    createRestaurants(data).then(r=>{
        dispatch({
            type : ADD_RESTAURANTS
        })
        resolve(r)
    })
    .catch(err=>{
        dispatch({
            type : RESTAURANTS_ERR
        })
        rejects(err)
    })
})

export const updateRestaurants = ({id},data) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: WAIT_RESTAURANTS
    })
    editRestaurants({id},data).then(r=>{
        dispatch({
            type : ADD_RESTAURANTS
        })
        resolve(r)
    })
    .catch(err=>{
        dispatch({
            type : RESTAURANTS_ERR
        })
        rejects(err)
    })
})

export const removeRestaurants = (id) => dispatch => new Promise((resolve,rejects)=>{
    deleteRestaurant(id).then(r=>{
        dispatch(refeshRestaurants())
        resolve(r)
    })
    .catch(err=>{
        rejects(err)
    })
})

//not reload
const refeshRestaurants = () => dispatch => new Promise((resolve,rejects)=>{
    fetchRestaurants().then(r=>{
        dispatch({
            type : GET_LIST_RESTAURANTS,
            payload: r
        })
        resolve(r)
    })
    .catch(err=>rejects(err))
})