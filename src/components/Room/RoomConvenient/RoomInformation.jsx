import React, { useEffect, useState } from 'react'
import { SiParrotsecurity } from "react-icons/si";
import { getAllRoomConvenientsById } from '../../../utils/APIFunctions';
import { IoMdRestaurant } from "react-icons/io";
import '../../Hotel/HotelConvenient/convenient.css'
import { IoBed } from "react-icons/io5";
import { MdBathroom } from "react-icons/md";
import { FaSmileWink } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { GiNightSky } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
const RoomInformation = ({room}) => {

    const [convenient, setConvenient] = useState([])
    const [errorMessage,setErrorMessage] = useState("")
    useEffect(() => {
        const fetchConvenients = async (id) => {
            try {
                const data = await getAllRoomConvenientsById(id)
                setConvenient(data)
            }
            catch(error){
                setErrorMessage(errorMessage.message);
            }
        }
        fetchConvenients(room.id)
    }, [room.id])

    const convertToList = (string) => {
        if (!string) {
          return <p className='error' >No data available</p>;
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
    <div >
        <h4>Phòng {room.roomName} </h4>
        <div className="container" >
            <p style={{fontSize : '20px', color : 'orange'}} ><SiParrotsecurity className='me-3 mb-1'/>Đặt điểm nổi bật</p>
            <div className="error" >{errorMessage}</div>
             <div  className="eating-container mt-2 capitalize">
             <div className="eating-item">
                <h5> <IoMdRestaurant className='ico' />
                Ăn uống</h5>
                {convertToList(convenient.eating)}
            </div>
            <div className="eating-item">
                <h5> <IoBed className='ico' />
                Phòng ngủ</h5>
                {convertToList(convenient.bedRoom)}
            </div>
            <div className="eating-item">
                <h5> <MdBathroom  className='ico'/>Phòng tắm</h5>
                {convertToList(convenient.bathRoom)}
            </div>
            <div className="eating-item">
                <h5> <FaSmileWink className='ico' />Giải trí</h5>
                {convertToList(convenient.entertainment)}
            </div>
            <div className="eating-item">
                <h5><FaWifi  className='ico'/>Internet</h5>
                {convertToList(convenient.internet)}
            </div>
            <div className="eating-item">
                <h5><GiNightSky className='ico' />Ban công</h5>
                {convertToList(convenient.balcony)}
            </div>
            <div className="eating-item">
                <h5><SiTicktick className='ico' />Khác</h5>
                {convertToList(convenient.other)}
            </div>
            </div>   
        </div>

    </div>
  )
}

export default RoomInformation