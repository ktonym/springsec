import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
//import {Message} from "semantic-ui-react";
import { allClientsSelector } from "../../reducers/clients";
import AddClientCtA from "../ctas/AddClientCtA";

class DashBoard extends Component{
    render(){
        const {clients} = this.props;
        return (
            <div>
                { clients.length === 0 && <AddClientCtA/> }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    clients: allClientsSelector(state)
});

DashBoard.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({
            clientName: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default connect(mapStateToProps)(DashBoard);