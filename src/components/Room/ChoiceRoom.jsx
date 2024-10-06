
import { useLocation, useParams } from 'react-router-dom';
import NavbarBooking from '../booking/NavbarBooking';
import OverView from '../booking/OverView';
import Convenient from '../booking/Convenient';
import ListRoom from './ListRoom';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import HotelImage from './RoomConvenient/HotelImage';
import './comment.css'
const ChoiceRoom = () => {
  const { hotelId } = useParams();

    const [finding, setFinding] = useState({
      location : "",
      guest : 1,
      selectedDate : new Date(),
      selectedNextDate : new Date() 
  })
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
      if (state) {
        const { location: foundLocation, guest, selectedDate, selectedNextDate } = state;
        setFinding({
          ...finding,
          location: foundLocation,
          guest: guest,
          selectedDate: selectedDate,
          selectedNextDate: selectedNextDate
        });
      }
    }, [state]);

  if (!hotelId) {
    return <div>Error: No hotel ID found in URL</div>;
  }

  return (
    
     <div  >
     `<HotelImage/> 
      <NavbarBooking />
      <OverView />
      <Convenient hotelID={hotelId} />
      <ListRoom />
      <Comment />
     </div>
    
  );
};

export default ChoiceRoom;
