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
import RecipeSortComponent from './RecipeSortComponent/RecipeSortComponent';

class RecipeCatalog extends Component {
    state = {
        categories: null,
        recipes: null,
        categoryID: "all",
        toggleSearchForm: false,
        searchParam: "",
        sortParam: "CreatedDate"
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

    handleSortParamChange = event => {
        this.setState({ sortParam: event.target.value }, this.fetchRecipesAgain);
    }

    handleChangeRecipeCategory = id => {
        this.setState({ categoryID: id }, this.fetchRecipesAgain)
    }

    toggleSearchForm = () => {
        this.setState({ toggleSearchForm: !this.state.toggleSearchForm })
    }

    searchSubmit = event => {
        event.preventDefault();
        this.fetchRecipesAgain();
    }

    fetchRecipesAgain = () => {
        const url = "http://localhost:54893/api/Recipes?search=" + this.state.searchParam + "&sort=" 
            + this.state.sortParam + "&category=" + this.state.categoryID; 
        axios.get(url)
            .then(response => {
                this.setState({ recipes: response.data });
            }).catch(err => console.log(err));
    }

    handleChangeParam = event => {
        this.setState({ searchParam: event.target.value })
    }

    render() {
        var recipe = "czekaj...";
        if (this.state.recipes !== null)
            recipe = this.state.recipes.map(recipe => {
                return <RecipeThumb recipe={recipe} />
            });

        var categoryName = "Przepisy z kategorii: Wszystkie";
        if (this.state.categoryID !== "all")
            categoryName = "Przepisy z kategorii: " +
                this.state.categories.find(c => c.RecipeCategory.ID === this.state.categoryID).RecipeCategory.Name;


        return (
            <Container fluid>
                <Row className="mt-4">
                    <Col md={{ size: 11, offset: 0 }}>
                        <h2>{categoryName}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md="10">
                        <RecipeSearchForm
                            collapse={this.state.toggleSearchForm}
                            toggle={this.toggleSearchForm}
                            searchSubmit={this.searchSubmit}
                            handleChangeParam={this.handleChangeParam}
                            searchParam={this.state.searchParam}
                        />
                    </Col>
                    <Col md="2">
                        <RecipeSortComponent
                            sortParam={this.state.sortParam}
                            handleSortParamChange={this.handleSortParamChange}
                        />
                    </Col>
                </Row>
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