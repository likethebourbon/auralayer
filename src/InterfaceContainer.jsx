import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Row } from 'react-bootstrap';
import EditLayers from './EditLayers';
import Export from './Export';
import NewLayer from './NewLayer';


const InterfaceContainer = () => {
    return (
        <Row className="justify-content-md-around align-items-center m-4 g-2" id="interface-container">
            <NewLayer />
            <EditLayers />
            <Export />
        </Row>
    );
}


export default InterfaceContainer;
