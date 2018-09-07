import { SET_ROLES } from "./actions_type";

export const setRoles = ({restaurant_id,restaurant_name,role,user_id}) => {
    return async dispatch => {
        await dispatch({
            type : SET_ROLES,
            payload : {restaurant_id,restaurant_name,role,user_id}
        })
    }
}