import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

const Share = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="secondary" data-bs-toggle="modal" data-bs-target="#share" onClick={handleShow}>
                <i className="bi-share-fill"></i>
            </Button>
            {/* Share Modal */}
            <Modal id="share" centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title id="shareLabel">Share Auralayer</Modal.Title>
                    <Button variant="close" data-bs-dismiss="modal" aria-label="Close"></Button>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" readOnly value="[unique URL]" aria-label="URL" />
                        <InputGroup>
                            <Button variant="outline-secondary"><i className="bi-clipboard"></i> Copy</Button>
                        </InputGroup>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-bs-dismiss="modal">Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Share;