
import { useEffect, useState } from 'react'
import UpdateHotel from '../../../Hotel/UpdateHotel'

const HotelInformation = ({hotelId}) => {

  return (
     <UpdateHotel htId={hotelId}/>       
  )
}

export default HotelInformation