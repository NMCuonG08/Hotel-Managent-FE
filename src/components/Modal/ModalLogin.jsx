// src/Modal.js
import React, { useState } from 'react';
import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import Login from '../Login/Login';
const ModalLogin = ({ show, onClose }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <>
            <Modal show={show} onHide={onClose} size = "l">
                
                <Modal.Body closeButton>
                            <Login setLoggedIn={setLoggedIn}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalLogin;
