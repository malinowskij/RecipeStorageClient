import React from 'react';
import {
    Collapse, Button, Row, Col
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const recipeSearchForm = (props) => {
    var link = <a href="#" onClick={props.toggle}>Pokaż formularz</a>
    if (props.collapse === true)
        link = <a href="#" onClick={props.toggle}>Ukryj formularz</a>

    return (
        <Row>
            <Col md="12">
                {link}
                <Collapse isOpen={props.collapse}>
                    <form>
                        <Row>
                            <Col md="3">
                                <input type="text" placeholder="Szukana fraza" className="form-control" />
                            </Col>
                            <Col md="3">
                                <input type="text" className="form-control" />
                            </Col>
                            <Col md="3">
                                <input type="submit" className="btn btn-primary" value="Szukaj"/>
                            </Col>
                        </Row>
                    </form>
                </Collapse>
            </Col>
        </Row>
    );
}

export default recipeSearchForm;