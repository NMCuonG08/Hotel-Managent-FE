import React from 'react'
import { Modal } from 'react-bootstrap'
import RoomCarousel from '../RoomCarousel'
import RoomInformation from './RoomInformation'

export const RoomConvenient = ({room , show, onClose }) => {

  return (
    <div>
        <Modal show={show} onHide={onClose} size='xl' >
            <Modal.Header closeButton style={{ borderBottom : 'none' }} >
                <Modal.Title>Thông tin phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '85vh', overflowY: 'auto', marginLeft: '20px' }}>
                <RoomCarousel room={room} />
                <RoomInformation room={room} />
            </Modal.Body>
        </Modal>
    </div>
  )
}
