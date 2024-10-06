import React from 'react'
import "./logo.css"
import { FaAlignJustify } from "react-icons/fa6";
const Logo = () => {
    const handleToggleSlideBar = () => {
        document.body.classList.toggle('toggle-sidebar')
    }

  return (
    <div className="d-flex align-items-center justify-items-between">
        <a href="#" className="logo d-flex align-items-center">
            <img/>
            <span className="d-none d-lg-block">Admin Dashboard</span> 
        </a>
        <i className="bi bi-list toggle-slidebar-btn " style={{color: 'black'}} onClick={handleToggleSlideBar}>
        </i>
    </div>
  )
}

export default Logo