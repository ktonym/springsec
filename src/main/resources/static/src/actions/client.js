import * as types from "../types";
import api from "../api";

export const createClient = (data) => dispatch =>
    api.client.create(data).then(client => {
        if(client.success){
            dispatch(clientCreated(client))
        } else{
            dispatch(clientFailed(client.msg))
        }
    });

export const clientCreated = (client) => ({
    type: types.CLIENT_ADDED,
    client
});

export const clientFailed = (msg) => ({
    type: types.CLIENT_FAILED,
    msg
});

export const searchClient = (query) => dispatch =>
    api.client.search(query).then(results => {
        console.log(results);
        //need to iterate through the result set here..
    });