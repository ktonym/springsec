import React,{Component} from "react";
import {Segment} from "semantic-ui-react";
import SearchClientForm from "../forms/SearchClientForm";

class ClientPage extends Component{

    state = {
        client: null
    };

    onClientSelect = (client) => this.setState({client});

    render(){
        return (
            <Segment>
                <h1>Client Page</h1>
                <SearchClientForm onClientSelect={this.onClientSelect}/>
            </Segment>
        );
    }
}

export default ClientPage;