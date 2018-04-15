import React, { Component } from 'react';
import {
    Container, Row, Col, Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2'

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
    }

    handleImageClick = URI => {
        swal({
            imageUrl: URI,
            imageHeight: 300,
            imageAlt: 'Obrazek z galerii'
        })
    }

    render() {
        const images = this.props.images.map(image => {
            return (<Col sm="2">
                <img src={image.URI} onClick={() => this.handleImageClick(image.URI)}
                    className="img-thumbnail img-fluid" style={{ maxHeight: "150px", cursor: "pointer" }} alt="gallery img" />
            </Col>);
        });

        return (

            <div className="mt-4">
                <h5>Więcej zdjęć: </h5>
                <Row>
                    {images}
                </Row>
            </div>
        );
    }
}

export default PhotoGallery;