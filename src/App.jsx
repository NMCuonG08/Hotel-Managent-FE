import { useEffect ,useState} from 'react'
import {jwtDecode} from 'jwt-decode';
import viteLogo from '/vite.svg'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ExistingHotel from './components/Hotel/ExistingHotel'
import AddHotel from './components/Hotel/AddHotel'
import UpdateHotel from './components/Hotel/UpdateHotel'
import Hotel from './components/Hotel/Hotel'
import Room from './components/Room/Room'
import ModelHotel from './components/Modal/ModelHotel'  
import NavBar from './components/layout/NavBar'
import Header from './components/admin/DashBoard/Header/Header'
import CodeTest from './components/Test/CodeTest'
import ModalLogin from './components/Modal/ModalLogin';
import BookingForm from './components/booking/BookingForm';
import Payment from './components/booking/Payment';
import HomePage from './components/HomePage/HomePage';
import Loading from './components/layout/CreateLoading';
import ChoiceRoom from './components/Room/ChoiceRoom';
import HotelConvenient from './components/Hotel/HotelConvenient/HotelConvenient';
import Booked from './components/booking/HistoryBooking/Booked';

function App() {

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        setShowModal(true)
        if (decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken');
            setShowModal(false)
        } else {
            const timeout = (decoded.exp * 1000) - Date.now();
            setTimeout(() => {
                localStorage.removeItem('jwtToken');
            }, timeout);
            setShowModal(false)
        }
    }
    else {
      setShowModal(false)
    }
}, []);



  return (
      <main className=''>
        <Router>
          <NavBar/>
          
            <Routes>
                <Route path="/all-hotels" element={<ExistingHotel/>}/>
                <Route path="/add/newhotel" element={<AddHotel/>}/>
                <Route path="/hotel/update/:hotelId" element={<UpdateHotel/>}/>
                <Route path="/Hotel-Search" element={<Hotel/>}/>
                <Route path="/hotel/:hotelId/details" element={<ChoiceRoom/>}/>
                <Route path="/model" element={<ModelHotel/>}/> 
                <Route path="/slide" element={<Header/>}/>   
                <Route path="/hotel/:hotelId/test" element={<HotelConvenient/>}/>  
                <Route path="/booking/:hotelID/:roomId" element={<BookingForm/>}/>  
                <Route path="/payment" element={<Payment/>}/>   
                <Route path="" element={<HomePage/>}/>  
                <Route path="/loading" element={<Loading/>}/> 
                <Route path="/find-booking" element={<Booked/>}/>          
            </Routes>
        </Router>
        {showModal && <ModalLogin show={showModal} onClose={() => setShowModal(false)} />}

      </main>
  )
  
}

export default App
