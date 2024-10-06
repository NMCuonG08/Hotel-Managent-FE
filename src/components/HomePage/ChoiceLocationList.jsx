import React, { useState, useEffect } from 'react';
import './ChoiceLocation.css';

const ChoiceLocationList = ({ results , location}) => {
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleClick = (item) => {
   location(item)
  };

  return (
    <div className="" style={{ backgroundColor: 'white' }}>
      {results.map((item, index) => (
        <button
          key={index} // Sử dụng index của mảng làm key
          className="btn btn-none w-100 d-flex justify-content-start custom-btn"
          onClick={() => handleClick(item)}
        >
          <i className="bi bi-geo-alt-fill me-2" />
          {item}
        </button>
      ))}
    </div>
  );
  
};

export default ChoiceLocationList;
