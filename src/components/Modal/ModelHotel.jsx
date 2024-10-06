import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Modal.css";
import { getHotelByID, getHotelImages } from '../../utils/APIFunctions';
import { Card, Carousel, Col, Row, Container } from 'react-bootstrap';
import { FaHotel, FaLocationDot } from "react-icons/fa6";
import StarRating from '../Hotel/StarRating';
import { GiVibratingBall } from "react-icons/gi";


const ModelHotel = ({ hotelID,show, onClose  }) => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [hotel, setHotel] = useState("")

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const hotels = await getHotelByID(hotelID);
                setHotel(hotels)
            }
            catch (err) {
                setErrorMessage(err.message)
            }
        }
        fetchHotel()
    }, [hotelID])

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getHotelImages(hotelID);
                setImages(data);
                if (data.length > 0) {
                    setSelectedImage(data[0]);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        fetchImages();
    }, [hotelID]);


    
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <Modal show={show} onHide={onClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Hotel images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <p>{errorMessage}</p>}
                    <Container fluid>
                        <Row>
                            <Col xs={12} md={8} className="text-center mb-4">
                                {selectedImage && (
                                    <img 
                                        src={`data:image/png;base64,${selectedImage}`} 
                                        alt="Selected Room" 
                                        className="w-100"
                                        style={{ height: "400px" }} 
                                    />
                                )}
                                <Col>
                                    <p>--</p>
                                </Col>
                                <Carousel indicators={false}>
                                    {[...Array(Math.ceil(images.length / 4))].map((_, index) => (
                                        <Carousel.Item key={index}>
                                            <Row>
                                                {images.slice(index * 4, index * 4 + 4).map((image, imgIndex) => (
                                                    <Col className="mb-4"  key={imgIndex}>
                                                        <Card onClick={() => handleImageClick(image)}>
                                                            <Card.Img
                                                                variant="top"
                                                                src={`data:image/png;base64,${image}`}
                                                                alt="Room Photo"
                                                                className="w-100"
                                                                style={{ height: "100px", width: 'auto', objectFit: 'contain', cursor: 'pointer' }} 
                                                            />
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                            <Col xs={12} md={4}>
                                <h5>{hotel.hotelName}</h5>
                                <p style={{ color: "blue", display: "flex", alignItems: "center" }}>
                                    <FaHotel color="blue" />
                                    <span style={{ marginRight: "5px" }}> {hotel.type} </span>
                                    <StarRating rating={hotel.star} />
                                </p>
                                <FaLocationDot />{hotel.city} 
                                <br/>
                                <GiVibratingBall color="blue" /> {hotel.feedBack}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
               
            </Modal>
        </>
    );
};

export default ModelHotel;
