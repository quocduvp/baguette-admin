import { AUTH_LOGINING, AUTH_SIGN_IN, AUTH_LOGIN_ERR } from "../actions/actions_type";

const initialState = {
    logining : false,
    err : false,
    auth: null
}

export const auth = (state = initialState,actions) => {
    switch(actions.type){
        case AUTH_SIGN_IN:
            return {
                ...state, 
                auth : actions.payload, logining : false,
                err : false
            }
        case AUTH_LOGINING:
            return {
                ...state,
                logining : true,
                err : false,
            }
        case AUTH_LOGIN_ERR: 
            return {
                ...state,
                err : true,
                logining : false
            }
        default:
            return state
    }
}