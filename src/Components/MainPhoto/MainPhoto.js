import React from 'react';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainLogo from '../../img/main-photo.jpg'

const mainPhoto = () => {
    return (
        <div>
            <Row>
                <Col lg="12">
                    <img src={mainLogo} className="img-fluid"/>
                </Col>
            </Row>
        </div>
    );
}

export default mainPhoto;
