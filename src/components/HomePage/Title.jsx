import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { IoMdMoon } from "react-icons/io";
import { FaCalendarDays } from "react-icons/fa6";
const Title = () => {
  return (
    <div>
        <div className="container-fluid mt-5 mb-5 rounded-4   " style={{ height: "", backgroundColor: "#e61e43" }}>
                    <Row className="d-flex justify-content-center">
                        <Col lg ={3} className="hidden-xs" xs={12}  >
                            <h3 className='mt-5 ms-4 ' style={{ color: "white" }} >Tìm và đặt nơi lưu trú hoàn hảo </h3>
                        </Col>
                        <Col lg ={3} xs={12} className="hidden-xs">
                            <div className="container mt-3 rounded-4 mb-3" style={{ height: "130px", backgroundColor: "#a1122c", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ color: "white ",display: 'flex'}}>
                                    <IoMdMoon style={{ fontSize: '80px' }} /> <h5 className='ms-3 mt-2'>Nhận phần thưởng cho mỗi đêm bạn lưu trú</h5>
                                </div>
                            </div>
                        </Col>
                        <Col lg ={3} xs={12} className="hidden-xs">
                            <div className="container mt-3 rounded-4 mb-3" style={{ height: "130px", backgroundColor: "#a1122c", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ color: "white ",display: 'flex'}}>
                                    <i className="bi bi-tags-fill" style={{ fontSize: '40px' }} /> <h5 className='ms-3 mt-2'>Tiết kiệm hơn với Giá thành viên</h5>
                                </div>
                            </div>
                        </Col>
                        <Col lg ={3} xs={12} >
                            <div className="container mt-3 rounded-4 mb-3" style={{ height: "130px", backgroundColor: "#a1122c", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ color: "white ",display: 'flex'}}>
                                    <FaCalendarDays style={{ fontSize: '40px' }} /> <h5 className='ms-3 '>Lựa chọn hủy miễn phí nếu đổi kế hoạch</h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>



    </div>
  )
}

export default Title