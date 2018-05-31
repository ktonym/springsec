import React,{Component} from "react";
import PropTypes from "prop-types";
import {Form,Button,Message,Segment,Grid} from "semantic-ui-react";
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

    componentWillReceiveProps(props){
        this.setState({
            data:{

                clientId: props.client.clientId,
                clientName: props.client.clientName,
                pin: props.client.pin,
                joinDate: props.client.joinDate
            }
        });
    }

    onChange = e => this.setState({
        data:   { ...this.state.data,[e.target.name]: e.target.value }
    });

    // for number fields
    /*onChangeNumber = e => this.setState({
        data:   { ...this.state.data,[e.target.name]: parseInt(e.target.value,10) }
    });*/

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
            <Segment>
                <Form onSubmit={this.onSubmit} loading={loading}>
                        {errors.status &&
                            <Message negative>
                                <Message.Header>Something went wrong</Message.Header>
                                <p>{errors.message}</p>
                            </Message>
                        }
                    <Grid columns={2} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field error={!!errors.clientId}>
                                    <label htmlFor="email">Client Id</label>
                                    <input
                                        type="number" id="clientId" name="clientId" placeholder="clientId"
                                        value={data.clientId}
                                        onChange={this.onChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field error={!!errors.clientName}>
                                    <label htmlFor="email">Name</label>
                                    <input
                                        type="text" id="clientName" name="clientName" placeholder="clientName"
                                        value={data.clientName}
                                        onChange={this.onChange}
                                    />
                                </Form.Field>
                                { errors.clientName && <InlineError text={errors.clientName} /> }
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field error={!!errors.pin}>
                                    <label htmlFor="email">PIN</label>
                                    <input
                                        type="text" id="pin" name="pin" placeholder="pin"
                                        value={data.pin}
                                        onChange={this.onChange}
                                    />
                                </Form.Field>
                                { errors.pin && <InlineError text={errors.pin} /> }
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field error={!!errors.joinDate}>
                                    <label htmlFor="email">Date Joined</label>
                                    <input
                                        type="date" id="joinDate" name="joinDate" placeholder="joinDate"
                                        value={data.joinDate}
                                        onChange={this.onChange}
                                    />
                                </Form.Field>
                                { errors.joinDate && <InlineError text={errors.joinDate} /> }
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button secondary>Cancel</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button primary>Save</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
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
