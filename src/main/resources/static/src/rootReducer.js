import { combineReducers } from "redux";
import user from "./reducers/user";
import clients from "./reducers/clients";

export default combineReducers({
    user, clients
});