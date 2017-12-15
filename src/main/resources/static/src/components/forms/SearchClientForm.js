import React, {Component} from 'react';
import { Form, Dropdown } from "semantic-ui-react";

class SearchClientForm extends Component{
    state = {
        query: '',
        loading: false,
        options: [],
        clients: {}
    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    }
    
    fetchOptions = () => {
        if(!this.state.query) return;
        this.setState({ loading: true});
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
                />
            </Form>
        );
    }
}

export default SearchClientForm;