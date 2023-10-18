import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const NewLayer = () => {
    return (
        <Col md={3} className="text-md-start text-center">
            <Row className="align-items-center flex-nowrap">
                <Col xs={4}>
                    <Button variant="primary" title="Add new layer">
                        <i className="bi-plus-lg"></i>
                    </Button>
                </Col>
                <Col xs={7}>
                    <Form.Label htmlFor="presence-start">Presence (start)</Form.Label>
                    <Form.Range id="presence-start" min="0" max="4" />

                    <Form.Label htmlFor="presence-end">Presence (end)</Form.Label>
                    <Form.Range id="presence-end" min="0" max="4" />
                </Col>
                <Col xs={1} className="align-items-center">
                    <div className="link-presence text-center">
                        ┓<br />
                        <Button variant="link" size="sm" active data-bs-toggle="button" aria-pressed="true">
                            <i className="bi-link"></i>
                        </Button>
                        <br />
                        ┛
                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default NewLayer;