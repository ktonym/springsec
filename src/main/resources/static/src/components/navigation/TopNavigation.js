import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu,Dropdown,Image } from "semantic-ui-react";
import gravatarUrl from "gravatar-url";
import * as actions from "../../actions/auth";
import { allClientsSelector } from "../../reducers/clients";

const TopNavigation = ({user, logout, hasClients}) => (
    <Menu secondary pointing>
        <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
        { hasClients && <Menu.Item as={Link} to="/clients">Clients</Menu.Item> }
        <Menu.Menu position="right">
            <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)}/>}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    hasClients: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    hasClients: allClientsSelector(state).length > 0
});

export default connect(mapStateToProps,{logout: actions.logout})(TopNavigation);