import { useState } from "react"
import { addNewHotel } from "../../utils/APIFunctions"
import './upHotel.css'

const AddHotel = () => {
    const[newHotel, setNewHotel] = useState({
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
    const [successMessage,setSuccessMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")


    const handleHotelInputChange = (e) => {
            const name = e.target.name
            let value = e.target.value
            if(name === "price" ||  name==="floorsNumber" || name==="capacity" ){
                if(!isNaN(value)){
                    value = parseFloat(value)
                }
                else {
                    value =""
                }
            }
            setNewHotel({...newHotel,[name]:value})
    }   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
                const success = await addNewHotel(newHotel.hotelName, newHotel.city, newHotel.street, newHotel.feedBack, newHotel.price,newHotel.email,newHotel.zipcode, newHotel.floorsNumber, newHotel.capacity,newHotel.phoneNumber,newHotel.country,newHotel.description,newHotel.star,newHotel.type)
                if (success !== undefined) {
                    setSuccessMessage("A New hotel was added to the databased .")
                    setNewHotel({hotelName: "",
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
                                type:""})
                    setErrorMessage("")
                }
                else {
                    setErrorMessage("Error adding hotel")
                }
        }
        catch(error) {
            setErrorMessage(error.message)
        }
    }

  return (
    <>
        <section className="container  mb-5 edit-form">
            <div className="row justify-content-center">
                <div>
                    <h2 className="mt-1 mb-5">Add a new Hotel</h2>
                    {successMessage && (
                        <div className="alert alert-success fade show">{successMessage}</div>
                    )}
                     {errorMessage && (
                        <div className="alert alert-danger fade show">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="hotelName" className="form-label " style={{width:'210px'}}>Hotel Name: </label>
                            <input className="form-control  " required="hotelName" type="text" name="hotelName" value={newHotel.hotelName} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="city" className="form-label" style={{width:'210px'}}>City: </label>
                            <input className="form-control" required="city" type="text" name="city" value={newHotel.city} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="email" className="form-label" style={{width:'210px'}}>Email: </label>
                            <input className="form-control" required="email" type="text" name="email" value={newHotel.email} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="zipcode" className="form-label" style={{width:'210px'}}>Zipcode: </label>
                            <input className="form-control" required="zipcode" type="text" name="zipcode" value={newHotel.zipcode} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="floorsNumber" className="form-label" style={{width:'210px'}}>Floors Number: </label>
                            <input className="form-control" required="floorsNumber" type="number" name="floorsNumber" value={newHotel.floorsNumber} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="capacity" className="form-label" style={{width:'210px'}}>Capacity: </label>
                            <input className="form-control" required="capacity" type="number" name="capacity" value={newHotel.capacity} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="phoneNumber" className="form-label" style={{width:'210px'}}>Phone Number: </label>
                            <input className="form-control" required="phoneNumber" type="text" name="phoneNumber" value={newHotel.phoneNumber} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="country" className="form-label" style={{width:'210px'}}>Country: </label>
                            <input className="form-control" required="country" type="text" name="country" value={newHotel.country} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="description" className="form-label" style={{width:'210px'}}>Description: </label>
                            <input className="form-control" required="description" type="text" name="description" value={newHotel.description} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="star" className="form-label" style={{width:'210px'}}>Star: </label>
                            <input className="form-control" required="star" type="number" max={5} min={0} name="star" value={newHotel.star} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="type" className="form-label" style={{width:'210px'}}>Type: </label>
                            <input className="form-control" required="type" type="text" name="type" value={newHotel.type} onChange={handleHotelInputChange}/>
                        </div>
                        <div className="d-grid d-md-flex mt-2">
                            <button className="btn btn-success w-100 m-5">Complete</button>
                        </div>

                    </form>

                </div>
            </div>

        </section>
    </>
  )
}

export default AddHotel