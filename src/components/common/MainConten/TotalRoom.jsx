import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import './totalRoom.css'
import PieCharts  from '../Chart/PieCharts'
import ProcessCharts  from '../Chart/ProcessCharts'
import { BsCalendar2CheckFill } from "react-icons/bs";
const TotalRoom = () => {
  return (
    <div className="total">
<Row>
    <Col xs={12} md={6} lg={3}>
        <Card className='card'>
            <Card.Body className='card-body d-flex justify-content-between'>
                <div>
                  <Card.Text>New Booking</Card.Text>
                  <h2>123</h2>
                </div>
                <ProcessCharts/>
            </Card.Body>
        </Card>
    </Col>
    <Col xs={12} md={6} lg={3}>
        <Card>
            <Card.Body className='card-body d-flex justify-content-between'>
               <div>
                  <Card.Text>Scheduled Room</Card.Text>
                  <h2>458</h2>
               </div>
                <ProcessCharts/>
            </Card.Body>
        </Card>
    </Col>
    <Col xs={12} md={6} lg={3}>
        <Card>
            <Card.Body  className='card-body d-flex justify-content-between'>
                <div>
                    <Card.Text>Check In</Card.Text>
                    <h2>97</h2>
                </div>
                <BsCalendar2CheckFill className='icon'  />
            </Card.Body>
        </Card>
    </Col>
    <Col xs={12} md={6} lg={3}>
        <Card>
            <Card.Body  className='card-body d-flex justify-content-between'>
              <div>
                <Card.Text>Check Out</Card.Text>
                <h2>48</h2>
              </div>
              <i className="bi bi-box-arrow-right icon" />
            </Card.Body>
        </Card>
    </Col>
</Row>

        

    </div>
  )
}

export default TotalRoom