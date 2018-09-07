import {
  ADD_FOOD_OPTIONS,
  FETCH_START,
  FOOD_OPTIONS_ERR,
  GET_LIST_FOOD_OPTIONS,
  WAIT_FOOD_OPTIONS
} from "./actions_type";
import {createFoodOptions, deleteFoodOptions, editFoodOptions, fetchFoodOptions} from "../../utils";
import {store} from "../store";

export const getListFoodOptions = (restaurant_id) => {
  return async dispatch => {
    try{
      await dispatch({
        type: FETCH_START
      })
      const data = await fetchFoodOptions(restaurant_id)
      await dispatch({
        type : GET_LIST_FOOD_OPTIONS,
        payload: data
      })
    }catch(e){
      throw new Error(e)
    }
  }
}

export const updateFoodOptions = (data,id) => dispatch => new Promise((resolve,rejects)=>{
  dispatch({
    type: WAIT_FOOD_OPTIONS
  })
    editFoodOptions(data,{id})
    .then(r=>{
      dispatch({
        type: ADD_FOOD_OPTIONS
      })
      dispatch(refeshFoodOptions())
      resolve(r)
    }).catch(err=> {
    dispatch({
      type: FOOD_OPTIONS_ERR
    })
    rejects(err)
  })
})

//add food
export const addFoodOptions = (data) => dispatch => new Promise((resolve,rejects)=>{
  dispatch({
    type: WAIT_FOOD_OPTIONS
  })
  createFoodOptions(data)
    .then(async r=>{
      await dispatch({
        type: ADD_FOOD_OPTIONS
      })
      resolve(r)
      await dispatch(refeshFoodOptions())
    }).catch(err=>{
    dispatch({
      type: FOOD_OPTIONS_ERR
    })
  })
})

//delete
export const removeFoodOptions = (id) => dispatch => new Promise((resolve,rejects)=>{
  deleteFoodOptions(id).then(r=>{
    dispatch(refeshFoodOptions())
    resolve(r)
  }).catch(err=>rejects(err))
})

//refesh foods
const refeshFoodOptions = () => {
  return async dispatch => {
    try{
      const {restaurant_id} = store.getState().roles
      const data = await fetchFoodOptions(restaurant_id)
      await dispatch({
        type : GET_LIST_FOOD_OPTIONS,
        payload: data
      })
    }catch(e){
      throw new Error(e)
    }
  }
}
