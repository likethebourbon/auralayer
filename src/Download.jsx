import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Download = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {/* <Col md={2} className="text-md-end text-center flex-nowrap"> */}
            <Button variant="secondary" data-bs-toggle="modal" data-bs-target="#download" onClick={handleShow}>
                <i className="bi-download"></i>
            </Button>
            {/* Download Modal */}
            <Modal id="download" centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title id="downloadLabel">Save Auralayer</Modal.Title>
                    <Button variant="close" data-bs-dismiss="modal" aria-label="Close"></Button>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" href="#">Image (PNG)</Button>
                    <Button variant="primary" href="#">Data file (JSON)</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-bs-dismiss="modal">Close</Button>
                </Modal.Footer>
            </Modal>


            {/* </Col> */}
        </>
    );
}


export default Download;