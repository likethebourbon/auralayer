import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import Download from './Download';
import Share from './Share';

const Export = () => {
    return (
        <Col md={2} className="text-md-end text-center flex-nowrap">
            <Download />
            <Share />
        </Col>
    );
}


export default Export;