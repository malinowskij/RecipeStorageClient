import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Alert, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class StepFour extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertMsg: '',
            images: this.props.formData ? this.props.formData : [],
            image: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.validateForm()) {
            this.props.updateData(this.state.images);
        } else {
            this.setState({ showAlert: true });
        }
    }

    validateForm() {
        if (this.state.images.length === 0) {
            this.setState({ alertMsg: "Musisz dodac conajmniej jedno zdjęcie!" });
            return false;
        }
        return true;
    }

    handleChange = event => {
        let reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            const data = {
                details: file,
                uri: reader.result
            }

            this.setState({
                image: data
            });
        }

        reader.readAsDataURL(file);
    }

    removeFromImages = uri => {
        const images = this.state.images.filter((image, inx) => image.uri !== uri);
        this.setState({ images: images });
    }

    testImage = (url, callback) => {
        var timeout = timeout || 5000;
        var timedOut = false, timer;
        var img = new Image();
        img.onerror = img.onabort = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback(false);
            }
        };
        img.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                callback(true);
            }
        };
        img.src = url;
        timer = setTimeout(function () {
            timedOut = true;
            callback(false);
        }, timeout);
    }

    callbackToTestImage = (value) => {
        if (value) {
            var images = this.state.images.slice();
            images.push(this.state.image);

            this.setState({
                showAlert: false,
                images: images,
                image: ''
            });
        } else {
            this.setState({ alertMsg: "Wklej link do zdjęcia!", showAlert: true });
        }
    }

    getFileExtension(filename) {
        return filename.split('.').pop();
    }

    checkFile = () => {
        const ext = this.getFileExtension(this.state.image);
        if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif')
            return true;
        return false;
    }

    addToImages = (e) => {
        if (this.state.images.length > 5) {
            this.setState({ alertMsg: "Maksymalna liczba zdjęć to 6!", showAlert: true });
        } else if (this.state.image !== '' && this.state.image !== undefined) {
            var images = this.state.images.slice();
            images.push(this.state.image);

            this.setState({
                showAlert: false,
                images: images,
                image: ''
            });
        } else {
            this.setState({ alertMsg: "Wklej link do zdjęcia!", showAlert: true });
        }
    }

    render() {
        var alert = null;
        if (this.state.showAlert)
            alert = <Alert color="danger">{this.state.alertMsg}</Alert>

        const images = this.state.images.map((image, index) => {
            return (
                <Col md="4" className="mt-4">
                    <img key={image.uri} src={image.uri} className="img-thumbnail" style={{ maxHeight: "200px", maxWidth: "200px" }} />
                    <Button
                        onClick={() => this.removeFromImages(image.uri)}
                        color="danger" className="float-right">-</Button>
                </Col>
            )
        })

        return (
            <div>
                <h2>Dodaj zdjęcia!</h2>
                {alert}
                <form onSubmit={this.handleSubmit}>
                    <h5>Musisz dodać conajmniej jedno zdjęcie, maksymalnie 6: </h5>
                    <Row>
                        <Col md="10">
                            <Row>
                                {images}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col sm="10">
                            <input type="file" onChange={this.handleChange} className="form-control"
                                id="image" name="inputFile"></input>
                        </Col>
                        <Col sm="2">
                            <Button onClick={this.addToImages} color="success" block>+</Button>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md="6">
                            <Button
                                onClick={() => this.props.updateData(this.state.images, true)}
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

export default StepFour;