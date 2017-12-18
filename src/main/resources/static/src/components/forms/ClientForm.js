import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button,Message} from "semantic-ui-react";
import InlineError from "../messages/InlineError";


class ClientForm extends Component{

    state = {
        data: {
            clientId: this.props.client.clientId,
            clientName: this.props.client.clientName,
            pin: this.props.client.pin,
            joinDate: this.props.client.joinDate
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data:   { ...this.state.data,[e.target.name]: e.target.value }
    });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        const {data} = this.state;
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({ loading: true });
            
            this.props
            .submit(data)
            .catch(err =>
                this.setState({errors: err.response.data, loading: false})
            );
        }
    };

    validate = data => {
        const errors ={};
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

                <Form.Field error={!!errors.clientId}>
                    <label htmlFor="email">clientId</label>
                    <input
                        type="numberfield" id="clientId" name="clientId" placeholder="clientId"
                        value={data.clientId}
                        onChange={this.onChange}
                    />
                </Form.Field>
                <Form.Field error={!!errors.clientName}>
                    <label htmlFor="email">clientName</label>
                    <input
                        type="textfield" id="clientName" name="clientName" placeholder="clientName"
                        value={data.clientName}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.clientName && <InlineError text={errors.clientName} /> }
                <Form.Field error={!!errors.pin}>
                    <label htmlFor="email">pin</label>
                    <input
                        type="text" id="pin" name="pin" placeholder="pin"
                        value={data.pin}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.pin && <InlineError text={errors.pin} /> }
                <Form.Field error={!!errors.joinDate}>
                    <label htmlFor="email">joinDate</label>
                    <input
                        type="datefield" id="joinDate" name="joinDate" placeholder="joinDate"
                        value={data.joinDate}
                        onChange={this.onChange}
                    />
                </Form.Field>
                { errors.joinDate && <InlineError text={errors.joinDate} /> }
                <Button primary>ClientForm</Button>
            </Form>
        );
    }
}

ClientForm.propTypes = {
    submit: PropTypes.func.isRequired,
    client: PropTypes.shape({
        clientId: PropTypes.number.isRequired,
        clientName: PropTypes.string.isRequired,
        pin: PropTypes.string.isRequired,
        joinDate: PropTypes.instanceOf(Date)
    }).isRequired
};

export default ClientForm;
