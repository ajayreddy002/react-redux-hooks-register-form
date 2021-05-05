import UserTypes from "../types/user-types";


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case UserTypes.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case UserTypes.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case UserTypes.LOGIN_FAILURE:
            return {};
        case UserTypes.LOGOUT:
            return {};
        default:
            return state
    }
}