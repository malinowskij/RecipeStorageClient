import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Row, Col, Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert2'

class CommentForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    state = {
        showAlert: false,
        alertMsg: '',
        commentContent: '',
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.validateForm()) {
            const data = {
                Content: this.state.commentContent,
                RecipeID: this.props.recipeID
            }
            const bearer = "Bearer " + localStorage.getItem('token');

            axios.post("http://localhost:54893/api/Comments", data, {
                headers: {
                    "Authorization": bearer
                }
            }).then(response => {
                this.setState({ showAlert: true, alertMsg: "Komentarz zostal dodany!", commentContent: '' })
                this.props.loadComments();
            }).catch(err => console.log(err));
           
        } else {
            this.setState({ showAlert: true });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    validateForm() {
        if (this.state.commentContent.length < 10) {
            this.setState({ alertMsg: "Komentarz musi mieć minimum 10 znaków!" });
            return false;
        }
        return true;
    }

    render() {
        var mainContent = null;
        if (!localStorage.getItem('isLogged'))
            mainContent = <Alert color="info">Zaloguj się aby dodać komentarz!</Alert>
        else {
            mainContent = (
                <form onSubmit={this.handleSubmit}> 
                    <h5>Komentarz</h5>
                    <textarea value={this.state.commentContent} onChange={this.handleChange} className="form-control"
                                id="commentContent"></textarea>
                    <input type="submit" className="mt-2 btn btn-primary" value="Dodaj komentarz"/>
                </form>
            );
        }

        var alert = null;
        if (this.state.showAlert)
            alert = <Alert color="danger">{this.state.alertMsg}</Alert>

        return (
            <Row className="mt-4">
                <Col md="8">
                    {alert}
                    {mainContent}
                </Col>
            </Row>
        );
    }
}

export default CommentForm;