import React, { Component } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import Rating from '../Rating/Rating';
import CommentForm from '../Comment/CommentForm/CommentForm';
import CommentList from '../Comment/CommentList/CommentList';
import axios from 'axios';


class Recipe extends Component {
  state = {
    recipe: null,
    rating: null,
    comments: null,
  }

  componentDidMount() {
    const recipeId = this.props.match.params.id;

    axios
      .get("http://localhost:54893/api/Recipes/" + recipeId)
      .then(response => {
        this.setState({ recipe: response.data });
      }).catch(err => console.log(err));

    axios.get("http://localhost:54893/api/Ratings/Recipe/" + recipeId)
      .then(response => {
        this.setState({ rating: response.data.Value });
      })

    this.loadComments();
  }

  loadComments = () => {
    console.log("DUPA");
    axios.get("http://localhost:54893/api/Comments/Recipe/" + this.props.match.params.id)
      .then(response => {
        this.setState({ comments: response.data });
      })
  }

  handleImageClick = URI => {

  }

  render() {
    if (this.state.recipe === null)
      return <Container>Loading...</Container>

    const ingredients = this.state.recipe.RecipeIngredients.map(el => {
      return (
        <li key={el.Ingredient.ID}>{el.Ingredient.Name + " " + el.Amount + " " + el.Measure.Type} </li>
      );
    });

    var mainImage = "http://via.placeholder.com/800x600";
    if (this.state.recipe.Images[0] !== undefined)
      mainImage = this.state.recipe.Images[0].URI;

    const steps = this.state.recipe.RecipeSteps.map(el => <li key={el.ID}>{el.Instruction}</li>);

    var gallery = null;
    if (this.state.recipe.Images.length > 1)
      gallery = <PhotoGallery images={this.state.recipe.Images} />

    return (
      <Container>
        <Row className="mt-4">
          <Col md="5">
            <img src={mainImage} className="img-fluid" alt="" />
          </Col>
          <Col md="4">
            <h2>{this.state.recipe.Name}</h2>
            <h6>{"Kategoria: " + this.state.recipe.RecipeCategory.Name}</h6>
            <p>{this.state.recipe.Description}</p>
            <strong>Czas przygotowania: {this.state.recipe.PreparationTimeInMinutes + " min"}</strong>
            <br />
            <strong>Czas gotowania: {this.state.recipe.CookTimeInMinutes + " min"}</strong>
          </Col>
          <Col md="3">
            <Rating RecipeID={this.state.recipe.ID} />
            <span style={{ fontSize: "12px" }}>Aktualna ocena wynosi: {this.state.rating}</span>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="8">
            <h2>Przygotowanie: </h2>
            <ol>
              {steps}
            </ol>
          </Col>
          <Col md="4">
            <h2>Skladniki: </h2>
            <ul>
              {ingredients}
            </ul>
          </Col>
        </Row>
        {gallery}
        <Row>
          <Col md="6">
            <p><em>Autor: {this.state.recipe.ApplicationUser.FirstName + " " + this.state.recipe.ApplicationUser.LastName}</em></p>
          </Col>
        </Row>
        <CommentForm recipeID={this.state.recipe.ID} loadComments={this.loadComments}  />
        <CommentList comments={this.state.comments} />
      </Container>
    );
  }
}

export default Recipe;
