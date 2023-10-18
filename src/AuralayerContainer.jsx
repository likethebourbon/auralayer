import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const AuralayerContainer = () => {
    return (
        <Row id="auralayer-container" className="row-flex mb-4">
            <Col className="mx-md-5" id="auralayer-window">
                <div id="auralayer-placeholder"></div>
            </Col>
        </Row>
    );
}

export default AuralayerContainer;
