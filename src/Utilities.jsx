import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

const Utilities = () => {
    return (
        <Row className="mt-4 mx-md-5 justify-content-between" id="utilities">
            <Col>
                <ButtonGroup role="group">
                    <Button variant="outline-secondary" className="rounded-0 rounded-top border-0" title="Undo">
                        <i className="bi-arrow-counterclockwise"></i>
                    </Button>
                    <Button variant="outline-secondary" className="rounded-0 rounded-top border-0" title="Redo">
                        <i className="bi-arrow-clockwise"></i>
                    </Button>
                </ButtonGroup>
            </Col>
            <Col className="text-end">
                <ButtonGroup role="group">
                    <Button variant="outline-secondary" className="rounded-0 rounded-top border-0" title="Zoom in">
                        <i className="bi-zoom-in"></i>
                    </Button>
                    <Button variant="outline-secondary" className="rounded-0 rounded-top border-0" title="Zoom out">
                        <i className="bi-zoom-out"></i>
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    );
}

export default Utilities;
