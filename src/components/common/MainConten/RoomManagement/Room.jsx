import React from 'react'
import './room.css'
import { Col, Form, FormControl, Row } from 'react-bootstrap'
import Calendar from 'react-calendar'
import ListRoom from './ListRoom'
import Status from './Status'
import Menu from './Menu'
const Room = ({hotelId}) => {
  return (
    <main >
           <div className='pick'>
             <div className="left">
                <Menu hotelId={hotelId} />
             </div>
            <div className="right">
              <Menu hotelId={hotelId}/>
            </div>
           </div>   
           <div className='mt-3'>
               <Status hotelId={hotelId}/>
        
          </div>
          <div className='mt-3'>
            <ListRoom id={hotelId} />
        
          </div>
    </main>
  )
}

export default Room