import { Modal, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import './AllBooking.css';
import { MdHotelClass } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { FaCcApplePay } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { updateBookingInfo } from '../../../utils/APIFunctions';
const ModalDetail = ({ show, onClose, booking }) => {
  const [newBooking, setNewBooking] = useState({
    customerName: booking.customerName,
    email: booking.email,
    phoneNumber: booking.phoneNumber,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    price: booking.totalPrice,
    bookingDate : booking.bookingDate,
    userEmail: booking.userEmail,
    required: booking.required,
    bookingStatus : booking.bookingStatus,
    payment : booking.payment
  });

  const [errorMessage, setErrorMessage] =useState("")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handelHotelInfo = () => {
    if(booking.hotelInformation != null){
      window.open(`/hotel/${booking.hotelInformation.id}/details`, "_blank").or()
    }
    else {
      alert("Hotel not found!")
    }
  }

  const handleChangeBookingInfo = async (e) => {
    e.preventDefault()
    try {
        const res  = await updateBookingInfo(newBooking.id, newBooking.userName, newBooking.email, newBooking.phoneNumber, newBooking.required)
        alert("Update successfully!")
    }
    catch(error){
      setErrorMessage(error.message)
    }
  }


  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton style={{ borderBottom: 'none' }}>
        Thông tin booking số {booking.id}
        <div className="col text-end">
            <button className="btn btn-success me-5" onClick={handleChangeBookingInfo} >Lưu thông tin thay đổi</button>
            <button className="btn btn-danger me-5">Huỷ đặt phòng</button>
        </div>
        <p className="text-danger" >{errorMessage}</p>
      </Modal.Header>
      <Modal.Body>
        
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="custom-form">
                <Form.Label htmlFor="customerName">Customer Name: </Form.Label>
                <Form.Control
                  name="customerName"
                  value={newBooking.customerName}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="email">Email: </Form.Label>
                <Form.Control
                  name="email"
                  value={newBooking.email}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="phoneNumber">Phone Number: </Form.Label>
                <Form.Control
                  name="phoneNumber"
                  value={newBooking.phoneNumber}
                  onChange={handleInputChange}
                  className="custom-control"
                  type="number"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="required">Required: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="required"
                  value={newBooking.required || ""}
                  onChange={handleInputChange}
                  className="custom-control"
                />
              </Form.Group>
            </Col>
            <Col md={6}  >
              <Form.Group className="custom-form">
                <Form.Label htmlFor="checkIn">Check In Date: </Form.Label>
                <Form.Control
                  name="checkIn"
                  value={newBooking.checkIn}
                  disabled 
                  className="custom-control-banned"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="checkOut">Check Out Date: </Form.Label>
                <Form.Control
                  name="checkOut"
                  value={newBooking.checkOut}
                  disabled 
                  className="custom-control-banned"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="checkOut">Booking Date: </Form.Label>
                <Form.Control
                  name="checkOut"
                  value={newBooking.bookingDate}
                  disabled 
                  className="custom-control-banned"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="checkOut">Total Price: </Form.Label>
                <Form.Control
                  name="checkOut"
                  value={newBooking.price + " VND" } 
                  disabled 
                  className="custom-control-banned"
                />
              </Form.Group>
              <Form.Group className="mt-4 custom-form">
                <Form.Label htmlFor="checkOut">Booking Status: </Form.Label>
                <Form.Control
                  name="checkOut"
                  value={newBooking.bookingStatus}
                  disabled 
                  className="custom-control-banned"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <div className="container mt-5 mb-5  d-flex justify-content-between other">
         <span onClick={handelHotelInfo} > <MdHotelClass   className='me-2 mb-1'/>Hotel Information <GrNext /></span>
         {booking.payment ? <span> <FaCircleInfo  className='me-2' /> Thông tin thanh toán <GrNext /></span>
                          : <span> <FaCcApplePay className='me-2' /> Thanh toán <GrNext /></span>}
        
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetail;
