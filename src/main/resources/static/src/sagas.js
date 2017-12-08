import { call, fork, put, takeLatest } from "redux-saga/effects";
// import { push } from "react-router-redux";
import api from "./api";

export function* watchLogin() {
    yield takeLatest("USER_LOGIN_REQUESTED",loginSaga);
}

export function* loginSaga(action) {
    try {
        const token = yield call(api.user.login,action.credentials);
        yield put({type: "USER_LOGIN_SUCCEEDED", access_token: token});
        // yield put(push("/dashboard"));
        //yield console.log(action.credentials);
    } catch(e) {
        yield put({type: "USER_LOGIN_FAILED", message:(e)});
    }
}

export default function * rootSaga () {
    yield fork(watchLogin);
    /*yield fork(logoutFlow)
    yield fork(registerFlow)*/
}
