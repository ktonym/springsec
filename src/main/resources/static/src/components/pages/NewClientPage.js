import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Segment } from "semantic-ui-react";
// import axios from "axios";
import SearchClientForm from "../forms/SearchClientForm";
import ClientForm from "../forms/ClientForm";
import { createClient } from "../../actions/client";

class NewClientPage extends Component{
    state = {
        client: null
    };

    onClientSelect = client => this.setState({client});

    addClient = client => this.props.createClient(client)
        .then(()=> this.props.history.push("/dashboard"));

    render(){
        return (
            <Segment>
                <h3>Add new client</h3>
                <SearchClientForm onClientSelect={this.onClientSelect}/>
                {this.state.client && <ClientForm submit={this.addClient} client={this.state.client}/>}
            </Segment>
        );
    }
}

NewClientPage.propTypes = {
    createClient: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(null,{createClient})(NewClientPage);