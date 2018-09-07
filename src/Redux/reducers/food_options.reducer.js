import {FETCH_START,GET_LIST_FOOD_OPTIONS,ADD_FOOD_OPTIONS,WAIT_FOOD_OPTIONS,FOOD_OPTIONS_ERR} from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const food_options = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_FOOD_OPTIONS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case ADD_FOOD_OPTIONS:
            return {...state, waitting: false,err:false}
        case WAIT_FOOD_OPTIONS:
            return {...state,waitting: true}
        case FOOD_OPTIONS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
