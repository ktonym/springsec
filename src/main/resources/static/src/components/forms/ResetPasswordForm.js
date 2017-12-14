import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button} from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends Component{

    state = {
        data: {
            token: this.props.token,
            newPassword : '',
            confirm: ''
        },
        loading: false,
        errors: {}
    };

    validate = data => {
        const errors = {};
        if(!data.newPassword) errors.newPassword = "Can't be blank";
        if(data.newPassword !== data.confirm) errors.newPassword = "The two passwords do not match";
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
            console.log(data);
            debugger;
            this.props.submit(data).catch(err =>{
                console.log(err);
                this.setState({errors: err.response.data.errors, loading: false})
            }
            );
        }
    };

    render(){
        const {data,errors,loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={!!errors.newPassword}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password" id="newPassword" name="newPassword" placeholder="Type new password"
                        value={data.newPassword}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.newPassword && <InlineError text={errors.newPassword} /> }
                <Form.Field error={!!errors.confirm}>
                    <label htmlFor="confirm">Confirm New Password</label>
                    <input
                        type="password" id="confirm" name="confirm" placeholder="Confirm new password"
                        value={data.confirm}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.confirm && <InlineError text={errors.confirm} /> }
               <Button primary>Reset</Button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
