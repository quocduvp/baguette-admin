import { RESTAURANT_USERS_ERR, WAIT_RESTAURANT_USERS, ADD_RESTAURANT_USERS, GET_LIST_RESTAURANT_USERS, FETCH_START } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const restaurant_users = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_RESTAURANT_USERS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case ADD_RESTAURANT_USERS: 
            return {...state, waitting: false,err:false}
        case WAIT_RESTAURANT_USERS:
            return {...state,waitting: true}
        case RESTAURANT_USERS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
