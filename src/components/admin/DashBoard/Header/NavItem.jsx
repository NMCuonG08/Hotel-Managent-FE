import React from 'react'

const NavItem = ({nav}) => {
  return (
    <li className="nav-item" key={nav.id}>
        <a className="nav-link collapsed" href = "#">
            <i className={nav.icon}></i>
            <span>{nav.name}</span>
        </a>
    </li>
  )
}

export default NavItem