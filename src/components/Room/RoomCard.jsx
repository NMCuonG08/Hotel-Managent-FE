import  { useEffect, useState } from 'react'
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {  getRoomImagesByRoomID } from '../../utils/APIFunctions';
import { IoBed } from "react-icons/io5";
import { IoPricetags } from "react-icons/io5";
import HotelConvenient from '../Hotel/HotelConvenient/HotelConvenient';
import { RoomConvenient } from './RoomConvenient/RoomConvenient';
import '../Hotel/HotelConvenient/convenient.css'
import { BiArea } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { Button } from 'react-scroll';
const RoomCard = ({room}) => {
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const handleOpenConvenient = (e) =>{
      e.stopPropagation();
      e.preventDefault()
      setShowModal(true)
    }
    

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await getRoomImagesByRoomID(room.id);
                setImages(res);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        fetchImages();
    }, [room.id]);

    const handleBooking = (e) => {
      e.preventDefault();
      navigate(`/booking/${room.hotelID}/${room.id}`)
    }



    return (
        <Col key={room.id} className='mb-4 custom-card' sx={12} style={{maxWidth : '440px'}}>
            <Card style={{ width: '100%' , padding : 0 }}   >
                <Card.Body className='d-flex flex-column align-items-start p-0'>
                    <div className='mb-3' style={{ width: '100%' }}>
                    <Carousel indicators={false}  >
                            {images.map((image, index) => (
                              <Carousel.Item key={index}>
                                <Card className="p-0 mb-3" style={{ border: 'none' }}>
                                  <Card.Img
                                    variant="top"
                                    src={`data:image/png;base64,${image}`}
                                    alt="Room Photo"
                                    className="w-100"
                                    style={{ height: "200px", objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={handleOpenConvenient}
                                  />
                                </Card>
                              </Carousel.Item>
                            ))}
                      </Carousel>
                       
                    </div>
                   <div className = 'ms-3 w-100'onClick={handleBooking}  >
                    <div className='w-100 convenient' >
                            <h4>{room.roomType}</h4>
                            <p><IoBed className='conve-icon' /> {room.roomBed} </p>
                            <p> <BiArea className='conve-icon'/>{room.size}  mét vuông</p>
                            <p> <FaUserGroup className='conve-icon'/>{room.client} khách </p>
                            <span onClick={handleOpenConvenient} >View of all convenients of this place <i className="bi bi-chevron-right"/> </span> 
                        </div> 
                   </div>
                </Card.Body>
                <hr/>
                <Card.Body>
                    <div className='mt-3 d-flex justify-content-between w-100 '>
                            <Card.Text className="ml-auto">  <IoPricetags color="yellow" /> Cost per night: {room.price + " $"}  </Card.Text>
                            
                        </div>
                </Card.Body>
            </Card>
       
        {showModal && <RoomConvenient room={room} show={showModal} onClose={() => setShowModal(false)}  />}  
    </Col>
    );

}

export default RoomCard