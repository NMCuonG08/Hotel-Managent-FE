
import { Modal } from 'react-bootstrap';
import './convenient.css';
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineSmokeFree } from "react-icons/md";
import { IoWine } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { FaSnowflake } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import Eating from './Eating';

const HotelConvenient = ({ show, onClose, data , convenients}) => {
  
  const mid = Math.ceil(convenients.length / 2);
  const firstHalf = convenients.slice(0, mid);
  const secondHalf = convenients.slice(mid);

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'restaurant':
        return <MdOutlineRestaurant />
      case 'pool':
        return <MdOutlinePool />
      case 'nosmoke':
        return <MdOutlineSmokeFree />
      case 'bar':
        return <IoWine />
      case 'wifi':
        return <FaWifi />
      case 'aircondition':
        return <FaSnowflake />
      case 'parking free':
        return <FaSquareParking />
      case 'reception247':
        return <MdOutlineSupportAgent />
      case 'gym':
        return <CgGym />
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onClose} size="xl" centered style={{ zIndex: "9999" }}>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="capitalize">Tiện nghi, Dịch vụ nơi lưu trú</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '85vh', overflowY: 'auto', marginLeft: '20px' }}>
          <div>
            <h4 className="capitalize">Tiện nghi dịch vụ nổi bật</h4>
            <div className="convenient-list">
              <div className="convenient-column">
                {firstHalf.map((item, index) => (
                  <div key={index} className="capitalize"> {getIcon(item.name)} {item.name}</div>
                ))}
              </div>
              <div className="convenient-column">
                {secondHalf.map((item, index) => (
                  <div key={index} className="capitalize"> {getIcon(item.name)} {item.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Eating value={data} />  
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HotelConvenient;
