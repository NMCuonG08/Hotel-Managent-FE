import React from 'react'

const NavAvata = () => {
  return (
    <li className="nav-item dropdown pe-3">
        <a
        className='nav-link nav-profile d-flex align-items-center pe-0'
        href='#'
        data-bs-toggle= 'dropdown'
        >
           
            <span className="d-none d-md-block dropdown-toggle ps-2" > NMC</span>
        </a>
        <ul
        className='dropdown-menu dropdown-menu-end dropdown-menun-arrow profile'
        >
            <li className="dropdown-header">
                <h6>Cuong</h6>
                <span>Web developer</span>
            </li>
            <li>
                <hr className="dropdown-divider" ></hr>
            </li>
            <li>
                <a
                className='dropdown-item d-flex align-item-center'
                href='user.html'
                >
                    <i className="bi bi-person"></i>
                    <span>My profile</span>    
                </a>
            </li>
            <li>
                <hr className="dropdown-divider" ></hr>
            </li>
            <li>
                <a
                className='dropdown-item d-flex align-item-center'
                href='user.html'
                >
                    <i className="bi bi-gear"></i>
                    <span>Account-settings</span>    
                </a>
            </li>
            <li>
                <hr className="dropdown-divider" ></hr>
            </li>
            <li>
                <a
                className='dropdown-item d-flex align-item-center'
                href='user.html'
                >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>    
                </a>
            </li>
            <li>
                <hr className="dropdown-divider" ></hr>
            </li>
            <li>
                <a
                className='dropdown-item d-flex align-item-center'
                href='#l'
                >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign out</span>    
                </a>
            </li>
        </ul>

    </li>
  )
}

export default NavAvata