import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import { searchClient } from "../../actions/client";
import axios from "axios";

class SearchClientForm extends Component{
    state = {
        query: '',
        loading: false,
        options: [],
        clients: {}
    };

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    };
    
    fetchOptions = () => {
        // debugger;
        if(!this.state.query) return;
        this.setState({ loading: true});
        //searchClient(this.state.query);
        axios.get(`/client/search?q=${this.state.query}`)
            .then(res=>res.data.clients)
            .then(clients => {
                const options = [];
                const clientsHash = {};
                clients.forEach(client => {
                    clientsHash[client.clientId] = client;
                    options.push({
                        key: client.clientId,
                        value: client.clientId,
                        text: client.clientName
                    })
                });
                this.setState({loading: false, options, clients: clientsHash});
            });
    };

    onChange = (e,data) => {
        console.log("Data...");
        console.log(data);
        this.setState({ query: data.value });
        this.props.onClientSelect(this.state.clients[data.value])
    }

    render(){
        return (
            <Form>
                <Dropdown search
                          fluid
                          placeholder="Search client by name"
                          value={this.state.query}
                          onSearchChange={this.onSearchChange}
                          options={this.state.options}
                          loading={this.state.loading}
                          onChange={this.onChange}
                />
            </Form>
        );
    }
}

SearchClientForm.propTypes = {
    onClientSelect: PropTypes.func.isRequired
};

export default SearchClientForm;