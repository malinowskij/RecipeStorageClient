import React, { Component } from 'react';
import {
    Container, Row, Col, Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        email: "",
        password: "",
        showAlert: false,
        alertContent: 'Haslo musi zawierac min. 6 znaków',
        redirect: false
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            const details = {
                grant_type: 'password',
                username: this.state.email,
                password: this.state.password
            }

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            axios
                .post("http://localhost:54893/Token", formBody, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('userName', response.data.userName);
                    this.setState({
                        redirect: true
                    })
                }).catch(err => {
                    this.setState({
                        showAlert: true,
                        alertContent: 'Haslo bądź email są niepoprawne'
                    })
                });
        } else {
            this.setState({
                showAlert: true
            });
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 6;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        if (this.state.redirect)
            return <Redirect to="/" />

        var alert = null;
        if (this.state.showAlert)
            alert = <Alert>{this.state.alertContent}</Alert>

        return (
            <Container>
                <Row>
                    <Col style={{ marginTop: '25px' }} sm={{ size: '4', offset: 4 }}>
                        <h2>Zaloguj się: </h2>
                        {alert}
                        <form onSubmit={this.handleSubmit}>
                            Email:
                            <input value={this.state.email} onChange={this.handleChange}
                                id="email" className="form-control" type="email" />
                            Haslo:
                            <input value={this.state.password} onChange={this.handleChange}
                                id="password" className="form-control" type="password" />
                            <br />
                            <input type="submit" value="Zaloguj" className="btn btn-primary btn-block" />
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Auth;