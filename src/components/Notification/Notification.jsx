import React, { useState } from 'react';
import './Notification.css'; 

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);
  setTimeout(() => {
    setVisible(false);
    onClose(); 
  }, 5000);

  return (
    <div className={`notification ${visible ? 'visible' : 'hidden'}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
