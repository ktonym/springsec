import * as types from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
    type: types.USER_LOGIN_SUCCEEDED,
    user
});

export const userLoggedOut = () => ({
    type: types.USER_LOGOUT
});

// export const loginRequest = (credentials) => ({
//     type: types.USER_LOGIN_REQUESTED,
//     credentials
// });

//function that returns another function

export const loginReq = (credentials) => dispatch =>
    api.user.login(credentials).then(user =>
    {
        localStorage.setItem('rhinoJWT',JSON.stringify(user)); //removed user.access_token
        setAuthorizationHeader(user.access_token);
        dispatch(userLoggedIn(user));
    });

export const logout = () => dispatch => {
    localStorage.removeItem("rhinoJWT");
    setAuthorizationHeader();
    dispatch(userLoggedOut());
};

export const resetPasswordRequest = (data) => dispatch =>
    api.user.resetPasswordRequest(data);

export const validateToken = (token) => () =>
    api.user.validateToken(token);

export const changePassword = (data) => dispatch =>
    api.user.changePassword(data);
