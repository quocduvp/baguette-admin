import { RESTAURANT_EMAILS_ERR,WAIT_RESTAURANT_EMAILS,FETCH_START,ADD_RESTAURANT_EMAILS,GET_LIST_RESTAURANT_EMAILS } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const restaurant_emails = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_RESTAURANT_EMAILS:
            return {...state, list : actions.payload,fetching: false,err: false}
      case ADD_RESTAURANT_EMAILS:
            return {...state, waitting: false,err:false}
        case WAIT_RESTAURANT_EMAILS:
            return {...state,waitting: true}
        case RESTAURANT_EMAILS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
