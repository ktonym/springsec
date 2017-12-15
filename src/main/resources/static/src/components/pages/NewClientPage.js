import React, {Component} from 'react';
import { Segment } from "semantic-ui-react";
import SearchClientForm from "../forms/SearchClientForm";

class NewClientPage extends Component{
    state = {
        book: null
    }

    render(){
        return (
            <Segment>
                <h3>Add new client</h3>
                <SearchClientForm/>
            </Segment>
        );
    }
}

export default NewClientPage;