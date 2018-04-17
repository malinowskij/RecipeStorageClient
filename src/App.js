import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/Home/Home';
import About from './Components/About/About';
import Recipe from './Components/Recipe/Recipe';
import Auth from './Components/Auth/Auth';
import Logout from './Components/Auth/Logout';
import Register from './Components/Auth/Register';
import RecipeForm from './Components/Recipe/Form/RecipeForm';
import RecipeCatalog from './Components/RecipeCatalog/RecipeCatalog';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Auth} />
          <Route path="/Logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/catalog" component={RecipeCatalog} />
          <Route path="/catalog/:id(\d+)" component={RecipeCatalog} />
          <Route path="/recipe/add" component={RecipeForm} />
          <Route path="/recipe/:id(\d+)" component={Recipe} />
          <Route path="/recipe/edit/:id(\d+)" component={RecipeForm} />
          <div>
            Footer
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
