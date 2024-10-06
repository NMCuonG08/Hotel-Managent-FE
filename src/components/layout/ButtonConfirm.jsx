import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ButtonConfirm = ({ title, message, onConfirm, onCancel, children, show, onClose }) => {
  return (
    <>
     
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ButtonConfirm;
