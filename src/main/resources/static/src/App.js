import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import NewClientPage from "./components/pages/NewClientPage";
import ClientPage from "./components/pages/ClientPage";
import DashBoard from "./components/pages/DashBoard";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";


class App extends React.Component{
    render(){
        const {location,isAuthenticated} = this.props;
        return (
            <div className="ui container">
                {isAuthenticated && <TopNavigation />}
                <Route location={location} path="/" exact component={HomePage}/>
                <GuestRoute location={location} path="/login" exact component={LoginPage}/>
                <GuestRoute location={location} path="/forgot_password" exact component={ForgotPassword}/>
                <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage}/>
                <UserRoute location={location} path="/dashboard" exact component={DashBoard}/>
                <UserRoute location={location} path="/clients/new" exact component={NewClientPage}/>
                <UserRoute location={location} path="/clients" exact component={ClientPage}/>
            </div>
        );
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
   isAuthenticated: !!state.user.access_token
});

export default connect(mapStateToProps)(App);
