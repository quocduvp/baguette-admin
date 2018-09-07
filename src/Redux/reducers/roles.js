import { SET_ROLES } from "../actions/actions_type";

const initialState = {
    restaurant_id : null,
    restaurant_name : null,
    role: null,
    user_id: null
}

export const roles = (state = initialState, action) => {
    switch(action.type){
        case SET_ROLES:
            const {restaurant_id,restaurant_name,role,user_id} = action.payload
            return {
                ...state, restaurant_id,restaurant_name,role,user_id
            }
        default:
            return state
    }
}