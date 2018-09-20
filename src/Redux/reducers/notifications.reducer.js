import { ADD_NOTIFICATIONS, GET_LIST_NOTIFICATIONS, WAIT_NOTIFICATIONS, NOTIFICATIONS_ERR, FETCH_START } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const notifications = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case ADD_NOTIFICATIONS: 
            return {...state, waitting: false,err:false}
        case GET_LIST_NOTIFICATIONS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case WAIT_NOTIFICATIONS:
            return {...state,waitting: true}
        case NOTIFICATIONS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
