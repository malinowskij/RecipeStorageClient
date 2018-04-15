import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container, Row, Col, Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import axios from 'axios';

class RecipeForm extends Component {
    state = {
        showStepOne: true,
        dataFromStepOne: {
            Name: '',
            Description: '',
            PreparationTimeInMinutes: '',
            CookTimeInMinutes: '',
            RecipeCategoryID: ''
        },
        showStepTwo: false,
        dataFromStepTwo: '',
        showStepThree: false,
        dataFromStepThree: '',
        sendRequest: false,
        dataFromStepFour: '',
        showStepFour: false,
        RecipeIngredients: [],
        RecipeSteps: [],
        Images: []
    }

    updateDataStepOne = (toUpdate) => {
        this.setState({
            dataFromStepOne: toUpdate,
            showStepTwo: true,
            showStepOne: false
        });
    }

    updateDataStepTwo = (toUpdate, reverse) => {
        this.setState({
            dataFromStepTwo: toUpdate,
            showStepOne: reverse ? true : false,
            showStepThree: reverse ? false : true,
            showStepTwo: false
        });
    }

    updateDataStepThree = (toUpdate, reverse) => {
        this.setState({
            dataFromStepThree: toUpdate,
            showStepTwo: reverse ? true : false,
            showStepThree: false,
            showStepFour: reverse ? false : true,
        })
    }

    updateDataStepFour = (toUpdate, reverse) => {
        if (reverse) {
            this.setState({
                dataFromStepFour: toUpdate,
                showStepThree: reverse ? true : false,
                showStepFour: false,
                sendRequest: reverse ? false : true
            });
        } else {
            this.setState({
                dataFromStepFour: toUpdate,
                showStepThree: reverse ? true : false,
                showStepFour: false,
                sendRequest: reverse ? false : true
            }, this.send);
        }
    }

    send = () => {
        const bearer = "Bearer " + localStorage.getItem('token');

        axios.post("http://localhost:54893/api/Recipes", this.state.dataFromStepOne,
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then(response => {
                const NewRecipeID = response.data.ID;
                this.state.dataFromStepTwo.map(ing => {
                    var data = {
                        RecipeID: NewRecipeID,
                        IngredientID: ing.IngredientID,
                        MeasureID: ing.MeasureID,
                        Amount: ing.Amount
                    };

                    axios.post("http://localhost:54893/api/RecipeIngredients", data,
                        {
                            headers: {
                                "Authorization": bearer
                            }
                        })
                        .then(response => {
                        }).catch(err => console.log(err));
                });

                this.state.dataFromStepThree.map((step, index) => {
                    var data = {
                        RecipeID: NewRecipeID,
                        Instruction: step,
                        No: index
                    }

                    axios.post("http://localhost:54893/api/RecipeSteps", data, {
                        headers: {
                            "Authorization": bearer
                        }
                    })
                        .then(response => {
                        }).catch(err => console.log(err));
                });

                this.state.dataFromStepFour.map(image => {
                    let form = new FormData();
                    form.append('file', image.details);
                    form.append('ClientDocs', 'ClientDocs');

                    axios.post('http://localhost:54893/api/DocumentUpload/MediaUpload', form, {
                        headers: {
                            "Authorization": bearer
                        }
                    })
                        .then((response) => {
                            var data = {
                                RecipeID: NewRecipeID,
                                URI: response.data
                            }

                            axios.post("http://localhost:54893/api/Images", data, {
                                headers: {
                                    "Authorization": bearer
                                }
                            })
                                .then(response => {
                                    console.log(response.data);
                                }).catch(err => console.log(err));
                        });

                }).catch((ex) => {
                    console.log(ex);
                });
            }).catch(err => console.log(err));
    }

    render() {
        if (!localStorage.getItem('isLogged'))
            return <Redirect to="/login" />

        var step = null;
        if (this.state.showStepOne)
            step = <StepOne updateData={this.updateDataStepOne} formData={this.state.dataFromStepOne} />
        else if (this.state.showStepTwo)
            step = <StepTwo updateData={this.updateDataStepTwo} formData={this.state.dataFromStepTwo} />
        else if (this.state.showStepThree)
            step = <StepThree updateData={this.updateDataStepThree} formData={this.state.dataFromStepThree} />
        else if (this.state.showStepFour)
            step = <StepFour updateData={this.updateDataStepFour} formData={this.state.dataFromStepFour} />
        //  else if (this.state.sendRequest)
        //     step = <Alert color="Green">Przepis gotowy</Alert>

        console.log(this.state.dataFromStepFour);
        return (
            <Container>
                <Row>
                    <Col style={{ marginTop: "25px" }} md={{ size: '10', offset: 1 }}>
                        {step}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RecipeForm;