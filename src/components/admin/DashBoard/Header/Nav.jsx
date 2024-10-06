import React from 'react'
import "./nav.css"
import NavNotication from './NavNotication'
import NavMessage from './NavMessage'
import NavAvata from './NavAvata'

const Nav = () => {
  return (
    <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
            <NavNotication/>
            <NavMessage/>
            <NavAvata/> 
        </ul>
    </nav>
  )
}

export default Nav