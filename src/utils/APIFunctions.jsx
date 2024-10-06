import axios from 'axios'

export const API = axios.create({
  baseURL : "http://localhost:8080"
})

  const token = localStorage.getItem('jwtToken');
  const config = {
    headers: {
      
      Authorization: `Bearer ${token}`
    }
  };

  export async function createUser(email, password) {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const resuilts = await API.post("/registration", formData)
      return resuilts.data
    }
    catch(error) {
      throw new Error("Error fetching list Hotels")
    }
  
  }


export async function getAllHotel(){
  try {
    const resuilts = await API.get("/hotels/all-hotel")
    return resuilts.data
  }
  catch(error) {
    throw new Error("Error fetching list Hotels")
  }

}

export async function addNewHotel(HotelName,City,Street,FeedBack,Price,Email,Zipcode,FloorsNumber,Capacity,PhoneNumber,Country,Description,Star,Type ){
  try  {
      const formData = new FormData()
      formData.append("HotelName", HotelName )
      formData.append("City", City )
      formData.append("Street", Street )
      formData.append("FeedBack", FeedBack )
      formData.append("Price", Price )
      formData.append("Email", Email )
      formData.append("Zipcode", Zipcode )
      formData.append("FloorsNumber", FloorsNumber )
      formData.append("Capacity", Capacity )
      formData.append("PhoneNumber", PhoneNumber )
      formData.append("Country", Country )
      formData.append("Description", Description )
      formData.append("Star", Star )
      formData.append("Type", Type )
      const response = await API.post("/hotels/add/newhotel", formData, config)
      if (response.status === 201) {
        return true
      }
      else return false
  }
    catch(error) {
      throw new Error(error.message)
    }
}

export async function getHotelByID(hotelId) {
  try {
    const resuilt = await API.get(`/hotels/hotel/${hotelId}`, config)
    return resuilt.data
  }
  catch(error) {
    throw new Error(error.message)
  }
}


export async function updateHotel(hotelId, hotelData){
  try {
    const formData = new FormData()
      formData.append("HotelName", hotelData.HotelName )
      formData.append("City", hotelData.City )
      formData.append("Street", hotelData.Street )
      formData.append("FeedBack", hotelData.FeedBack )
      formData.append("Price", hotelData.Price )
      formData.append("Email", hotelData.Email )
      formData.append("Zipcode", hotelData.Zipcode )
      formData.append("FloorsNumber", hotelData.FloorsNumber )
      formData.append("Capacity", hotelData.Capacity )
      formData.append("PhoneNumber", hotelData.PhoneNumber )
      formData.append("Country", hotelData.Country )
      formData.append("Description", hotelData.Description )
      formData.append("Star", hotelData.Star )
      formData.append("Type", hotelData.Type )
      const resuilt = await API.put(`hotels/update/${hotelId}`, formData, config)
      return resuilt
  }
  catch(error) {
    throw new Error(error.message)
  }
}


export async function getHotelImages(hotelId) {
  try {
      const res = await API.get(`/hotels/hotel/${hotelId}/hotel-images`)
      return res.data

  }
  catch(error) {
    throw new Error(error.message)
  }
}



export async function addHotelImages(hotelId, images) {
  try {
      const imageForm = new FormData();
      for (let image of images) {
          imageForm.append('photos', (image.file));
          console.log((image.file));
      }     
      const resuilt = await API.post(`/hotels/hotel/${hotelId}/add-image`, imageForm, config);
      if (resuilt === 201) {
        return true
      }
      else {
        return false
      }
  }
  catch(error) {
    throw new Error(error.message)
  }
}
export async function addRoomImages(roomId, images) {
  try {
      const imageForm = new FormData();
      for (let image of images) {
          imageForm.append('images', (image.file));
      }     
      const resuilt = await API.post(`/rooms/add-images/${roomId}`, imageForm, config);
      if (resuilt === 201) {
        return true
      }
      else {
        return false
      }
  }
  catch(error) {
    throw new Error(error.message)
  }
}


export async function getRoomsByHotelID(hotelID){
  try {
      const resuilt = await API.get(`/rooms/${hotelID}/room-information`, config)
      return resuilt.data
  }
  catch(error) {
    throw new Error(error.message)
  }
}

