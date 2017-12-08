import React,{Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import * as actions from "../../actions/auth";

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.access_token
});

/*const mapDispatchToProps = dispatch => ({
     logout: () => dispatch(userLoggedOut)
});*/

class HomePage extends Component{

    render(){
        const {isAuthenticated,logout} = this.props;
        return (
            <div>
                <h1>Home page</h1>
                { isAuthenticated ? ( <Button onClick={()=>logout()}>Logout</Button> ) : ( <Link to="/login">Login</Link> ) }
            </div>
        );
    }
}

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps,{ logout: actions.logout })(HomePage);
