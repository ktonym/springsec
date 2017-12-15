import * as types from "../types";
import { createSelector } from "reselect";

export default function clients(state = {}, action = {}) {
    switch (action.type){
        case types.ADD_CLIENT:
            let newClient = Object.assign({}, action.data);
            return state ? state.concat([newClient]) : [newClient];
        default:
            return state || [];
    }
}

//SELECTORS

export const clientsSelector = state => state.clients;

export const allClientsSelector = createSelector(clientsSelector,clientsHash =>
    Object.values(clientsHash)
);