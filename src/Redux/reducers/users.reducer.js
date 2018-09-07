import { FETCH_START, GET_LIST_USERS, ADD_USERS, WAIT_USERS, USERS_ERR } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const users = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_USERS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case ADD_USERS: 
            return {...state, waitting: false,err:false}
        case WAIT_USERS:
            return {...state,waitting: true,err:false}
        case USERS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}