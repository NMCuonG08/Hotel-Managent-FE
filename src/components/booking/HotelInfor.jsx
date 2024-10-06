import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getHotelByID } from '../../utils/APIFunctions'
import CreateLoading from '../layout/CreateLoading'
import StarRating from '../Hotel/StarRating'
const HotelInfor = () => {

  const {hotelId} = useParams()
  const [data, setData] = useState("")
  const[isLoading,setIsLoading] = useState(false)
  const[error, setError] = useState("")
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try  {
        const res = await getHotelByID(hotelId)
        setData(res)
        setIsLoading(false)
      }
      catch(error) {
       setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [hotelId])

  if (isLoading) {
    return <CreateLoading/>
  }
  if (error) {
    return <div className="text-danger">Error : {error}</div>;
  }


  return (
    <div className="container-fluid mb-5 ">
      <p style={{fontSize: '36px'}} className='mb-0' >{data.hotelName}</p> 
        <StarRating rating={data.star} />
        <p>{data.description}</p>
        <span className="span-feedback me-2" >{data.feedBack}</span> Good Job!
    </div>
  )
}

export default HotelInfor