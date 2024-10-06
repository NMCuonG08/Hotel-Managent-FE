import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import "./header.css"
import Logo from './Logo'
import Nav from './Nav'
import SlideBar from '../SlideBar/SideBar'
import Main from '../../../common/MainConten/Main'
import {jwtDecode} from 'jwt-decode'; 
import { getHotelIdByEmail } from '../../../../utils/APIFunctions'

const Header = () => {
  const token = localStorage.getItem('jwtToken');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hotelId, setHotelId] = useState(0);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          const userEmail = decoded.sub;
          setEmail(userEmail); 
          const data = await getHotelIdByEmail(userEmail); 
          setHotelId(data);
          console.log(data);
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    fetchEmail();
  }, [token]);

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  return (
    <>
      <header className="header fixed-top d-flex align-items-center">
        <Logo   />
        <SearchBar />
        <Nav />
      </header>
      <SlideBar onTabClick={handleTabClick} activeTab={activeTab} hotelId={hotelId} />
      <Main activeTab={activeTab} 
      hotelId={hotelId}
      />
    </>
  );
}

export default Header;
