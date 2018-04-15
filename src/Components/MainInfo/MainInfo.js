import React from 'react';
import {
    Button,
    Container,
    Row,
    Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const mainInfo = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col sm="12">
                        <h2 className="mt-4">Książka kucharska</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt neque tempore recusandae animi soluta quasi? Asperiores rem dolore eaque vel, porro, soluta unde debitis aliquam laboriosam. Repellat explicabo, maiores!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis optio neque consectetur consequatur magni in nisi, natus beatae quidem quam odit commodi ducimus totam eum, alias, adipisci nesciunt voluptate. Voluptatum.</p>
                        <p>
                            <Link to="/about">
                                <Button outline size="lg" color="primary">
                                    O mnie
                                </Button>
                            </Link>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default mainInfo;
