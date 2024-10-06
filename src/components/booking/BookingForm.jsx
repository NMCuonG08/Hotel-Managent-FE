  import React, { useEffect, useState } from 'react'
  import {  useNavigate, useParams } from 'react-router-dom'
  import { FormControl,Form, Row, Col, Card, Carousel} from 'react-bootstrap'
  import { addBooking, getHotelByID, getHotelImages, getRoomByID, getRoomImagesByRoomID, getUrlPaymentInfoOfVNPay } from '../../utils/APIFunctions'
  import StarRating from '../Hotel/StarRating'
  import { IoIosBed } from "react-icons/io";
  import { format, parse, differenceInDays } from 'date-fns';
  import { MdOutlineArrowBack } from "react-icons/md";
import ButtonConfirm from '../layout/ButtonConfirm'
  const BookingForm = () => {
    const checkInDate = parse("11/07/2020", 'dd/MM/yyyy', new Date());
    const checkOutDate = parse("11/08/2020", 'dd/MM/yyyy', new Date());
      const [booking, setBooking] = useState({
          customerName : "",
          email : "",
          phoneNumber: "",
          checkIn: checkInDate,
          checkOut: checkOutDate,
          price : 0,
          userEmail: "ngcuong1112001@gmail.com",
          required: ""
      })

      const [room, setRoom] = useState({
        roomType : "",
        roomBed : "",
        price : "",
        status : "",
        roomName : "",
        checkIn : "",
        checkOut : "",
        imageUrl : "",
        client : "",
        size : "",
        hotelID : ""
      })

    
      const [openModal, setOpenModal] = useState(false)

      const CalculatePayment = (roomPrice) => {
        const diffInDays = differenceInDays(checkOutDate, checkInDate)
        setNights(diffInDays)
        const paymentPerDays =  roomPrice ? roomPrice : 0
        return diffInDays * paymentPerDays
      }

    const formatChecIn =  format(checkInDate, 'EEE, dd MMM yyyy');
    const formatChecOut =  format(checkOutDate, 'EEE, dd MMM yyyy');

      const[nights, setNights] = useState(0)
      const [totalPrice, setTotalPrice] = useState(0)
      const [priceOfBooking, setPriceOfBooking] = useState(0)
      const [tax, setTax] = useState(0)
      const navigate = useNavigate()
      const {roomId} = useParams()
      const [selectedOptions, setSelectedOptions] = useState([])
      const [showSubOptions, setShowSubOptions] = useState(false)
      const [roomPrice , setRoomPrice] = useState(0)
      const [isValid, setIsValid] = useState(false)
      const [isSubmitted, setIsSubmitted] = useState(false)
      const [errorMessage, setErrorMessage] = useState("")
      const [required, setRequired] = useState("")
      const [images, setImages] = useState([]);
      const [selectedImage, setSelectedImage] = useState(null);
      const [hotel, setHotel] = useState({
        hotelName : "",
        feedBack : "",
        star : ""
      })

      const getHotel = async(hotelID) => {
        try {
            const data = await getHotelByID(hotelID)
            setHotel(data)

        }
        catch(error) {
          setErrorMessage(error.message)
        }
      }
      const [taxAmount, setTaxAmount] = useState(0)
      useEffect(() => {
          const getRoom = async(roomId) => {
              try {
                const res = await getRoomByID(roomId)
                setRoom(res)
                getHotel(res.hotelID)
                fetchImages(roomId)
                setTotalPrice(CalculatePayment(res.price))
                setTax(10)

            }
            catch(error) {
              setErrorMessage(error.message)
            }
          }
          getRoom(roomId)

      }, [roomId])

      useEffect (()=>{
        if (totalPrice !== undefined){
          setTaxAmount((parseFloat(totalPrice)*parseFloat(tax)/100).toFixed(2))
          setPriceOfBooking((parseFloat(totalPrice)+parseFloat(taxAmount)))
        }
      })

      
      useEffect(() => {
        setRequired(selectedOptions.join(', '))
        booking.required = required
        booking.price =parseFloat( priceOfBooking)
      }, [selectedOptions])

      const handleInputChange  = (e) => {
          const {name, value} = e.target
          setBooking({...booking, [name] : value})
          setErrorMessage("")
      }

      const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter((option) => option !== value)
                : [...prevSelectedOptions, value]
        )
    }

    const handleShowModal = (e) => {
      e.preventDefault()
      setOpenModal(true)
    }
    
      const fetchImages = async (roomID) => {
          try {
              const data = await getRoomImagesByRoomID(roomID);
              setImages(data);
              if (data.length > 0) {
                  setSelectedImage(data[0]);
              }
          } catch (error) {
              setErrorMessage(error.message);
          }
      };


    const handleSubOptionChange = () => {
      setShowSubOptions(!showSubOptions)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (booking.email.trim() != '' && booking.customerName.trim() != '' && booking.phoneNumber.trim() != ''){
        const fetchLinkPayment = async () => {
          try {
            const res = await getUrlPaymentInfoOfVNPay();
            window.open(res.url, '_blank');
            }
            catch(error){
              setErrorMessage(error.message);
            }
        }
        fetchLinkPayment()
      }
      else {
        alert("Thông báo thông tin không chính xác!\nVui lòng nhập đầy đủ thông tin cần thiết");
       
      }
    }

    const hanleAddBooking  = (e) => {
      
      e.preventDefault()
      if (booking.email.trim() != '' && booking.customerName.trim() != '' && booking.phoneNumber.trim() != ''){
        const fetchLinkPayment = async () => {
          try {
              const res = await addBooking(booking.customerName,
                booking.email,
                booking.phoneNumber,
                booking.checkIn,
                booking.checkOut,
                totalPrice,
                booking.userEmail,
                booking.required,
                2
              );
              
             alert("Booking thành công!\n Mọi thông tin chi tiết vui lòng xem lịch sử booking của bạn!")
             window.history.back();
            }
            catch(error){
             console.log(booking)
            }
        }
       
        fetchLinkPayment()
      }
      else {
        alert("Thông báo thông tin không chính xác!\nVui lòng nhập đầy đủ thông tin cần thiết");
       
      }
    }
    const handleClick = () => {
      window.history.back();
    };

    if (errorMessage) {
      return <p className = "text-danger">{errorMessage}</p>
    }


    return (
      <div className="">
        <div className="container-fluid mt-4 ms-5">
          <button onClick={handleClick} style={{backgroundColor:'white'}} > <MdOutlineArrowBack size='30px' color='black'  /></button>
          <h3 > Your booking </h3>
          <b>Confirm your information was correct before payment</b>
        </div>

        

      <Row className="w-100" >
        <Col md = {7}>
        <div className="row ms-5">
          <div className="">
            <div className="card card-body mt-5">
            <h5 >Thông tin liên hệ (đối với E-voucher)</h5>
            <div className="container mt-3">
              <Form className="w-100">
                <Form.Group className='mb-3' >
                  <Form.Label htmlFor="customerName" >Your Name: </Form.Label>
                  <FormControl
                  required
                  type='text'
                  id='customerName'
                  name='customerName'
                  value={booking.customerName}
                  onChange={handleInputChange}
                  placeholder='Enter your full name'
                  isInvalid = {!booking.customerName}
                  >
                  </FormControl>
                  <Form.Text>As in Passport/Identity Card ( No special name/character) </Form.Text>
                </Form.Group>

              <Row>
                <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor="email" >Email: </Form.Label>
                  <FormControl
                  required
                  type='text'
                  id='email'
                  name='email'
                  value={booking.email}
                  onChange={handleInputChange}
                  placeholder='Enter your email'
                  isInvalid = {!booking.email}
                  >
                  </FormControl>
                  <Form.Text>We will send you an email to verify your account </Form.Text>
                </Form.Group> 
                </Col>
                <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor="phoneNumber" >Phone Number: </Form.Label>
                  <FormControl
                  required
                  type='text'
                  id='phoneNumber'
                  name='phoneNumber'
                  value={booking.phoneNumber}
                  onChange={handleInputChange}
                  placeholder='Enter your phone number'
                  isInvalid = {!booking.phoneNumber}
                  >
                  </FormControl>
                  <Form.Text>We can contact with you  </Form.Text>
                </Form.Group>
                </Col>
              </Row>
              </Form>
          </div>
            </div>
          </div>
        </div>

        <div className="row ms-5 mb-5">
          <div className="">
            <div className="card card-body mt-5">
              <h5>Do you have any required in this hotel</h5>
            <div className="container ">
              <Form style={{fontSize : "16px"}} className="w-100" >
                
                  <Row className="mt-3">
                    <Col md={6}>
                    <Form.Group>
                      <Form.Check
                      type='checkbox'
                      label="Phòng không hút thuốc"
                      value = "Option 1"
                      checked={selectedOptions.includes('Option 1')}
                      onChange={handleOptionChange}
                      >
                      </Form.Check>
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group>
                      <Form.Check
                      type='checkbox'
                      label="Phòng liên thông"
                      value = "Option 2"
                      checked={selectedOptions.includes('Option 2')}
                      onChange={handleOptionChange}
                      >
                      </Form.Check>
                    </Form.Group>
                    </Col>
                  </Row>
                  <Row  className="mt-3">
                    <Col md={6}>
                    <Form.Group>
                      <Form.Check
                      type='checkbox'
                      label="Tầng lầu"
                      value = "Option 3"
                      checked={selectedOptions.includes('Option 3')}
                      onChange={handleOptionChange}
                    />
                      
                    </Form.Group>
                  
                    </Col>
                    <Col md={6} >
                    <Form.Group >
                      <Form.Check
                      type='checkbox'
                      label="Loại giường"
                      value = "Option 4"
                      checked={showSubOptions}
                      onChange={handleSubOptionChange}
                      />
                          {showSubOptions && (
                          <div className='ms-3'>
                            <Form.Group >
                              <Form.Check
                              type='checkbox'
                              label="Giường đơn"
                              value = "Sub Option 1"
                              checked={selectedOptions.includes('Sub Option 1')}
                              onChange={handleOptionChange}
                            />
                            </Form.Group>
                            <Form.Group>
                              <Form.Check
                              type='checkbox'
                              label="Giường lớn"
                              value = "Sub Option 2"
                              checked={selectedOptions.includes('Sub Option 2')}
                              onChange={handleOptionChange}
                            />
                        </Form.Group>
                          </div>
                        )}

                    </Form.Group>
                    </Col>
                  </Row >
                  <Row className="mt-3" >
                    <Col md={6}>
                    <Form.Group>
                      <Form.Check
                      type='checkbox'
                      label="Giờ nhận phòng"
                      value = "Option 5"
                      checked={selectedOptions.includes('Option 5')}
                      onChange={handleOptionChange}
                      >
                      </Form.Check>
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group>
                      <Form.Check
                      type='checkbox'
                      label="Giờ trả phòng"
                      value = "Option 6"
                      checked={selectedOptions.includes('Option 6')}
                      onChange={handleOptionChange}
                      >
                      </Form.Check>
                    </Form.Group>
                    </Col>
                  </Row>
                  
              </Form>
            </div>
            </div>
          </div>
        </div>
          
          <div className="row ms-5 mb-5">
              <div className="">
                      <div className="card card-body "> 
                          <Form className="w-100" >
                            <Form.Text><h5>Tiện ích bổ sung cho kỳ nghỉ của bạn</h5></Form.Text>
                            <Form.Check
                            type='checkbox'
                            label= "Bảo hiểm Du lịch"
                            />
                            <Row style={{fontSize: "15px"}}>
                              <Col >
                                <Form.Text>Information</Form.Text>
                              </Col>
                              <Col className="text-right "  >
                                <Form.Text style={{float : "right"}} >$100</Form.Text>
                              </Col>
                            </Row>
                          </Form>
                      </div>
              </div>

          </div>

          <div className="row ms-5 mb-5">
            <div className="">
              <div className="card card-body " >
                  <Form style={{fontSize : "16px"}} className="w-100" >
                    <Form.Label style={{fontSize : "22px"}} ><b>Price details</b></Form.Label>
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Label>Giá phòng:</Form.Label>
                        </Col>
                        <Col>
                          <Form.Label style ={{float : "right"}}>${totalPrice}</Form.Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Label>Thuế và phí:</Form.Label>
                        </Col>
                        <Col>
                          <Form.Label style ={{float : "right"}}>${taxAmount}</Form.Label>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style={{fontSize : "30px"}} >
                        <Col>
                          <Form.Label><b>Tổng giá:</b></Form.Label>
                        </Col>
                        <Col>
                          <Form.Label style ={{float : "right"}}>${priceOfBooking}</Form.Label>
                        </Col>
                      </Row>
                    </Form.Group>
                        <button className="btn btn-success mt-3 mb-3 " type="submit" onClick={handleSubmit} >Tiếp tục thanh toán bằng thẻ</button>
                        <button className="btn btn-danger " onClick={handleShowModal} >Thanh toán tại khách sạn </button>
                        {openModal && (
                        
                        <ButtonConfirm   title="Xác nhận đặt"
                          message="Bạn có chắc chắn muốn đặt phòng này không?"
                            onConfirm={hanleAddBooking}
                              show={openModal} onClose={() => setOpenModal(false)}
                            />                   
                        )}
                        <Form.Text >Bằng việc tiếp tục thanh toán, bạn đã đồng ý với Điều khoản & Điều kiện cũng như Chính sách quyền riêng tư của MyHotel.</Form.Text>
                  </Form>
              </div>

            </div>

          </div>
        
        </Col>
        <Col md= {5}  >
            <div className= "row ms-2">
                <div className= "card card-body mt-5 w-100 ">
                      <Row>
                        <Col md={9} >
                            <h5>{hotel.hotelName}</h5>  
                        </Col>
                        <Col md={3} >
                          <StarRating rating={hotel.star}/>
                        </Col>
                      </Row>
                      <div>
                      <i className="bi bi-bookmark-check-fill" style={{color: '#DFFF00'}} > <b>{hotel.feedBack}</b> </i>  (121) (Đánh giá của các khách đã lưu trú)
                      
                      <Carousel indicators={false}>
                              {images.map((image, index) => (
                                <Carousel.Item key={index}>
                                  <Card className="p-0 mt-5 mb-5" style={{ border: 'none' }}>
                                    <Card.Img
                                      variant="top"
                                      src={`data:image/png;base64,${image}`}
                                      alt="Room Photo"
                                      className="w-100"
                                      style={{ height: "200px", objectFit: 'cover', cursor: 'pointer' }}
                                    />
                                  </Card>
                                </Carousel.Item>
                              ))}
                            </Carousel>
                          <Row>
                                <Col md={5} >
                                      <Card className="text-center p-3" >
                                          <Card.Text>Nhận phòng</Card.Text>
                                          <Card.Body>
                                              <h5 style={{color: 'red'}}>{formatChecIn}</h5>
                                            <Card.Text >Từ 14:00</Card.Text>
                                          </Card.Body>
                                      </Card>
                                </Col>
                                <Col>
                                      <br/><br/><br/>
                                    <hr/>
                                </Col>
                                <Col className="" md={5}>
                                      <Card className="text-center p-3">
                                        <Card.Text >Trả phòng</Card.Text>
                                        <Card.Body>
                                              <h5 style={{color: 'red'}}>{formatChecOut}</h5>
                                              <Card.Text >Trước 12:00</Card.Text>
                                          </Card.Body>
                                      </Card>
                                </Col>
                          </Row>
                          <div className="mt-3">
                                <h5><b>{room.roomType}</b></h5>
                                <div className="" style={{color : "gray"}} >
                                    <i className="bi bi-people-fill"/>    {room.client} guests
                                    <br/>
                                    <IoIosBed /> {room.roomBed}
                                      
                                </div>
                          </div>
                          <hr/>
                            <div>
                            <i className="bi bi-tag-fill"/> Tổng giá phòng
                            </div>
                            <Row>
                              <Col>
                                  <p> 1 phòng  {nights} đêm </p>
                              </Col>
                              <Col >
                                  <p style={{float : 'right'}} > ${totalPrice}</p>
                              </Col>
                            </Row>
                      </div>
                </div>
            </div>
        </Col>
      </Row>
                   
    

      </div>
    )
  }

  export default BookingForm