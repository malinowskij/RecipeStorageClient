import React, { Component } from 'react';
import {
    Button, Breadcrumb
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRatingComponent from 'react-star-rating-component';
import swal from 'sweetalert2';
import axios from 'axios';

class Rating extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        rating: 1
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }

    onRateClick = () => {
        if (!localStorage.getItem('isLogged')) {
            swal('Aby ocenić, zaloguj się! ;)');
        } else {
            axios.post("http://localhost:54893/api/Ratings", {
                RecipeID: this.props.RecipeID,
                Value: this.state.rating
            }).then(response => {
                swal('Dziękujemy za ocenę ;)');
            }).catch(err => console.log(err));
        }
    }

    render() {
        const { rating } = this.state;

        return (
            <div style={{ fontSize: 24 }}>
                <Breadcrumb>
                    <StarRatingComponent
                        name="Przepis"
                        value={rating}
                        onStarClick={this.onStarClick}
                    />
                    <Button onClick={this.onRateClick} color="link">Oceń</Button>
                </Breadcrumb>
            </div>
        );
    }
}

export default Rating;