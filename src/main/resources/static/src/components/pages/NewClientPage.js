import React, {Component} from 'react';
import { Segment } from "semantic-ui-react";
import SearchClientForm from "../forms/SearchClientForm";
import ClientForm from "../forms/ClientForm";

class NewClientPage extends Component{
    state = {
        client: null
    }

    onClientSelect = client => this.setState({client});

    addClient = () => console.log('Hi');

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

export default NewClientPage;