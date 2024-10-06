import  { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { createUser, getJWTToken } from '../../utils/APIFunctions';
import Apple from "../../assets/apple.png"
import Google from "../../assets/google.png"
import Facebook from "../../assets/facebook.png"
import {jwtDecode} from 'jwt-decode';

const Login = ({ setLoggedIn }) => {
    const [authenRequest, setAuthenRequest] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(true)
    const [signUp, setSignUp] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getJWTToken(authenRequest);
            if (response !== undefined) {
                localStorage.setItem('jwtToken', response);
                const decoded = jwtDecode(response); 
                setLoggedIn(true);
                const timeout = (decoded.exp * 1000) - Date.now();
                setTimeout(() => {
                    localStorage.removeItem('jwtToken');
                    setLoggedIn(false);
                    navigate('/login');
                }, timeout);
                window.location.reload();
            }
        } catch (error) {
            setErrorMessage("Your email or password is incorrect.")
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        try {
            const response = await createUser(authenRequest.email, authenRequest.password);
           return <p>{response}</p>;
        } catch (error) {
            setErrorMessage("Your email or password is incorrect.")
        }
    }


    const handleHotelInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAuthenRequest({ ...authenRequest, [name]: value });
    };


    const handleChangeSignIn = (e) => {
        e.preventDefault()
        if(signIn === false) {
            setSignIn(true)
            setSignUp(false)
            setForgotPassword(false)
        }
        if(signUp === false) {
            setSignIn(false)
            setSignUp(true)
        }
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        if(forgotPassword === false) {
            setForgotPassword(true)
            setSignIn(false)
            setSignUp(false)
        }
    }

    return (
        <>
            {signIn ? (
                    <section className="container" style={{ width: '100%', height: '100%' }}>
                    <div className="row justify-content-between ">
                        <div className="text-center mb-5">
                            <h2>Sign in</h2>
                            <h5>to your account</h5>
                        </div>
                       
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex align-items-center">
                                <label htmlFor="email" style={{ width: '100px' }}>Email:</label>
                                <input
                                    className="form-control border border-dark"
                                    type="text"
                                    name="email"
                                    value={authenRequest.email}
                                    onChange={handleHotelInputChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <label htmlFor="password" style={{ width: '100px' }}>Password:</label>
                                <input
                                    className="form-control border border-dark"
                                    type="password"
                                    name="password"
                                    value={authenRequest.password}
                                    onChange={handleHotelInputChange}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errorMessage && (
                                <div className="alert alert-danger text-center fade show">{errorMessage}</div>
                            )}
                            <div className="text-center mt-4">
                                <h5>OR</h5>
                            </div>
                            <div className="container rounded d-flex align-items-between border border-green" style={{ width: '100%', height: '15%' }}>
                                <ul className="nav">
                                    <li className="nav-item" style={{ }}>
                                       <button className="btn btn-none ">
                                        <Link to="" className="nav-link text-dark" >
                                                <img src={Apple} className="mb-1" />
                                                Apple
                                            </Link>
                                       </button>
                                    </li>
                                    <li className="nav-item" style={{  }}>
                                        <button className="btn btn-none">
                                            <Link to="" className="nav-link text-dark" >
                                                <img src={Facebook} className="mb-1 "  />
                                                Facebook
                                            </Link>
                                        </button>
                                    </li>
                                    <li className="nav-item" style={{  }}>
                                            <button className="btn btn-none">
                                            <Link to="" className="nav-link text-dark" >
                                                <img src={Google} className="mb-1"  />
                                                Google
                                            </Link>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                           <div className="container text-center">
                            <div>
                                    <button type="submit" className="btn btn-success mt-3 mb-3 rounded p-10"  style={{ width: '100%'}}>Sign in</button>
                                </div>
                                <div className="container" style={{ fontSize: '14px' }}>
                                    <p>Don't have an account?
                                        <span className="text-primary text-decoration-none" onClick={handleChangeSignIn} style={{ cursor: 'pointer' }}> Sign up</span>
                                    </p>
                                </div>
                                <div style={{ fontSize: '14px' }}>
                                    <span to="" className="text-primary text-decoration-none" onClick={handleChangePassword} style={{ cursor: 'pointer' }} >Forgot Password?</span>
                                </div>
                           </div>
                        </form>
                    </div>
                </section>
                ) : (
                    <h1></h1>
                )}

            {signUp ? (
                 <section className="container" style={{ width: '100%', height: '100%' }}>
                    <div className="row justify-content-between ">
                        <div className="text-center mb-5">
                            <h2>Create an account</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex align-items-center">
                                <label htmlFor="email" style={{ width: '100px' }}>Email:</label>
                                <input
                                    className="form-control border border-dark"
                                    type="text"
                                    name="email"
                                    value={authenRequest.email}
                                    onChange={handleHotelInputChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <label htmlFor="password" style={{ width: '100px' }}>Password:</label>
                                <input
                                    className="form-control border border-dark"
                                    type="password"
                                    name="password"
                                    value={authenRequest.password}
                                    onChange={handleHotelInputChange}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="text-center mt-4">
                                <h5>OR</h5>
                            </div>
                            <div className="container rounded d-flex align-items-between border border-green" style={{ width: '100%', height: '15%' }}>
                                <ul className="nav ">
                                    <li className="nav-item " style={{ }}>
                                       <button className="btn btn-none ">
                                        <Link to="" className="nav-link text-dark" >
                                                <img src={Apple} className="" />
                                                Apple
                                            </Link>
                                       </button>
                                    </li>
                                    <li className="nav-item" style={{  }}>
                                        <button className="btn btn-none">
                                            <Link to="" className="nav-link text-dark" >
                                                <img src={Facebook} className="mb-1 "  />
                                                Facebook
                                            </Link>
                                        </button>
                                    </li>
                                    <li className="nav-item" style={{  }}>
                                            <button className="btn btn-none">
                                            <Link to="" className="nav-link text-dark" >
                                                <img src={Google} className="mb-1"  />
                                                Google
                                            </Link>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                           <div className="container text-center">
                            <div>
                                    <button type="submit" className="btn btn-success mt-3 mb-3 rounded p-10"  style={{ width: '100%'}}
                                    onClick={handleCreateAccount}
                                    
                                    >Create account</button>
                                </div>
                                <div style={{ fontSize: '14px' }}>
                                    <p>We respect your privacy. By clicking "Create account" you agree to the <Link to={""}>Terms</Link> and <Link to={""}> Privacy Policy</Link>.</p>
                                </div>
                                <div className="container" style={{ fontSize: '14px' }}>
                                    <p>Already have an account?
                                        <span to=""className="text-primary text-decoration-none" onClick={handleChangeSignIn} style={{ cursor: 'pointer' }}> Sign in</span>
                                    </p>
                                </div>
                               
                           </div>
                        </form>
                    </div>
                </section>
            ):(
                <>
                </>
            )}

            {forgotPassword ? (
                <section className="container" style={{ width: '100%', height: '100%' }}>
                <div className="row justify-content-between ">
                    <div className="text-center mb-5">
                        <h2>Reset password</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 d-flex align-items-center">
                            <label htmlFor="email" style={{ width: '100px' }}>Email:</label>
                            <input
                                className="form-control border border-dark"
                                type="text"
                                name="email"
                                value={authenRequest.email}
                                onChange={handleHotelInputChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        
                       <div className="container text-center">
                        <div>
                               
                            </div>
                            <div style={{ fontSize: '14px' }}>
                                <p>By resetting your password, you agree to the <Link to={""}>Terms</Link> and <Link to={""}> Privacy Policy</Link>.</p>
                            </div>
                            <button type="submit" className="btn btn-success mt-3 mb-3 rounded p-10"  style={{ width: '100%'}}>Reset password</button>
                            <div className="container mb-4" style={{ fontSize: '14px' }}>
                                 <span to=""className="text-primary text-decoration-none" onClick={handleChangeSignIn} style={{ cursor: 'pointer' }}> Cancel</span>
                            </div>
                           
                       </div>
                    </form>
                </div>
            </section>
            ) : (
                <></>
            )}
        </>
    );
};

export default Login;
