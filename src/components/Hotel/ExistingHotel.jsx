import React, { useEffect, useState } from 'react'
import { getAllHotel } from '../../utils/APIFunctions'
import HotelPaninator from './HotelPanigater'
import CreateLoading from '../layout/CreateLoading'

const ExistingHotel = () => {
    const[hotels, setHotels] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[hotelPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filterHotels, setFilterHotels] = useState([])
    const[selectCity, setSelectCity] = useState("")
    const[successMessage,setSuccessMessage] = useState("")
    const[errorMessage,setErrorMessage] = useState("")

    useEffect(() => {
        fetchHotel()
    },[])

    const fetchHotel = async () =>{
        setIsLoading(true)
        try {
            const resuilt = await getAllHotel()
            setHotels(resuilt)
            setIsLoading(false)
            setFilterHotels(resuilt)
        }
        catch(error){
            setErrorMessage(error.message)
        }
    }


    const handlePanigationClick = (pageNumber) => {
            setCurrentPage(pageNumber)
    }

    useEffect (() => {
            if (selectCity === "") {
                setFilterHotels(hotels)
            }
            else {
                const filtered  = hotels.filter((hotel) => hotel.city === selectCity)
                setFilterHotels(filtered)
            }

        setCurrentPage(1)
    }, [hotels, selectCity])

    const calculateTotalPages = (filterHotels, hotelPerPage, hotels) =>{
        const totalHotels = filterHotels.length > 0 ? filterHotels.length : hotels.length
        return Math.ceil(totalHotels/hotelPerPage)
    }

    const indexOfLastHotel = currentPage * hotelPerPage
    const indexOfFirstHotel = indexOfLastHotel - hotelPerPage
    const currentHotel = filterHotels.slice(indexOfFirstHotel, indexOfLastHotel)



  return (
    <>
        {isLoading ? (
            <CreateLoading/>
        ) : (
            <>
                <section className="mt-5 mb-5">
                    <div className="mt-5 mb-4 container-fluid d-flex justify-content-between">
                        <h2>Existing Hotel</h2>
                        </div>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>HotelName</th>
                                    <th>City</th>
                                    <th>Street</th>
                                    <th>FeedBack</th>
                                    <th>Price</th>
                                    <th>Email</th>
                                    <th>Zipcode</th>
                                    <th>FloorsNumber</th>
                                    <th>Capacity</th>
                                    <th>PhoneNumber</th>
                                    <th>Country</th>
                                    <th>Description</th>    
                                    <th>Star</th>    
                                    <th>Type</th>    
                                </tr>
                            </thead>
                            <tbody>
                                {currentHotel.map((hotel)=> (
                                    <tr key={hotel.id} className="text-center">
                                        <td>{hotel.id}</td>
                                        <td>{hotel.hotelName}</td>
                                        <td>{hotel.city}</td>
                                        <td>{hotel.street}</td>
                                        <td>{hotel.feedBack}</td>
                                        <td>{hotel.price}</td>
                                        <td>{hotel.email}</td>
                                        <td>{hotel.zipcode}</td>
                                        <td>{hotel.floorsNumber}</td>
                                        <td>{hotel.capacity}</td>
                                        <td>{hotel.phoneNumber}</td>
                                        <td>{hotel.country}</td>
                                        <td>{hotel.description}</td>
                                        <td>{hotel.star}</td>
                                        <td>{hotel.type}</td>
                                    </tr>   
                                ))}
                            </tbody>
                        </table>
                          <HotelPaninator
                            currentPage={currentPage}
                            totalPages ={calculateTotalPages(filterHotels,hotelPerPage,hotels)}
                            onPageChange={handlePanigationClick}
                          
                          />          

                  
                </section>
            </>
        )}
    </>
  )
}

export default ExistingHotel