export async function getRoomImagesByRoomID(roomID){
  try {
    const res = await API.get(`/rooms/${roomID}/images`, config)
    return res.data

}
catch(error) {
  throw new Error(error.message)
}
}

export async function getJWTToken(authRequest) {
  try {
    const res = await API.post('/authentication', {
      email: authRequest.email,
      password: authRequest.password
    });
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function addBooking(customerName, email,phoneNumber,checkIn,checkOut,totalPrice,userEmail,required, hotelId){
 
  try  {
    const formData = new FormData();
    formData.append("customerName", customerName)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("checkIn", new Date(checkIn).toISOString().split('T')[0])
    formData.append("checkOut", new Date(checkOut).toISOString().split('T')[0])
    formData.append("totalPrice", totalPrice)
    formData.append("userEmail", userEmail) 
    formData.append("required", required) 
    formData.append("hotelId", hotelId) 
    const res = await API.post("/booking/add-booking", formData, config)
    if (res.status === 201) {
      return true
    }
    else {
      return false
    }
  }
  catch(error){
    throw new Error(error.message)
  }
} 

export async function getRoomByID(roomID) {
  try {
    const res = await API.get(`/rooms/roomInformation/${roomID}`, config)
    return res.data

  }
  catch(error){
    return new Error(error.message)
  }
}


export async function getAllTypeOfHotel(){
  try {
    const res = await API.get(`/type-of-hotel/all-type`, config);
    return res.data
  }
  catch(error) {
    throw new Error(error.message)
  }
}


export async function getLocation(location){
  try {
    const res = await API.get(`/search/location?location=${location}`, config)
    return res.data
  }
  catch(error) {
    throw new Error(error.message)
  }
}


export async function filterHotels(location, StartDate, EndDate, NumberOfGuest, Type) {
  try {
    const startDate = new Date(StartDate).toISOString().split('T')[0];
    const endDate = new Date(EndDate).toISOString().split('T')[0];  
    const params = new URLSearchParams({
      location: location,
      StartDate: startDate,
      EndDate: endDate,
      NumberOfGuest: NumberOfGuest,
      Type : Type
    }).toString();

    const res = await API.get(`/search/filter?${params}`, config);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function getAllConvenientsById(id) {
  try {
    const res = await API.get(`/convenient/${id}/all`);
    return res.data
  }
  catch(error){
    throw new Error(error.message);
  }
}


export async function getAllRoomConvenientsById(id) {
  try {
    const res = await API.get(`/room-convenient/${id}/all`);
    return res.data
  }
  catch(error){
    throw new Error(error.message);
  }
}


export async function getAllCommentByHotelId(hotelId) {
  try {
    const res = await API.get(`/comment/all-comment?hotelId=${hotelId}`, config)
    return res.data
  }
  catch(error){
    throw new Error(error.message);
  }
}


export async function getUrlPaymentInfoOfVNPay(){
  try {
    const res = await API.get(`/api/payment/create-payment`)
    return res.data
  } 
  catch(error) {
    throw new Error(error.message);
  }
}


export async function getYourBooking(userEmail) {
  try {
      const res = await API.get(`/booking/yourBooking?userEmail=${userEmail}`,config )
      return res.data
  }
  catch(error){
    throw new Error(error.message);
  }
}

export async function updateBookingInfo(bookingId, userName, email, phoneNumber, required){
  try {
      const formData = new FormData()
      formData.append("userName", userName)
      formData.append("email", email)
      formData.append("phoneNumber", phoneNumber)
      formData.append("required", required)
      const res = await API.put(`/booking/update/${bookingId}`, formData, config)
      return res.status 
  }
  catch(err) {

    throw  new Error(err.message);
  }
}

export async function getHotelIdByEmail(email){
  try {
    const res = await API.get(`/hotels/findHotelId?email=${email}`, config)
    return res.data
  }
  catch(err) {

    throw  new Error(err.message);
  }
}


export async function getBookingByHotelId(hotelId){
  try {
    const res = await API.get(`/booking/get-bookings/${hotelId}`, config)
    return res.data
  }
  catch(err) {

    throw  new Error(err.message);
  }
}