import { addHotelImages, getHotelByID, getHotelImages, updateHotel } from "../../utils/APIFunctions"
import DragAndDropImage from "./DragAndDropImage"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './upHotel.css'
import AddHotel from "./AddHotel"
const UpdateHotel = ( {htId} ) => {
    const[hotel, setHotel] = useState({
        hotelName: "",
        city: "",
        street:"",
        feedBack:0,
        price:0,
        email:"",
        zipcode:"",
        floorsNumber:0,
        capacity:0,
        phoneNumber:"",
        country:"",
        description:"",
        star:0,
        type:""
    })
    const[images,setImages] = useState([])
    const [noHotel, setNoHotel] = useState(false)
    const [successMessage,setSuccessMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [deletedImages, setDeletedImages] = useState([])
    const hotelId = htId

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const res = await getHotelImages(hotelId)
          setImages(res)
        }
        catch(error) {
          setNoHotel(true)
          setErrorMessage(error.message)
        }
      }
      fetchImages()
    }, [hotelId])

    useEffect(() => {
      const fetchHotel = async () => {  
        try {
            const hotelData = await getHotelByID(hotelId)
            setHotel(hotelData) 
        }
        catch(err){
          console.error(err)
          setNoHotel(true)
        }
      }
      fetchHotel()
    }, [hotelId])

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setHotel({...hotel, [name] : value })
    } 
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await updateHotel(hotelId,hotel)
            if (response.status === 200) {
                setSuccessMessage("Updated successfully")
                const updateHotel = await getHotelByID(hotelId)
                setHotel(updateHotel)
                setErrorMessage("")
            }
        }
        catch(error){
          throw new Error(error.message)
        }
    }
    function deleteImage(index) {
      setImages((prevImages) => {
         const newImages = prevImages.filter((_, i) => i !== index);
         return newImages;
     })
     
     setDeletedImages((prevDeleted) => [
         ...prevDeleted,
         images[index]
     ])
     console.log(deletedImages)
 }

 
  return (
    <>
      {noHotel ? (
        <AddHotel/>
      ) : (
        <div>
          <div className="container mb-5 edit-form "  style={{backgroundColor : 'white'}}  >
        <h3 className=" mt-2 mb-5 "> Hotel Information</h3>
        <div className="row justify-content-center  ">
          <div className="col-md-8 col-lg-8">
          {successMessage &&  (
           <div className="alert alert-success fade show  " >{successMessage}</div>
          )}
           {errorMessage &&  (
          <div className="alert alert-danger fade show  " >{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex align-items-center">
                         <label htmlFor="hotelName" className="form-label " style={{width:'210px'}}>Hotel Name: </label>
                        <input className="form-control  " required="hotelName" type="text" name="hotelName" value={hotel.hotelName} onChange={handleInputChange}/>
                     </div> 
                    <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="city" className="form-label" style={{width:'210px'}}>City: </label>
                            <input className="form-control" required="city" type="text" name="city" value={hotel.city} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="email" className="form-label" style={{width:'210px'}}>Email: </label>
                            <input className="form-control" required="email" type="text" name="email" value={hotel.email} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="zipcode" className="form-label" style={{width:'210px'}}>Zipcode: </label>
                            <input className="form-control" required="zipcode" type="text" name="zipcode" value={hotel.zipcode} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="floorsNumber" className="form-label" style={{width:'210px'}}>Floors Number: </label>
                            <input className="form-control" required="floorsNumber" type="number" name="floorsNumber" value={hotel.floorsNumber} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="capacity" className="form-label" style={{width:'210px'}}>Capacity: </label>
                            <input className="form-control" required="capacity" type="number" name="capacity" value={hotel.capacity} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="phoneNumber" className="form-label" style={{width:'210px'}}>Phone Number: </label>
                            <input className="form-control" required="phoneNumber" type="text" name="phoneNumber" value={hotel.phoneNumber} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="country" className="form-label" style={{width:'210px'}}>Country: </label>
                            <input className="form-control" required="country" type="text" name="country" value={hotel.country} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="description" className="form-label" style={{width:'210px'}}>Description: </label>
                            <input className="form-control" required="description" type="text" name="description" value={hotel.description} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="star" className="form-label" style={{width:'210px'}}>Star: </label>
                            <input className="form-control" required="star" type="number" max={5} min={0} name="star" value={hotel.star} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="type" className="form-label" style={{width:'210px'}}>Type: </label>
                            <input className="form-control" required="type" type="text" name="type" value={hotel.type} onChange={handleInputChange}/>
                        </div>
                        <button className="btn btn-outline-warning ml-5 " type="submit"> Edit Room</button>
          </form>
          </div>
        </div>
      </div>
          <div className="card">
          <div className="top">
             <p>Your Hotel contains images: </p>
           </div>
            <div className="container">
              {images.map((image, index) => (
                      <div className='image' key={index}>
                          <span className='delete' onClick={() => deleteImage(index)}>
                              &times;
                          </span>
                          <img src={`data:image/jpeg;base64,${image}`} alt={`Image ${index}`}  />
                      </div>
                  ))}
            </div>
          </div> 
        <DragAndDropImage hotelId = {hotelId} />
        </div>
      )}
    </>
  )
}

export default UpdateHotel