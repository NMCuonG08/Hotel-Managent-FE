import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getHotelImages } from '../../utils/APIFunctions';
import StarRating from './StarRating';
import { FaLocationDot } from "react-icons/fa6";
import ModelHotel from '../Modal/ModelHotel';
const HotelCard = ({ hotel , handleFindRoom}) => {
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await getHotelImages(hotel.id);
                setImages(res);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        fetchImages();
    }, [hotel.id]);


    const handleImageClick = (e) => {
        e.preventDefault()
        setShowModal(true);
    }

    return (
        <Col key={hotel.id} className='mb-4' sx={12}    >
            
            <Card style={{width:'800px' , height:'200px', cursor : 'pointer'}}  className='p-0'  >
                <Card.Body className='d-flex flex-wrap align-items-center p-0' >
                    <div className='flex-shrink-0 mr-3 mb-3 mb-md-0' style={{ width: '35%'}} >
                        
                            {images.length > 0 ? (
                                <Card.Img
                                    variant='top'
                                    src={`data:image/png;base64, ${images[0]}`}
                                    style={{ width: '100%', height: 'auto', maxWidth: '300px',objectFit: 'cover' }}
                                    onClick={handleImageClick}
                                />
                            ) : (
                                <div>No Image Available</div>
                            )}

                    </div>
                    <div style={{ width: '50%'}} onClick={(e) => handleFindRoom(e, hotel.id)}>
                        <div className='flex-grow-1 px-5'>
                            <Card.Title>{hotel.hotelName}</Card.Title>
                            <StarRating rating={hotel.star} />
                            <Card.Title><FaLocationDot />{hotel.city}</Card.Title>
                            <Card.Title>{hotel.email}</Card.Title>
                        </div>                     
                    </div>
                    <div className="position-absolute" style={{ top: 0, right: 0, marginTop: '10px', marginRight: '10px' }}>
                            <button className="btn btn-success btn-sm">{hotel.feedBack}</button>
                    </div>
                    <div className="position-absolute" style={{ bottom: 0, right: 0, marginBottom: '10px', marginRight: '10px' }}>
                            
                            <Card.Text style={{ color: 'red', fontSize: '30px'}}  >  {hotel.price + " $"} </Card.Text>
                    </div>       
                </Card.Body>
            </Card>
            
            {showModal && <ModelHotel hotelID={hotel.id} show={showModal} onClose={() => setShowModal(false)} />}
        </Col>
    );
};

export default HotelCard;
