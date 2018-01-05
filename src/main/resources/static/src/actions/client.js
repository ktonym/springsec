import * as types from "../types";
import api from "../api";
import {normalize} from "normalizr";
import { clientSchema } from "../schemas";

export const createClient = (data) => dispatch =>
    api.client.create(data).then(client => {
        if(client.success){
            dispatch(clientCreated(normalize(client, clientSchema )))
        } else{
            dispatch(clientFailed(client.msg))
        }
    });

const clientCreated = (data) => ({
    type: types.CLIENT_ADDED,
    data
});

const clientFailed = (msg) => ({
    type: types.CLIENT_FAILED,
    msg
});

// normalized form will be
// data.entities.clients
const clientsFetched = (data) => ({
    type: types.CLIENTS_FETCHED,
    data
});

export const searchClient = (query) => dispatch =>
    api.client.search(query).then(results => {
        console.log(results);
        //need to iterate through the result set here..
    });

export const fetchClients = dispatch =>
    api.client.getAll().then(clients => dispatch(clientsFetched( normalize(clients, [clientSchema]))));