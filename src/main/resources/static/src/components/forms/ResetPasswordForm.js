import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button,Message} from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends Component{

    state = {
        data: {
            password : '',
            confirm: ''
        },
        loading: false,
        errors: {}
    };

    validate = data => {
        const errors = {};
        if(data.password !== data.confirm) errors.confirm = "The two passwords do not match";
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
                <Form.Field error={!!errors.password}>
                    <label htmlFor="email">password</label>
                    <input
                        type="password" id="password" name="password" placeholder="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.password && <InlineError text={errors.password} /> }
                <Form.Field error={!!errors.confirm}>
                    <label htmlFor="email">confirm</label>
                    <input
                        type="password" id="confirm" name="confirm" placeholder="confirm"
                        value={data.confirm}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.confirm && <InlineError text={errors.confirm} /> }
               <Button primary>ResetPasswordForm</Button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ResetPasswordForm;
