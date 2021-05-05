import { history } from "../../utils/history";
import { ApiMethods } from "../../_services/user-services";
import UserTypes from "../types/user-types";
import { alertActions } from "./alert-actions";
export const UserActions = {
    getAll,
    login,
    register,
    logout
}

function login(endPoint, payLoad, from) {
    return dispatch => {
        dispatch(request(payLoad.username ));

        ApiMethods.login(endPoint, payLoad)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: UserTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: UserTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: UserTypes.LOGIN_FAILURE, error } }
}
function logout() {
    localStorage.clear();
    return { type: UserTypes.LOGOUT };
}

function register(endPoint, user) {
    return dispatch => {
        dispatch(request(user));

        ApiMethods.register(endPoint, user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: UserTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: UserTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: UserTypes.REGISTER_FAILURE, error } }
}

function getAll(url) {
    return dispatch => {
        dispatch(request());

        ApiMethods.getAllUsers(url)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: UserTypes.GETALL_REQUEST } }
    function success(users) { return { type: UserTypes.GETALL_SUCCESS, users } }
    function failure(error) { return { type: UserTypes.GETALL_FAILURE, error } }
}