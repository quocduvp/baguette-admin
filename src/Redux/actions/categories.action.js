import { getCategories } from "../../utils/fetch_data";
import { FETCH_START, GET_LIST_CATEGORIES, CATEGORIES_ERR, ADD_CATEGORIES, WAIT_CATEGORIES } from "./actions_type";
import { createCategories, deleteCategories, updateCategories } from "../../utils";
import { store } from '../store'
export const getListCategories = (restaurant_id) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: FETCH_START
    })
    getCategories(restaurant_id).then(r=>{
        dispatch({
            type : GET_LIST_CATEGORIES,
            payload: r
        })
        resolve(r)
    })
    .catch(err=>rejects(err))
})

export const addCategories = (data) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: WAIT_CATEGORIES
    })
    createCategories(data).then(r=>{
        dispatch({
            type : ADD_CATEGORIES
        })
        dispatch(refeshCategories())
        resolve(r)
    })
    .catch(err=>{
        dispatch({
            type : CATEGORIES_ERR
        })
        rejects(err)
    })
})

export const editCategories = (id,data) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type: WAIT_CATEGORIES
    })
    updateCategories(id,data).then(r=>{
        dispatch({
            type : ADD_CATEGORIES
        })
        dispatch(refeshCategories())
        resolve(r)
    })
    .catch(err=>{
        dispatch({
            type : CATEGORIES_ERR
        })
        rejects(err)
    })
})

export const removeCategories = (id) => dispatch => new Promise((resolve,rejects)=>{
    deleteCategories(id).then(r=>{
        dispatch(refeshCategories())
        resolve(r)
    })
    .catch(err=>{
        rejects(err)
    })
})

//not reload
const refeshCategories = () => dispatch => new Promise((resolve,rejects)=>{
    const restaurant_id = store.getState().roles.restaurant_id
    getCategories(restaurant_id).then(r=>{
        dispatch({
            type : GET_LIST_CATEGORIES,
            payload: r
        })
        resolve(r)
    })
    .catch(err=>rejects(err))
})
