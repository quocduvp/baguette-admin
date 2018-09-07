import { FETCH_START, GET_LIST_RESTAURANTS, ADD_RESTAURANTS, WAIT_RESTAURANTS, RESTAURANTS_ERR } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const restaurants = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_RESTAURANTS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case ADD_RESTAURANTS: 
            return {...state, waitting: false,err:false}
        case WAIT_RESTAURANTS:
            return {...state,waitting: true}
        case RESTAURANTS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
