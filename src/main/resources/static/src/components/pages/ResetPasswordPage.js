import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Message } from "semantic-ui-react";
import { validateToken, changePassword } from "../../actions/auth";
import ResetPasswordForm from "../forms/ResetPasswordForm";

class ResetPasswordPage extends Component{

    state = {
        loading: true,
        success: false
    };

    componentDidMount(){
        this.props.validateToken(this.props.match.params.token)
            .then(() => this.setState({loading: false, success: true}))
            .catch(() => this.setState({loading: false, success: false}))
    }

    submit = (data) => this.props.changePassword(data)
        .then(()=>this.props.history.push("/login"));

    render(){
        const { loading, success } = this.state;
        const token = this.props.match.params.token;
        return (
            <div>
                { loading && <Message>Loading</Message> }
                { !loading && success && <ResetPasswordForm token={token} submit={this.submit}/> }
                { !loading && !success && <Message>Invalid Token</Message>}
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    validateToken: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(null,{validateToken,changePassword})(ResetPasswordPage);
