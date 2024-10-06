import React from 'react';

const Eating = ({ value }) => {
  const convertToList = (string) => {
    if (!string) {
      return <p>No data available</p>;
    }
    const items = string.split(', ').map((item) => item.trim());
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="eating-container mt-2 capitalize">
      <div className="eating-item">
        <h4>Ăn uống</h4>
        {convertToList(value.eating)}
      </div>
      <div className="eating-item">
        <h4>Đi cùng trẻ em</h4>
        {convertToList(value.childrenConvenient)}
      </div>
      <div className="eating-item">
        <h4>Vui chơi giải trí</h4>
        {convertToList(value.entertainment)}
      </div>
      <div className="eating-item">
        <h4>Làm việc từ xa</h4>
        {convertToList(value.remoteWorking)}
      </div>
      <div className="eating-item">
        <h4>Dịch vụ</h4>
        {convertToList(value.service)}
      </div>
      <div className="eating-item">
        <h4>Cơ sở tiện nghi</h4>
        {convertToList(value.facilities)}
      </div>
      <div className="eating-item">
        <h4>Ngôn ngữ</h4>
        {convertToList(value.language)}
      </div>
      <div className="eating-item">
        <h4>Hỗ trợ người khuyết tật</h4>
        {convertToList(value.disabilitiesPeople)}
      </div>
    </div>
  );
};

export default Eating;
