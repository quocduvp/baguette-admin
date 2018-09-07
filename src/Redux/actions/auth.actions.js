import { authLogin } from "../../utils";
import { AUTH_LOGINING, AUTH_SIGN_IN, AUTH_LOGIN_ERR } from "./actions_type";
import { decryptedString } from "../../encrypt.config";
import { createHashHistory } from 'history'
export const signIn = (form) => dispatch => new Promise((resolve,rejects)=>{
    dispatch({
        type : AUTH_LOGINING
    })
    authLogin(form)
    .then(r=>{
        dispatch({
            type : AUTH_SIGN_IN,
            payload : r.data
        })
        resolve(r)
    }).catch(err=>{
        dispatch({
            type : AUTH_LOGIN_ERR
        })
        rejects(err)
    })
})

//push from session
export const getAuthFromSession = () => {
    return async dispatch => {
        const authData = JSON.parse(decryptedString(sessionStorage.getItem('auth')))
        if(authData)
            dispatch({
                type : AUTH_SIGN_IN,
                payload : authData.data
            })
        else createHashHistory().push('/login')
            
    }
}