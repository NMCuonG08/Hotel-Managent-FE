import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../Room.css';
import CreateLoading from '../../layout/CreateLoading';
import { getHotelImages } from '../../../utils/APIFunctions';
import { useParams } from 'react-router-dom';
import { MdOutlineArrowBack } from "react-icons/md";
import { TfiSharethisAlt } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
const HotelImage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { hotelId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        const fetchImage = async () => {
            try {
                const data = await getHotelImages(hotelId);
                setImages(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
            }
        };
        fetchImage();
    }, [hotelId]);

    if (isLoading) {
        return <CreateLoading />;
    }

    const handleShowModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };
    const handleClick = () => {
        window.history.back();
      };
    return (
       <div className=''>
            <div className="container d-flex justify-content-between mb-3 header-cus">
               <button onClick={handleClick}> <MdOutlineArrowBack size='30px' color='black' /></button>
               <div>
               <span> <TfiSharethisAlt className='deficon'/>Share</span>
               <span> <FaRegHeart color='red' className='deficon' />Save</span>
               </div>
               
            </div>
         <div className="hotel-img">
            <div className="container">
                <div className="left-side">
                    <img
                        src={`data:image/png;base64, ${images[0]}`}
                        alt="Large"
                        onClick={() => handleShowModal(images[0])}
                        style={{ height: "400px", objectFit: 'cover', cursor: 'pointer' }}
                    />
                </div>
                <div className="right-side">
                    {images.slice(1, 5).map((image, index) => ( // Giới hạn chỉ lấy 4 ảnh nhỏ
                        <img
                            key={index}
                            src={`data:image/png;base64, ${image}`}
                            alt={`Small ${index + 1}`}
                            onClick={() => handleShowModal(image)}
                            style={{ height: "200px", objectFit: 'cover', cursor: 'pointer' }}
                        />
                    ))}
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Image Gallery</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage && <img src={`data:image/png;base64, ${selectedImage}`} alt="Selected"  style={{ height: "400px", objectFit: 'cover', cursor: 'pointer' }}/>}
                </Modal.Body>
            </Modal>
        </div>
       </div>
    );
};

export default HotelImage;
