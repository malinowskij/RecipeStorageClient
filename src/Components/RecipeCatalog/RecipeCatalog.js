import React, { Component } from 'react';
import {
    Container, Row, Col, Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategoriesList from './CategoriesList/CategoriesList';
import RecipeThumb from '../RecipeGrid/RecipeThumb/RecipeThumb';
import RecipeSearchForm from './RecipeSearchForm/RecipeSearchForm';

class RecipeCatalog extends Component {
    state = {
        categories: null,
        recipes: null,
        categoryID: null,
        toggleSearchForm: false
    }

    componentWillMount() {
        axios.get("http://localhost:54893/api/RecipeCategories/Count")
            .then(response => {
                this.setState({
                    categories: response.data
                });
            }).catch(err => console.log(err));

        axios.get("http://localhost:54893/api/Recipes/Last/12")
            .then(response => {
                this.setState({ recipes: response.data });
            }).catch(err => console.log(err));
    }

    handleChangeRecipeCategory = id => {
        this.setState({ categoryID: id })
        axios.get("http://localhost:54893/api/Recipes/Category/" + id)
            .then(response => {
                this.setState({ recipes: response.data });
            }).catch(err => console.log(err));
    }

    toggleSearchForm = () => {
        this.setState({ toggleSearchForm: !this.state.toggleSearchForm })
    }

    render() {
        var recipe = "czekaj...";
        if (this.state.recipes !== null)
            recipe = this.state.recipes.map(recipe => {
                return <RecipeThumb recipe={recipe} />
            });

        var categoryName = "Przepisy z kategorii: Wszystkie";
        if (this.state.categoryID !== null)
            categoryName = "Przepisy z kategorii: " +
                this.state.categories.find(c => c.RecipeCategory.ID === this.state.categoryID).RecipeCategory.Name;


        return (
            <Container fluid>
                <Row className="mt-4">
                    <Col md={{ size: 11, offset: 0 }}>
                        <h2>{categoryName}</h2>
                    </Col>
                </Row>
                <RecipeSearchForm collapse={this.state.toggleSearchForm}
                    toggle={this.toggleSearchForm} />
                <Row className="mt-4">
                    <Col md="3">
                        <CategoriesList click={this.handleChangeRecipeCategory}
                            categories={this.state.categories} />
                    </Col>
                    <Col md="9">
                        <p><strong>Przepisy:</strong></p>
                        <Row>
                            {recipe}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RecipeCatalog;