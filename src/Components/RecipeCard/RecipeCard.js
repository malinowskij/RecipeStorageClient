import React from 'react';
import {
    Button, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const recipeCard = (props) => {
    if (props.recipe === undefined) {
        return (
            <Col sm="3" className="my-4">
                <Card>
                    <CardImg top width="100%" height="180" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Brak przepisu</CardTitle>
                        <CardSubtitle>Brak przepisu</CardSubtitle>
                        <CardText>Brak przepisu, może Ty dodasz kolejny?</CardText>
                        <Button>Przejdź</Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }

    var mainImage = "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    if (props.recipe.Images[0] !== undefined) 
        mainImage = props.recipe.Images[0].URI;

    return (
        <Col sm="3" className="my-4">
            <Card>
                <CardImg top width="100%" height="180" src={mainImage} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.recipe.Name}</CardTitle>
                    <CardSubtitle>{props.recipe.CreatedDate}</CardSubtitle>
                    <CardText>{props.recipe.Description.length > 30 ? props.recipe.Description.substring(0, 60) + "..." : props.recipe.Description}</CardText>
                    <Link to={"/recipe/" + props.recipe.ID}>
                        <Button>Przejdź</Button>
                    </Link>
                </CardBody>
            </Card>
        </Col>
    );
}

export default recipeCard;
