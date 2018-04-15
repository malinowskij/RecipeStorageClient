import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class StepOne extends Component {
    constructor(props) {
        super(props);

        if (this.props.formData !== undefined) {
            this.state = {
                recipeCategories: [],
                showAlert: false,
                alertMsg: '',
                redirect: false,
                name: this.props.formData.Name,
                description: this.props.formData.Description,
                preparationTime: this.props.formData.PreparationTimeInMinutes,
                cookTime: this.props.formData.CookTimeInMinutes,
                recipeCategory: this.props.formData.RecipeCategoryID,
            }
        } else {
            this.state = {
                recipeCategories: [],
                showAlert: false,
                alertMsg: '',
                redirect: false,
                name: '',
                description: '',
                preparationTime: '',
                cookTime: '',
                recipeCategory: '',
            }
        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:54893/api/RecipeCategories")
            .then(response => {
                this.setState({ recipeCategories: response.data });
            }).catch(err => console.log(err));
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.validateForm()) {
            const details = {
                Name: this.state.name,
                Description: this.state.description,
                PreparationTimeInMinutes: this.state.preparationTime,
                CookTimeInMinutes: this.state.cookTime,
                RecipeCategoryID: this.state.recipeCategory
            }
            this.props.updateData(details);
        } else {
            this.setState({ showAlert: true });
        }
    }

    validateForm() {
        if (this.state.name.length === 0 || this.state.description.length === 0) {
            this.setState({ alertMsg: "Uzupelnij pola Nazwa oraz Opis" });
            return false;
        }

        if (this.state.preparationTime.length === 0 || this.state.cookTime.length === 0) {
            this.setState({ alertMsg: "Uzupelnij czas przygotowania oraz czas gotowania" });
            return false;
        }

        if (this.state.recipeCategory === "") {
            this.setState({ alertMsg: "Wybierz kategorie przepisu " });
            return false;
        }

        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        var alert = null;
        if (this.state.showAlert)
            alert = <Alert color="danger">{this.state.alertMsg}</Alert>

        const categorySelect = this.state.recipeCategories.map(el => <option value={el.ID}>{el.Name}</option>)

        return (
            <div>
                <h2>Nowy przepis!</h2>
                {alert}
                <form onSubmit={this.handleSubmit}>
                    Nazwa dania:
                        <input type="text" value={this.state.name} onChange={this.handleChange}
                        id="name" className="form-control" />
                    Opis:
                        <textarea value={this.state.description} onChange={this.handleChange}
                        id="description" className="form-control" />
                    Czas przygotownia w minutach:
                        <input type="number" value={this.state.preparationTime} onChange={this.handleChange}
                        id="preparationTime" className="form-control" />
                    Czas gotowania:
                        <input type="number" value={this.state.cookTime} onChange={this.handleChange}
                        id="cookTime" className="form-control" />
                    Kategoria dania:
                        <select id="recipeCategory" value={this.state.recipeCategory} className="form-control"
                        onChange={this.handleChange}>
                        {categorySelect}
                    </select>
                    <br />
                    <input type="submit" value="Następny krok" className="btn btn-block btn-primary" />
                </form>
            </div>
        );
    }
}

export default StepOne;