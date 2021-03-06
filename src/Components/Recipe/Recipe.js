import React, { Component } from 'react';
import {
  Container, Row, Col, Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import Rating from '../Rating/Rating';
import CommentForm from '../Comment/CommentForm/CommentForm';
import CommentList from '../Comment/CommentList/CommentList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import Redirect from 'react-router-dom/Redirect';


class Recipe extends Component {
  state = {
    recipe: null,
    rating: null,
    comments: null,
    redirect: false
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

  deleteDialog = () => {
    swal({
      title: 'Jestes pewny?',
      text: "Nie będziesz mógl tego cofnąć!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tak, usuń!'
    }).then((result) => {
      if (result.value) {
        this.deleteRecipe();
      }
    })
  }

  deleteRecipe = () => {
    const bearer = "Bearer " + localStorage.getItem('token');
    axios.delete("http://localhost:54893/api/Recipes/" + this.state.recipe.ID, {
      headers: {
        "Authorization": bearer
      }
    }).then(response => {
      swal({
        title: 'Usunieto!',
        text: 'Twój przepis zostal usunięty!',
        type: 'success'
      }).then(result => {
        console.log("zmiana")
        this.setState({ redirect: true });
      })
    }).catch(err => console.log(err));
  }

  render() {
    if (this.state.redirect) 
      return <Redirect to="/" />

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

    var controlPanel = null;
    if (localStorage.getItem("userName") === this.state.recipe.ApplicationUser.UserName) {
      controlPanel = (
        <Row>
          <Col md="2">
            <Link className="btn btn-warning" to={"/recipe/edit/" + this.state.recipe.ID}>Edytuj</Link>
          </Col>
          <Col md="2">
            <Button color="danger" onClick={this.deleteDialog}>Usuń</Button>
          </Col>
        </Row>
      );
    }

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
            {controlPanel}
          </Col>
        </Row>
        <CommentForm recipeID={this.state.recipe.ID} loadComments={this.loadComments} />
        <CommentList comments={this.state.comments} />
      </Container>
    );
  }
}

export default Recipe;
