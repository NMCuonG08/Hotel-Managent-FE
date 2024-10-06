import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { getRoomImagesByRoomID } from '../../../../utils/APIFunctions';
import DragAndDropImage from '../../../Hotel/DragAndDropImage';
import { SlReload } from "react-icons/sl";
import { BsSubtract } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

const RoomDetail = ({ show, onClose, room }) => {
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoomImage = async () => {
      try {
        const data = await getRoomImagesByRoomID(room.id);
        setImages(data);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchRoomImage();
  }, [room.id]);

  const [newRoom, setNewRoom] = useState({
    roomType: room.roomType,
    roomBed: room.roomBed,
    price: room.price,
    roomName: room.roomName,
    checkIn: room.checkIn,
    checkOut: room.checkOut,
    images: room.images,
    clients: room.clients,
    size: room.size,
    status: room.status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const deleteImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });

    setDeletedImages((prevDeleted) => [...prevDeleted, images[index]]);
  };

  return (
    <Modal show={show} onHide={onClose} fullscreen>
      <Modal.Header  style={{ borderBottom: 'none' }} >
        <p className="w-50">Thông tin phòng</p>
        <div className="d-flex justify-content-end w-50">
          <Button onClick={deleteImage} className='me-5 btn btn-secondary' ><SlReload className='icon-team' /> Reload </Button>
          <Button onClick={deleteImage} className='btn btn-success' ><BsSubtract className='icon-team' /> Save </Button>
          <Button onClick={onClose} className='btn btn-danger ms-5'> <GrClose className='icon-team' />Close </Button>
         </div>
      </Modal.Header>
      <Modal.Body>
        <Form className="ms-5 me-5">
          <Row>
            <Col md={6}>
              <Form.Group className="custom-form">
                <Form.Label htmlFor="roomName">Room Name:</Form.Label>
                <Form.Control
                  name="roomName"
                  value={newRoom.roomName}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="roomType">Room Type:</Form.Label>
                <Form.Control
                  name="roomType"
                  value={newRoom.roomType}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="roomBed">Room Bed:</Form.Label>
                <Form.Control
                  name="roomBed"
                  value={newRoom.roomBed}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="clients">Number of clients:</Form.Label>
                <Form.Control
                  type="number"
                  name="clients"
                  value={newRoom.clients}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="custom-form">
                <Form.Label htmlFor="checkIn">Check In Date:</Form.Label>
                <Form.Control
                  name="checkIn"
                  value={newRoom.checkIn}
                  disabled
                  className="custom-control-banned"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="checkOut">Check Out Date:</Form.Label>
                <Form.Control
                  name="checkOut"
                  value={newRoom.checkOut}
                  disabled
                  className="custom-control-banned"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="size">Size:</Form.Label>
                <Form.Control
                  name="size"
                  value={newRoom.size}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="price">Price Per Day:</Form.Label>
                <Form.Control
                  name="price"
                  value={newRoom.price}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="status">Booking Status:</Form.Label>
                <Form.Control
                  name="status"
                  value={newRoom.status}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <div className="card mt-5 mb-5">
          <div className="top">
            <p>Your Room contains images:</p>
          </div>
          <div className="container">
            {images.map((image, index) => (
              <div className="image" key={index}>
                <span className="delete" onClick={() => deleteImage(index)}>
                  &times;
                </span>
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <DragAndDropImage roomId={room.id}  />
      </Modal.Body>
    </Modal>
  );
};

export default RoomDetail;
