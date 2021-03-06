import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Route} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createStore,applyMiddleware } from "redux";
//import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import decode from "jwt-decode";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import {userLoggedIn} from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
// import rootSaga from "./sagas";


//creates the saga middleware
//const sagaMiddleware = createSagaMiddleware();
//mount it on the store
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))//was sagaMiddleware instead of thunk
);

if(localStorage.rhinoJWT){
    const payload = decode(localStorage.rhinoJWT);
    console.log(payload);
    /*const user = { access_token: localStorage.rhinoJWT.access_token,
        email: localStorage.rhinoJWT.email,
        expires_in: localStorage.rhinoJWT.expires_in };*/
    const user = JSON.parse(localStorage.getItem('rhinoJWT'));
    //const user = localStorage.rhinoJWT; // need email in state.user, not just access_token
    setAuthorizationHeader(user.access_token);
    store.dispatch(userLoggedIn(user));
}
// disabled run the saga
// sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App}/>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root"));
registerServiceWorker();


