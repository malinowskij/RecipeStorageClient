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
import swal from 'sweetalert2';

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
        Images: [],
        editedID: null,
        redirect: false,
        redirectID: null
    }

    componentDidMount() {
        if (this.props.match.params.id !== undefined) {
            axios.get("http://localhost:54893/api/Recipes/" + this.props.match.params.id)
                .then(response => {
                    const stepOne = {
                        Name: response.data.Name,
                        Description: response.data.Description,
                        PreparationTimeInMinutes: response.data.PreparationTimeInMinutes,
                        CookTimeInMinutes: response.data.CookTimeInMinutes,
                        RecipeCategoryID: response.data.RecipeCategoryID
                    }

                    const stepTwo = response.data.RecipeIngredients.map(ing => {
                        return {
                            IngredientID: ing.IngredientID,
                            MeasureID: ing.MeasureID,
                            IngredientName: ing.Ingredient.Name,
                            MeasureName: ing.Measure.Type,
                            Amount: ing.Amount
                        }
                    });

                    const stepThree = response.data.RecipeSteps.map(s => {
                        return s.Instruction;
                    });

                    this.setState({
                        editedID: this.props.match.params.id,
                        dataFromStepOne: stepOne,
                        dataFromStepTwo: stepTwo,
                        dataFromStepThree: stepThree
                    });
                    console.log(response.data)
                })
        }
    }

    updateDataStepOne = (toUpdate) => {
        this.setState({
            dataFromStepOne: toUpdate,
            showStepTwo: true,
            showStepOne: false
        }, console.log(this.state.dataFromStepOne));
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
        if (this.state.editedID !== null) {
            this.setState({
                dataFromStepThree: toUpdate,
                showStepTwo: reverse ? true : false,
                showStepThree: false,
                sendRequest: reverse ? false : true
            }, this.update);
        } else {
            this.setState({
                dataFromStepThree: toUpdate,
                showStepTwo: reverse ? true : false,
                showStepThree: false,
                showStepFour: reverse ? false : true,
            })
        }
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

    update = () => {
        const bearer = "Bearer " + localStorage.getItem('token');
        const deleteIngr = "http://localhost:54893/api/RecipeIngredients/Recipe/" + this.state.editedID;
        const deleteSteps = "http://localhost:54893/api/RecipeSteps/Recipe/" + this.state.editedID;
        const putRecipe = "http://localhost:54893/api/Recipes/" + this.state.editedID;

        axios.delete(deleteIngr, {
            headers: {
                "Authorization": bearer
            }
        }).then(response => { }).catch(err => console.log(err));

        axios.delete(deleteSteps, {
            headers: {
                "Authorization": bearer
            }
        }).then(response => { }).catch(err => console.log(err));

        const data = {
            ID: this.state.editedID,
            Name: this.state.dataFromStepOne.Name,
            Description: this.state.dataFromStepOne.Description,
            PreparationTimeInMinutes: this.state.dataFromStepOne.PreparationTimeInMinutes,
            CookTimeInMinutes: this.state.dataFromStepOne.CookTimeInMinutes,
            RecipeCategoryID: this.state.dataFromStepOne.RecipeCategoryID
        }

        axios.put(putRecipe, data, {
            headers: {
                "Authorization": bearer
            }
        }).then(response => { }).catch(err => console.log(err));

        this.postIngredients(this.state.editedID, bearer);
        this.postSteps(this.state.editedID, bearer);

        swal({
            title: 'Zaktualizowano przepis!',
            text: 'Twój przepis zostal zaktualizowany!',
            type: 'success'
        }).then(result => {
            this.setState({ redirect: true, redirectID: this.state.editedID });
        })
    }

    send = () => {
        const bearer = "Bearer " + localStorage.getItem('token');

        var NewRecipeID = 1;
        axios.post("http://localhost:54893/api/Recipes", this.state.dataFromStepOne,
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then(response => {
                NewRecipeID = response.data.ID;
                this.postIngredients(NewRecipeID, bearer);
                this.postSteps(NewRecipeID, bearer);
                this.postImages(NewRecipeID, bearer);
            }).catch(err => console.log(err));

            swal({
                title: 'Dodano nowy przepis!',
                text: 'Twój nowy przepis znajduje się już na stronie!',
                type: 'success'
            }).then(result => {
                this.setState({ redirect: true, redirectID: NewRecipeID });
            })
    }

    postIngredients = (NewRecipeID, bearer) => {
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
    }

    postSteps = (NewRecipeID, bearer) => {
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
    }

    postImages = (NewRecipeID, bearer) => {
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
                        }).catch(err => console.log(err));
                });
        }).catch((ex) => {
            console.log(ex);
        });
    }

    render() {
        if (!localStorage.getItem('isLogged'))
            return <Redirect to="/login" />

        if (this.state.redirect)
            return <Redirect to={"/recipe/" + this.state.redirectID} />

        var step = null;
        if (this.state.showStepOne)
            step = <StepOne updateData={this.updateDataStepOne} formData={this.state.dataFromStepOne} />
        else if (this.state.showStepTwo)
            step = <StepTwo updateData={this.updateDataStepTwo} formData={this.state.dataFromStepTwo} />
        else if (this.state.showStepThree)
            step = <StepThree updateData={this.updateDataStepThree} edit={this.state.editedID} formData={this.state.dataFromStepThree} />
        else if (this.state.showStepFour && this.state.editedID === null)
            step = <StepFour updateData={this.updateDataStepFour} formData={this.state.dataFromStepFour} />

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