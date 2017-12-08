import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button,Message} from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends Component{

    state = {
        data: {
            email: ''
        },
        loading: false,
        errors: {}
    };

    validate = data => {
        const errors = {};
        if(!isEmail(data.email)) errors.email = "Invalid email";
        return errors;
    };

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]:e.target.value }
    });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        const {data} = this.state;
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });
            this.props.submit(data).catch(err =>{
                this.setState({errors: err.response.data.errors, loading: false})
            }
            );
        }
    };

    render(){
        const {data,errors,loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global && <Message negative>{errors.global}</Message>}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email" id="email" name="email" placeholder="info@yourdomain.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.email && <InlineError text={errors.email} /> }
                <Button primary>Reset</Button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;