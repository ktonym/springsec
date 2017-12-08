import React,{Component} from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { loginReq } from "../../actions/auth";

const mapDispatchToProps = (dispatch) => ({
	login: (data) => dispatch(loginReq(data))
});

class LoginPage extends Component{

	//upon successful login redirect to the homepage (/)
	submit = data => this.props.login(data).then(() => this.props.history.push("/dashboard"));
    //soumettre = data => this.props.login(data);
	/*submit = data => {
		const { login } = this.props;
		//dispatch({type: "USER_LOGIN_REQUESTED", credentials: {data}});
		login(data);
	};*/

    render(){
        return (
			<div>
				<h1>Login page</h1>
				<LoginForm submit={this.submit}/>
				<Link to="/forgot_password">Forgot Password?</Link>
			</div>
        );
    }
}

LoginPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default withRouter(connect(null,mapDispatchToProps)(LoginPage));
