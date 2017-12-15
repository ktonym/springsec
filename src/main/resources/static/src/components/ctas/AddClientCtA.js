import React from "react";
import { Link } from "react-router-dom";
import { Card,Icon } from "semantic-ui-react";

const AddClientCtA = (props) => (
    <Card centered>
        <Card.Content textAlign="center">
            <Card.Header>Add client</Card.Header>
            <Link to="/clients/new">
                <Icon name="plus circle" size="massive"/>
            </Link>
        </Card.Content>
    </Card>
);

export default AddClientCtA;