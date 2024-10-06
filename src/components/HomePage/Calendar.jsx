import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.css';
import { GrLinkNext } from "react-icons/gr";
import { Modal } from 'react-bootstrap';

const CreateCalendar = ({ day, nextday, onDateChange , onDateOtherChange, show, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextMonthDate, setNextMonthDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));

  const onChangeCurrentDate = (value) => {
    setCurrentDate(value);
    if (onDateChange) {
      onDateChange(value); // Thông báo cho cha về sự thay đổi ngày
    }
  };

  const onChangeNextMonthDate = (value) => {
    setNextMonthDate(value);
    if (onDateOtherChange) {
        onDateOtherChange(value); 
    }
  };

  // Hàm chuyển đổi ngày thành chuỗi thứ, ngày, tháng
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  };

  return (
    <Modal show={show} onHide={onClose}  size='lg' style={{borderBottom : 'none'}} >
      <div className='mb-5'>
        
    <div className="container mt-4 mb-5 border border-white rounded-3 " style={{ backgroundColor: "white" , zIndex: 999, position: 'absolute'}}   >
      <h4 className="mb-3 ">{formatDate(currentDate)}  <GrLinkNext />   {formatDate(nextMonthDate)}  </h4>
      <div className="row mb-5">
        <div className="col">
          <Calendar
            onChange={onChangeCurrentDate}
            value={currentDate}
            tileClassName={({ date, view }) => view === 'month' && date.getMonth() !== currentDate.getMonth() ? 'react-calendar__tile--hidden' : ''}
          />
        </div>
        <div className="col">
          <Calendar
            onChange={onChangeNextMonthDate}
            value={nextMonthDate}
            tileClassName={({ date, view }) => view === 'month' && date.getMonth() !== nextMonthDate.getMonth() ? 'react-calendar__tile--hidden' : ''}
          />
        </div>
      </div>
      
    </div>
    </div>
      
    </Modal>
  );
};

export default CreateCalendar;
