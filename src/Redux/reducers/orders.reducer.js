import { GET_LIST_ORDERS, FETCH_START, WAIT_ORDERS, ORDERS_ERR } from "../actions/actions_type";

const initialState = {
    fetching: false,
    list: [],
    waitting: false,
    err: false
}

export const orders = (state=initialState,actions) => {
    switch(actions.type){
        case FETCH_START:
            return {...state,fetching: true}
        case GET_LIST_ORDERS:
            return {...state, list : actions.payload,fetching: false,err: false}
        case WAIT_ORDERS:
            return {...state,waitting: true}
        case ORDERS_ERR:
            return {...state,waitting:false,err:true}
        default:
            return state
    }
}
