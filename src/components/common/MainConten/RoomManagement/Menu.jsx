import React, { useState } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import './menu.css'; // Nhớ tạo và nhập tệp CSS này

const Menu = ({hotelId}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setActiveKey(null); // Đóng tab sau khi chọn
  };

  const handleToggle = () => {
    setActiveKey(activeKey === "0" ? null : "0"); // Mở hoặc đóng tab
  };

  return (
    <div className="accordion-container">
      <Accordion activeKey={activeKey} >
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={handleToggle}>
            {selectedItem ? `Selected: ${selectedItem}` : 'Click to select an option'}
          </Accordion.Header>
          <Accordion.Body className="accordion-body">
            <ListGroup>
              <ListGroup.Item action onClick={() => handleSelect('Option 1')} className="no-border">
                Option 1
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => handleSelect('Option 2')} className="no-border">
                Option 2
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => handleSelect('Option 3')} className="no-border">
                Option 3
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Menu;
