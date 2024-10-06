import React from 'react'

const NavNotication = () => {
  return (
    <li className="nav-item dropdown">
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-bell"></i>
            <span className="badge bg-primary badge-number">4</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li className="dropdown-header">
                You have 4 new notifications
                <a href="#" >
                    <span className="badge bg-primary badge-pillp-2 ms-2">
                        View all
                    </span>
                </a>
            </li>
            <li>
                <hr className="dropdown-devider"/>
            </li>

            <li className="notification-item">
                <i className='bi bi-exclamtion-circle text-warning'></i>
                <div>
                    <h4>hu</h4>
                    <p>now</p>
                    <p>30 min before</p>
                </div>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>
            
            <li className="notification-item">
                <i className='bi bi-exclamtion-circle text-danger'></i>
                <div>
                    <h4>hu</h4>
                    <p>now</p>
                    <p>1 hour before</p>
                </div>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>

            
            <li className="notification-item">
                <i className='bi bi-exclamtion-circle text-success'></i>
                <div>
                    <h4>hu</h4>
                    <p>now</p>
                    <p>2 hour before</p>
                </div>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>

            
            <li className="notification-item">
                <i className='bi bi-exclamtion-circle text-primary'></i>
                <div>
                    <h4>hu</h4>
                    <p>now</p>
                    <p>4 hrs. ago</p>
                </div>
            </li>
            <li>
                <hr className='dropdown-divider'/>
            </li>

            <li className='dropdown-footer'>
                <a href='#'>Show all notifications</a>
            </li>

        </ul>
    </li>
  )
}

export default NavNotication