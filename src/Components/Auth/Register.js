import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container, Row, Col, Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Register extends Component {
    state = {
        showAlert: false,
        alertMsg: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        redirect: false
    }

    handleSubmit = event => {
        const validationMsg = ["Password", "FirstName", "LastName", "Email", "ConfirmPassword"];
        event.preventDefault();

        if (this.validateForm()) {
            const details = {
                Email: this.state.email,
                Password: this.state.password,
                ConfirmPassword: this.state.confirmPassword,
                FirstName: this.state.firstName,
                LastName: this.state.lastName
            }

            axios
                .post("http://localhost:54893/api/Account/Register", details, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                        "Access-Control-Allow-Headers": "X-Custom-Header",
                    }
                }).then(response => {
                    this.setState({
                        redirect: true
                    });
                }).catch(err => {
                    if (err.response.data.ModelState[""] !== undefined) {
                        this.setState({
                            showAlert: true,
                            alertMsg: err.response.data.ModelState[""][0]
                        });
                    } else {
                        validationMsg.forEach(msg => {
                            if (err.response.data.ModelState["model." + msg] !== undefined) {
                                this.setState({
                                    showAlert: true,
                                    alertMsg: err.response.data.ModelState["model." + msg][0]
                                });
                            }
                        });
                    }
                });

        } else {
            this.setState({ showAlert: true });
        }
    }

    validateForm() {
        if (this.state.email.length === 0) {
            this.setState({ alertMsg: "Uzupelnij pole email" });
            return false;
        }

        if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
            this.setState({ alertMsg: "Uzupelnij pola Imie i Nazwisko" });
            return false;
        }

        if (this.state.password.length === 0 || this.state.confirmPassword.length === 0) {
            this.setState({ alertMsg: "Uzupelnij pola z haslami" });
            return false;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ alertMsg: "Hasla muszą być takie same!" });
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
        if (this.state.redirect)
            return <Redirect to="/login" />

        var alert = null;
        if (this.state.showAlert)
            alert = <Alert color="danger">{this.state.alertMsg}</Alert>

        return (
            <Container>
                <Row>
                    <Col style={{ marginTop: "25px" }} md={{ size: '6', offset: 3 }}>
                        <h2>Zarejestruj się!</h2>
                        {alert}
                        <form onSubmit={this.handleSubmit}>
                            Imie:
                            <input type="text" value={this.state.firstName} onChange={this.handleChange}
                                id="firstName" className="form-control" />
                            Nazwisko:
                            <input type="text" value={this.state.lastName} onChange={this.handleChange}
                                id="lastName" className="form-control" />
                            Email:
                            <input type="email" value={this.state.email} onChange={this.handleChange}
                                id="email" className="form-control" />
                            Haslo:
                            <input type="password" value={this.state.password} onChange={this.handleChange}
                                id="password" className="form-control" />
                            Potwierdź haslo:
                            <input type="password" value={this.state.confirmPassword} onChange={this.handleChange}
                                id="confirmPassword" className="form-control" />
                            <br />
                            <input type="submit" value="Zarejestruj" className="btn btn-block btn-primary" />
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Register;