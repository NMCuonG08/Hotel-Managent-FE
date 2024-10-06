
import { useEffect, useState } from "react"
import "./convenient.css"
import HotelConvenient from "../Hotel/HotelConvenient/HotelConvenient"
import { getAllConvenientsById } from "../../utils/APIFunctions"
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineSmokeFree } from "react-icons/md";
import { IoWine } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { FaSnowflake } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { CgGym } from "react-icons/cg";
const Convenient = ({hotelID}) => {

  const[data, setData] = useState([])
  const [convenients, setConvenients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    const fetchConvenients = async (id) => {
      try {
        const res = await getAllConvenientsById(id);
        setData(res)
        setConvenients(res.convenients);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchConvenients(hotelID);
  }, [hotelID]);

  const handleOpenConvenient = (e) =>{
    e.preventDefault()
    setShowModal(true)
  }
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
  const mid = Math.ceil(convenients.length / 2);
  const firstHalf = convenients.slice(0, mid);
  const secondHalf = convenients.slice(mid);

  return (
    <div id="convenient"  className='container mb-5 convenient' >
      {errorMessage && <div className="error">{errorMessage}</div>}
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
          <div></div>
      <div>
      <span onClick={handleOpenConvenient} >View of all convenients of this place <i className="bi bi-chevron-right"/> </span>
      </div>
      {showModal && <HotelConvenient data={data} convenients={convenients} show={showModal} onClose={() => setShowModal(false)}  />}  
    </div>
  )
}

export default Convenient