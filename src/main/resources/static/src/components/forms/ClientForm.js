import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button,Message} from "semantic-ui-react";
import InlineError from "../messages/InlineError";


class ClientForm extends Component{

    state = {
        data: {
            email : ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data:   { ...this.state.data,[e.target.name]: e.target.value }
    });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        const {data} = this.state;
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });
            
            this.props
            .submit(data)
            .catch(err =>
                this.setState({errors: err.response.data, loading: false})
            );
        }
    };

    validate = data => {
        const errors ={};
        return errors;
    };

    render(){
        const {data,errors,loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.status &&
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.message}</p>
                    </Message>
                }
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        value={data.email}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.email && <InlineError text={errors.email} /> }
                <Button primary>ClientForm</Button>
            </Form>
        );
    }
}

ClientForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ClientForm;
