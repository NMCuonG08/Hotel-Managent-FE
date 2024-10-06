import React, { useEffect, useState } from 'react'
import { getBookingByHotelId } from '../../../../utils/APIFunctions';
import ModalDetail from '../../../booking/HistoryBooking/ModalDetail';

const Booking = ({hotelId}) => {

    const [booking, setBooking] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    useEffect(() => {
        const fetchBookingsByUserEmail = async (id) => {
          try {
            const res = await getBookingByHotelId(id);
            setBooking(res);
          } catch (error) {
            setErrorMessage(error.message);
          }
        };
        if (hotelId) {
          fetchBookingsByUserEmail(hotelId);
        }
      }, [hotelId]);

    
  if (errorMessage) {
    return <div className="text-danger">{errorMessage}</div>;
  }

  const handleCancel = (id) => {
    console.log(`Hủy đặt phòng với ID: ${id}`);
    // Thực hiện logic hủy tại đây
  };

  const handleDetails = (book) => {
    setCurrentBooking(book);
    setShowModal(true);
  };

  return (
    <div>
        <div className="container mt-4">
      <h2 className="text-center mb-4">Thông tin đặt phòng của bạn</h2>
      {booking.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Tên Khách Hàng</th>
                <th>Email</th>
                <th>Số Điện Thoại</th>
                <th>Ngày Nhận Phòng</th>
                <th>Ngày Trả Phòng</th>
                <th>Ngày Đặt</th>
                <th>Tổng Giá</th>
                <th>Tình Trạng Thanh Toán</th>
                <th>Trạng Thái Đặt Phòng</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book, index) => (
                <tr key={index} className={book.isCheckOut ? 'table-success' : ''}>
                  <td>{book.id}</td>
                  <td>{book.customerName}</td>
                  <td>{book.email}</td>
                  <td>{book.phoneNumber}</td>
                  <td>{new Date(book.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(book.checkOut).toLocaleDateString()}</td>
                  <td>{new Date(book.bookingDate).toLocaleDateString()}</td>
                  <td>{book.totalPrice.toLocaleString()} VND</td>
                  <td>{book.isCheckOut ? <span className="badge bg-success">Đã thanh toán</span> : <span className="badge bg-warning text-dark">Chưa thanh toán</span>}</td>
                  <td>{book.bookingStatus}</td>
                  <td>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleCancel(book.id)}>Hủy</button>
                    {!book.isCheckOut && (
                      <button className="btn btn-primary btn-sm" onClick={() => handleDetails(book)}>Chi tiết</button>
                    )}
                    {showModal && currentBooking && (
                      <ModalDetail
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        booking={currentBooking}
                      />
                    )}
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">Không có thông tin đặt phòng.</div>
      )}
    </div>
    </div>
  )
}

export default Booking