import  { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getRoomImagesByRoomID } from '../../../../utils/APIFunctions';
import { IoBed } from "react-icons/io5";

import './room.css'
import RoomDetail from './RoomDetail';


const RoomCard = ({room}) => {

    const [showModal, setShowModal] = useState(false)
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    

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


    const handleDetails = () => {
        setShowModal(!showModal)
    }


  return (
   <>
     <Col key={room.id} className='mb-4' sx={12} >
        <div className='edit-card'  style={{ width: '100%' , padding : 0 }}>
            <Card.Body className='d-flex flex-column align-items-start p-0' onClick={() => handleDetails(room)}  >             
               <div className = 'ms-3'>
                <div className='w-100'>
                        <h4>{room.roomType}</h4>
                        <p><IoBed /> {room.roomBed}</p>
                        <p>{room.status}</p>
                        <p>{room.roomName}</p>                       
                    </div>                  
               </div>
              
            </Card.Body>   
        </div>
       
    </Col>
                    {showModal && (
                      <RoomDetail
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        room={room}
                      />
                    )}
   </>
  )
}

export default RoomCard