import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Row, Col, ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const commentList = (props) => {
    const cms = props.comments.map(comment => {
        return (<ListGroupItem>
            <Row>
                <Col md="9">
                    <p style={{ wordWrap: "break-word" }}>
                        {comment.Content}
                    </p>
                </Col>
                <Col md="3">
                    <small className="float-right">
                        {comment.ApplicationUser.FirstName + " " + comment.ApplicationUser.LastName}
                    </small> <br />
                    <small className="float-right">
                        {comment.CreatedTime}
                    </small>
                </Col>
            </Row>
        </ListGroupItem>);
    });

    return (
        <Row className="mt-4">
            <Col md="10">
                <ListGroup>
                    {cms}
                </ListGroup>
            </Col>
        </Row>
    );
}

export default commentList;