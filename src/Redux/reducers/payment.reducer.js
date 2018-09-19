import { GET_LIST_PAYMENTS, FETCH_START, WAIT_PAYMENTS, PAYMENTS_ERR } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const payments = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_PAYMENTS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case WAIT_PAYMENTS:
            return {...state,waitting: true}
        case PAYMENTS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
