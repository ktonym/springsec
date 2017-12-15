import * as types from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type){
    case types.USER_LOGIN_SUCCEEDED:
        return action.user;
    case types.USER_LOGIN_FAILED:
        return action.message;
    case types.USER_LOGOUT:
        return {};
    default:
        return state || {};
    }
}