import { GET_LIST_FOODS, FETCH_START, WAIT_FOODS, ADD_FOODS, FOODS_ERR } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const foods = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_FOODS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case ADD_FOODS: 
            return {...state, waitting: false,err:false}
        case WAIT_FOODS:
            return {...state,waitting: true}
        case FOODS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}