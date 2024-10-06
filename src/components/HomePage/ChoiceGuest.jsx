import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './ChoiceLocation.css'

const ChoiceGuest = ({ numberGuest,setNumberGuest }) => {
  const [guest, setGuest] = useState(numberGuest)
  const handleDecrement = () => {
    setGuest((prevGuest) => {
      const newGuest = Math.max(prevGuest - 1, 1)
      setNumberGuest(newGuest)
      return newGuest
    })
  }

  const handleIncrement = () => {
    setGuest((prevGuest) => {
      const newGuest = prevGuest + 1
      setNumberGuest(newGuest)
      return newGuest
    })
  }


  return (
    <div className="container-fluid border border-gray shadow shadow-2 rounded-3 p-0" style={{ backgroundColor: 'white', zIndex: 9999, position: 'absolute', width:'430px' }}>
      <div className="ms-4 mt-3">
        <p>Chọn phòng</p>
        <Row className="mt-3 mb-5">
          <Col md={5}>
            <p>Nguời lớn:</p>
          </Col>
          <Col md={7}>
            <span className="btn-guest ms-5" onClick={handleDecrement}><i className="bi bi-dash" /></span>
            {guest}
            <span className="btn-guest" onClick={handleIncrement}><i className="bi bi-plus p-0" /></span>
          </Col>
        </Row>
        <hr />
      </div>
    </div>
  )
}

export default ChoiceGuest
