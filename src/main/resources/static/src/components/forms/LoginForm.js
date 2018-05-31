import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button,Message} from "semantic-ui-react";
import InlineError from "../messages/InlineError";
//import Validator from "validator";

class LoginForm extends Component{

    state = {
        data: {
            username: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data:   { ...this.state.data,[e.target.name]: e.target.value }
    });

    onSubmit = e => {
        const errors = this.validate(this.state.data);
        const {data} = this.state;
        console.info("From LoginForm");
        console.log(data);
        e.preventDefault();
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });
            this.props.submit(data).catch(err =>
                this.setState({errors: err.response.data, loading: false})
            );
        }
    };

    validate = data => {
        const errors ={};
        //if(!Validator.isEmail(data.email)) errors.username = "Invalid email";
        if(!data.username) errors.username = "Username can't be blank";
        if(!data.password) errors.password = "Password can't be blank";
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
                <Form.Field error={!!errors.username}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" id="username" name="username" placeholder="username"
                        value={data.username}
                        onChange={this.onChange}
                    />
                    {errors.username && <InlineError text={errors.username}/>}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" id="password" name="password" placeholder="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;
