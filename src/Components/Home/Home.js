import React, { Component } from 'react';
import MainInfo from '../MainInfo/MainInfo';
import MainPhoto from '../MainPhoto/MainPhoto';
import NewestRecipes from '../NewestRecipes/NewestRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <MainPhoto />
        <MainInfo />
        <NewestRecipes />
      </div>
    );
  }
}

export default Home;
