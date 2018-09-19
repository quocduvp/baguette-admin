import {GET_LIST_FOODS, FETCH_START, WAIT_FOODS, FOODS_ERR, ADD_FOODS} from "./actions_type";
import {createFoods, deleteFoods, editFoods, fetchListFoods} from "../../utils";
import {store} from "../store";

export const getListFoods = (restaurant_id) => dispatch => new Promise((resolve,rejects)=>{
      dispatch({
        type: FETCH_START
      })
      fetchListFoods(restaurant_id)
      .then(r=>{
        dispatch({
          type : GET_LIST_FOODS,
          payload: r
        })
        resolve(r)
      }).catch(err=>rejects(err))
})

export const updateFoods = (data,{id}) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
      type: WAIT_FOODS
    })
    editFoods(data,{id})
    .then(r=>{
      dispatch({
        type: ADD_FOODS
      })
      dispatch(refeshFoods())
      resolve(r)
    }).catch(err=> {
      dispatch({
        type: FOODS_ERR
      })
      rejects(err)
    })
})

//add food
export const addFoods = (data) => dispatch => new Promise((resolve,rejects)=>{
  dispatch({
    type: WAIT_FOODS
  })
  createFoods(data)
    .then(async r=>{
      await dispatch({
        type: ADD_FOODS
      })
      resolve(r)
      await dispatch(refeshFoods())
    }).catch(err=>{
      dispatch({
        type: FOODS_ERR
      })
    })
})

//delete
export const removeFoods = (id) => dispatch => new Promise((resolve,rejects)=>{
  deleteFoods({id}).then(r=>{
    dispatch(refeshFoods())
    resolve(r)
  }).catch(err=>rejects(err))
})

//refesh foods
const refeshFoods = () => {
  return async dispatch => {
    try{
      const {restaurant_id} = store.getState().roles
      const data = await fetchListFoods(restaurant_id)
      await dispatch({
        type : GET_LIST_FOODS,
        payload: data
      })
    }catch(e){
      throw new Error(e)
    }
  }
}
