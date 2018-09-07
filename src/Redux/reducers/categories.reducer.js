import { FETCH_START, GET_LIST_CATEGORIES, ADD_CATEGORIES, WAIT_CATEGORIES, CATEGORIES_ERR, FILTER } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    details: {},
    waitting: false,
    err: false
}

export const categories = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_CATEGORIES:
            return {...state, list : actions.payload,fetching: false,err: false} 
        case FILTER:
            return {
                ...state,
                list : state.list.filter(v=>Number(v.restaurant_id) === Number(actions.payload))
                ,fetching: false,err: false
            } 
        case ADD_CATEGORIES: 
            return {...state, waitting: false,err:false}
        case WAIT_CATEGORIES:
            return {...state,waitting: true,err:false}
        case CATEGORIES_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
