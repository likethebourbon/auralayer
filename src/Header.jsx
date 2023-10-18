import React from 'react';
import { Button, Col, Container, Form, Offcanvas, Row } from 'react-bootstrap';

function Header() {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const colorPalettes = [
        'Bright',
        'Dark',
        'Warm',
        'Cool',
        'Rainbow',
        'Rainbow (desaturated)',
        'Sunset',
        'Green–Black',
        'Pink–Blue',
        'Cornflower–White',
    ]

    return (
        <>
            <header>
                <Container fluid="xl">
                    <Row className="my-1 justify-content-stretch">
                        <Col xs={1}>
                            <Button variant="outline-secondary" border={0} onClick={handleShow}>
                                <i className="bi-gear-fill"></i>  {/* Assumes you have Bootstrap Icons included */}
                            </Button>

                        </Col>

                        <Col xs={10} className="my-4 text-center" id="page-header">
                            <h1 className="text-primary fw-light">Auralayer</h1>
                        </Col>
                    </Row>
                </Container>
            </header>
            <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Group controlId="decrescendo" className='pb-4'>
                        <Form.Label>Segment decrescendo</Form.Label>
                        <Form.Select aria-label="Segment decrescendo" defaultValue={'gradient'}>
                            <option value="gradient">Gradient</option>
                            <option value="slope">Slope</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="palette">
                        <Form.Label>Segment color palette</Form.Label>
                        <Form.Select aria-label="Color palette">
                            {colorPalettes.map((palette) => (
                                <option value={palette} key={palette}>{palette}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Header;
