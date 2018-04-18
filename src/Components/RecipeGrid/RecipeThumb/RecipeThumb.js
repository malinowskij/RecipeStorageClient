import React, { Component } from 'react';
import {
    Col, Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const recipeThumb = (props) => {
    var recipe = "Czekaj...";
    if (props.recipe !== undefined && props.recipe.Images[0] !== undefined) {
        recipe = (
            <Link to={"/recipe/" + props.recipe.ID}>
                <Card>
                    <CardImg top width="100%" src={props.recipe.Images[0].URI} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{props.recipe.Name}</CardTitle>
                    </CardBody>
                </Card>
            </Link>
        );
    }

    return (
        <Col md="3">
            {recipe}
        </Col>
    );
}

export default recipeThumb;