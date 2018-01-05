import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
//import {Message} from "semantic-ui-react";
import { allClientsSelector } from "../../reducers/clients";
import AddClientCtA from "../ctas/AddClientCtA";
import { fetchClients } from "../../actions/client";

class DashBoard extends Component{
    componentDidMount = () => this.onInit(this.props);

    onInit = (props) => props.fetchClients;
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
    }).isRequired).isRequired,
    fetchClients: PropTypes.func.isRequired
};

export default connect(mapStateToProps,{fetchClients})(DashBoard);