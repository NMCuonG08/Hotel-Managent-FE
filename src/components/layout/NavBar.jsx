import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import ModalLogin from '../Modal/ModalLogin';

const NavBar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken'); 
        if (jwtToken) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    const toggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ms-5" style={{ height: "70px" }} role="navigation">
            <div className="container-fluid ms-5">
                <Link to="/" className="navbar-brand">
                    <h3>MyHotel.com</h3>
                </Link>
                
                <Button className="navbar-toggler d-lg-none" type="button" onClick={toggleOffcanvas}>
                    <span className="navbar-toggler-icon"></span>
                </Button>
                
                <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex me-5" id="navbarScroll">
                    <ul className="navbar-nav">
                        <li className="nav-item me-4">
                            <Button className="btn btn-none border border-1 border-dark rounded-4">
                                <i className="bi bi-cloud-arrow-down-fill mt-3" /> Tải app
                            </Button>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                <i className="bi bi-globe-americas" /> Language
                            </NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to={"/slide"}>
                                Đăng thông tin lưu trú
                            </NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Hỗ trợ
                            </NavLink>
                        </li>
                        <li className="nav-item me-4">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Chuyến đi 
                            </NavLink>
                        </li>
                        <li className="nav-item me-4">
                            {!isLoggedIn ? (
                                <>
                                    <Button onClick={handleOpenModal} className='btn btn-success'>Sign in</Button>
                                    {showModal && <ModalLogin show={showModal} onClose={() => setShowModal(false)} />}
                                </>
                            ) : (
                                <>
                                    <Button onClick={handleLogOut}> Đăng xuất </Button>
                                </>
                            )}
                        </li>
                    </ul>
                </div>

                <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} className="d-lg-none">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className="navbar-nav">
                            <li className="nav-item me-4">
                                <Button className="btn btn-none border border-1 border-dark rounded-4">
                                    <i className="bi bi-cloud-arrow-down-fill mt-3" /> Tải app
                                </Button>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to={"/find-booking"}>
                                    <i className="bi bi-globe-americas" /> Language
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to={"/find-booking"}>
                                    Đăng thông tin lưu trú
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to={"/find-booking"}>
                                    Hỗ trợ
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                <NavLink className="nav-link" to={"/find-booking"}>
                                    Chuyến đi 
                                </NavLink>
                            </li>
                            <li className="nav-item me-4">
                                {!isLoggedIn ? (
                                    <>
                                        <Button onClick={handleOpenModal} className='btn btn-success'>Sign in</Button>
                                        {showModal && <ModalLogin show={showModal} onClose={() => setShowModal(false)} />}
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={handleLogOut}> Đăng xuất </Button>
                                    </>
                                )}
                            </li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </nav>
    );
};

export default NavBar;
