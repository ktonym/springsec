import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Message } from "semantic-ui-react";
import { validateToken } from "../../actions/auth";
import ResetPasswordForm from "../forms/ResetPasswordForm";

class ResetPasswordPage extends Component{

    state = {
        loading: true,
        success: false
    }

    componentDidMount(){
        this.props.validateToken(this.props.match.params.token)
    }

    render(){
        const { loading, success } = this.state;
        return (
            <div>
                { loading && <Message>Loading</Message> }
                { !loading && success && <ResetPasswordForm submit={this.submit}/> }
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
    validateToken: PropTypes.func.isRequired
};

export default connect(null,{validateToken})(ResetPasswordPage);
