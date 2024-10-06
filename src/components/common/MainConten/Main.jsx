import React from 'react';
import "./main.css";
import PageTitle from './PageTitle';
import TotalRoom from './TotalRoom';
import CheckInAndCheckOut from './CheckInAndCheckOut';
import Revenue from './Revenue';
import HotelInformation from './Hotel/HotelInformation';
import Room from './RoomManagement/Room';
import Booking from './Bookings/Booking';

const Main = ({ activeTab ,hotelId }) => {
  return (
    <main id='main' className=" mt-1" >
      {activeTab === 'dashboard' && (
        <>
          <PageTitle page='DashBoard' />
          <TotalRoom />
          <CheckInAndCheckOut />
          <Revenue />
        </>
      )}
       {activeTab === 'hotel' && <HotelInformation hotelId={hotelId} />}
       {activeTab === 'rooms' && <Room hotelId={hotelId} />}
       {activeTab === 'bookings' && <Booking hotelId={hotelId} /> }
      {activeTab === 'guest' && <div>Content for Guest</div>}
      {activeTab === 'concierge' && <div>Content for Concierge</div>}
    </main>
  );
};

export default Main;
