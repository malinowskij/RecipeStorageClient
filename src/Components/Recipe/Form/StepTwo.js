import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Alert, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class StepTwo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIngredient: '',
            originalIngredients: [],
            showAlert: false,
            alertMsg: '',
            choosenIngredients: this.props.formData ? this.props.formData : [],
            measures: [],
            selectedMeasure: '',
            insertedAmount: '',
        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:54893/api/Ingredients")
            .then(response => {

                const ingredients = response.data.map(ingr => {
                    return { value: ingr.ID, label: ingr.Name }
                });

                this.setState({ originalIngredients: ingredients });
            }).catch(err => console.log(err));

        axios
            .get("http://localhost:54893/api/Measures")
            .then(response => {
                const measures = response.data.map(meas => {
                    return { value: meas.ID, label: meas.Type }
                });
                this.setState({ measures: measures });
            }).catch(err => console.log(err));
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.validateForm()) {
            this.props.updateData(this.state.choosenIngredients);
        } else {
            this.setState({ showAlert: true });
        }
    }

    validateForm() {
        if (this.state.choosenIngredients.length === 0) {
            this.setState({ alertMsg: "Musisz dodac conajmniej jeden skladnik!" });
            return false;
        }
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSelectedIngredientChange = selectedIngredient => {
        this.setState({ selectedIngredient: selectedIngredient });
    }

    handleSelectedMeasureChange = selectedMeasure => {
        this.setState({ selectedMeasure: selectedMeasure });
    }

    buildRecipeIngredientObj = () => {
        return {
            RecipeID: '',
            IngredientID: this.state.selectedIngredient.value,
            MeasureID: this.state.selectedMeasure.value,
            Amount: this.state.insertedAmount,
            IngredientName: this.state.selectedIngredient.label,
            MeasureName: this.state.selectedMeasure.label
        }
    }

    removeFromChoosenIngredients = ingredientID => {
        const choosenIngredients = this.state.choosenIngredients.filter(ingr => ingr.IngredientID !== ingredientID);
        this.setState({ choosenIngredients: choosenIngredients });
    }

    checkIfExists = () => {
        return this.state.choosenIngredients.find(ingr => ingr.IngredientID === this.state.selectedIngredient.value);
    }

    addToChoosenList = () => {
        if (this.state.selectedIngredient !== null && this.state.selectedIngredient !== ''
            && this.state.selectedMeasure !== null && this.state.selectedMeasure !== ''
            && this.state.insertedAmount !== '') {

            if (!this.checkIfExists()) {
                var tempChoosen = this.state.choosenIngredients.slice();
                const recipeIngredient = this.buildRecipeIngredientObj();
                tempChoosen.push(recipeIngredient);
                this.setState({ choosenIngredients: tempChoosen });
                if (this.state.showAlert) {
                    this.setState({ showAlert: false });
                }
            } else {
                this.setState({ showAlert: true, alertMsg: "Na swojej liscie masz juz wybrany skladnik!" });
            }
        } else {
            this.setState({ alertMsg: "Najpierw wybierz skladnik, a następnie jego ilosc! ", showAlert: true });
        }
    }

    render() {
        var alert = null;
        if (this.state.showAlert)
            alert = <Alert color="danger">{this.state.alertMsg}</Alert>

        const selectedIngredient = this.state.selectedIngredient;
        const value = selectedIngredient && selectedIngredient.value;
        const selectedMeasure = this.state.selectedMeasure;
        const mValue = selectedMeasure && selectedMeasure.value;

        const choosenIngrList = this.state.choosenIngredients.map(ingr => {
            return (<ListGroupItem className="justify-content-between"
                key={ingr.IngredientID}>
                {ingr.IngredientName + " " + ingr.Amount + " " + ingr.MeasureName}
                <Button
                    onClick={() => this.removeFromChoosenIngredients(ingr.IngredientID)}
                    color="danger" className="float-right">-</Button>
            </ListGroupItem>);
        })

        var measureNavi = null;
        if (this.state.selectedIngredient !== null && this.state.selectedIngredient !== '')
            measureNavi = (
                <Row className="mt-4">
                    <Col md="6">
                        <input id="insertedAmount"
                            placeholder="Ilosc..." type="number" className="form-control"
                            onChange={this.handleChange} />
                    </Col>

                    <Col md="6">
                        <Select
                            name="measure"
                            value={mValue}
                            onChange={this.handleSelectedMeasureChange}
                            options={this.state.measures}
                        />
                    </Col>
                </Row>
            );

        return (
            <div>
                <h2>Wybierz skladniki i ich ilosc!</h2>
                {alert}
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md="6">
                            <Select
                                name="ingredient"
                                value={value}
                                onChange={this.handleSelectedIngredientChange}
                                options={this.state.originalIngredients}
                            />

                            {measureNavi}

                            <Button onClick={this.addToChoosenList}
                                color="success" block className="mt-4">+</Button>
                        </Col>
                        <Col md="6">
                            <h5>Lista skadników:</h5>
                            <ListGroup>
                                {choosenIngrList}
                            </ListGroup>
                        </Col>
                    </Row>

                    <br />
                    <Row>
                        <Col md="6">
                            <Button
                                onClick={() => this.props.updateData(this.state.choosenIngredients, true)}
                                block>
                                Poprzedni krok
                            </Button>
                        </Col>

                        <Col md="6">
                            <input type="submit" value="Następny krok" className="btn btn-block btn-primary" />
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

export default StepTwo;