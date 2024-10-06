// SlideBar.js
import React from 'react';
import "./Side.css";
import { MdKey } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdCalendar } from "react-icons/io";
import { RiHotelLine } from "react-icons/ri";
import { LiaConciergeBellSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";

const SlideBar = ({ onTabClick, activeTab, hotelId }) => {
  return (
    <aside id='sidebar' className='sidebar'>
      <ul className='sidebar-nav' id='sidebar-nav'>
        <li className='nav-item'>
          <a className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => onTabClick('dashboard')}>
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className={`nav-link ${activeTab === 'hotel' ? 'active' : ''}`} onClick={() => onTabClick('hotel')}>
            <RiHotelLine />
            <span>Hotel</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className={`nav-link ${activeTab === 'rooms' ? 'active' : ''}`} onClick={() => onTabClick('rooms')}>
            <MdKey />
            <span>Rooms</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => onTabClick('bookings')}>
            <IoMdCalendar />
            <span>Bookings</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className={`nav-link ${activeTab === 'guest' ? 'active' : ''}`} onClick={() => onTabClick('guest')}>
            <FaRegUser />
            <span>Guest</span>
          </a>
        </li>
        <li className='nav-item'>
          <a className={`nav-link ${activeTab === 'concierge' ? 'active' : ''}`} onClick={() => onTabClick('concierge')}>
            <LiaConciergeBellSolid />
            <span>Concierge</span>
          </a>
        </li>
        <li className='nav-heading'>Pages</li>
      </ul>
    </aside>
  );
};

export default SlideBar;
