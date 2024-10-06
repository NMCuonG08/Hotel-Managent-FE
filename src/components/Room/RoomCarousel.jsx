import React, { useEffect, useState } from 'react'
import { Card, Carousel, CarouselItem } from 'react-bootstrap'
import { getRoomImagesByRoomID } from '../../utils/APIFunctions'
import './Room.css'
const RoomCarousel = ({room}) => {

    const [images, setImages] = useState([])

    useEffect(() => {
        const fetchImage = async (id) => {
           try {
                const res = await getRoomImagesByRoomID(id)
                setImages(res)
           }
           catch(err){
            console.error(err.message)
           }
        }
        fetchImage(room.id)
    }, [room.id])


  return (
    <div>
        <Carousel indicators={false} >
            {images.map((image, index)=> (
                <CarouselItem key={index} >
                    <Card className='room-card'>
                        <Card.Img
                        variant='top'
                        src={`data:image/png;base64, ${image}`}
                        alt='image room'
                        className='w-100'
                        style={{ height: "200px", objectFit: 'cover', cursor: 'pointer' }}
                        />
                    </Card>
                </CarouselItem>
            ))}

        </Carousel>


    </div>
  )
}

export default RoomCarousel