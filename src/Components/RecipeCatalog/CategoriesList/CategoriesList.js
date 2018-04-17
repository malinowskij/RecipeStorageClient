import React from 'react';
import {
    Badge, Jumbotron, ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Link from 'react-router-dom/Link';

const categoriesList = (props) => {
    var categories = "brak kategorii";
    if (props.categories !== null)
        categories = props.categories.map(cat => {
            return (
                <ListGroupItem 
                    onClick={() => props.click(cat.RecipeCategory.ID)}
                    tag="a" href="#"
                    key={cat.ID}>{cat.RecipeCategory.Name + " "}
                    <Badge pill color="info">{cat.Amount}</Badge>
                </ListGroupItem>
            );
        });

    return (
        <div>
            <p><strong>Kategorie:</strong></p>
            <ListGroup>
                {categories}
            </ListGroup>
        </div>
    );
}

export default categoriesList;