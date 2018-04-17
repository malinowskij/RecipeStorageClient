import React, { Component } from 'react';
import {
    Button,
    Container, Row, Col
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import axios from 'axios';

class NewestRecipes extends Component {
    state = {
        recipes: []
    };

    componentDidMount() {
        axios
            .get("http://localhost:54893/api/Recipes/Last/4")
            .then(response => {
                const recipes = response.data;
                this.setState({ recipes });
            }).catch(error => console.log(error));
    }

    render() {
        return (
            <Container>
                <h2>Najnowsze przepisy:</h2>
                <hr />
                <Row>
                    <RecipeCard recipe={this.state.recipes[0]} />
                    <RecipeCard recipe={this.state.recipes[1]} />
                    <RecipeCard recipe={this.state.recipes[2]} />
                    <RecipeCard recipe={this.state.recipes[3]} />
                </Row>
            </Container>
        )
    }
}

export default NewestRecipes;