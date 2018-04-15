import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Alert, Row, Col, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class StepThree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertMsg: '',
            writtenSteps: this.props.formData ? this.props.formData : [],
            writtenStep: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.validateForm()) {
            this.props.updateData(this.state.writtenSteps);
        } else {
            this.setState({ showAlert: true });
        }
    }

    validateForm() {
        if (this.state.writtenSteps.length === 0) {
            this.setState({ alertMsg: "Musisz dodac conajmniej jeden krok!" });
            return false;
        }
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    removeFromWrittenSteps = index => {
        const writtenSteps = this.state.writtenSteps.filter((step, inx) => index !== inx);
        this.setState({ writtenSteps: writtenSteps });
    }

    addToWrittenSteps = () => {
        if (this.state.writtenStep !== '' && this.state.writtenStep !== undefined) {
            var writtenSteps = this.state.writtenSteps.slice();
            writtenSteps.push(this.state.writtenStep);

            this.setState({
                showAlert: false,
                writtenSteps: writtenSteps,
                writtenStep: ''
            });
        } else {
            this.setState({ alertMsg: "Uzupelnij pole tekstowe", showAlert: true });
        }
    }

    render() {
        var alert = null;
        if (this.state.showAlert)
            alert = <Alert color="danger">{this.state.alertMsg}</Alert>

        const writtenSteps = this.state.writtenSteps.map((step, index) => {
            return (<ListGroupItem className="justify-content-between" key={index}>
                {step}
                <Button
                    onClick={() => this.removeFromWrittenSteps(index)}
                    color="danger" className="float-right">-</Button>
            </ListGroupItem>);
        })

        return (
            <div>
                <h2>Zdefiniuj kroki!</h2>
                {alert}
                <form onSubmit={this.handleSubmit}>
                    <h5>Kroki postępowania w przepisie: </h5>
                    <Row>
                        <Col md="10">
                            <ListGroup>
                                {writtenSteps}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col sm="10">
                            <textarea value={this.state.writtenStep} onChange={this.handleChange} className="form-control"
                                id="writtenStep"></textarea>
                        </Col>
                        <Col sm="2">
                            <Button onClick={this.addToWrittenSteps} color="success" block>+</Button>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md="6">
                            <Button
                                onClick={() => this.props.updateData(this.state.writtenSteps, true)}
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

export default StepThree;