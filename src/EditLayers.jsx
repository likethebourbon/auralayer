import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

const EditLayers = () => {
    return (
        <Col md={4} className="text-center flex-nowrap">
            <Button variant="primary" title="Split">
                <i className="bi-layout-split"></i>
            </Button>
            <ButtonGroup role="group">
                <Button variant="primary" title="Merge left">
                    <i className="bi-box-arrow-in-left"></i>
                </Button>
                <Button variant="primary" title="Merge right">
                    <i className="bi-box-arrow-in-right"></i>
                </Button>
            </ButtonGroup>
            <Button variant="danger" title="Delete layer">
                <i className="bi-x-lg"></i>
            </Button>
        </Col>
    );
}


export default EditLayers;