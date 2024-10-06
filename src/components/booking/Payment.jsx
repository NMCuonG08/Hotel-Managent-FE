import React from 'react'
import { useLocation } from 'react-router-dom';
const Payment = () => {
    const location = useLocation();
    const booking  = location.state ;
  return (
    <div>
        <h1>Detail Page</h1>
        
        <div>
          <p>Name: {booking.customerName}</p>
          <p>Price: {booking.price}</p>
        </div>
      
    </div>
  )
}

export default Payment