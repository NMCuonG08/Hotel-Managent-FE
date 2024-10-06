import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCommentByHotelId } from '../../utils/APIFunctions'
import OverView from './RoomConvenient/OverView'
import './comment.css'
import ListComment from './ListComment'
const Comment = () => {

  const [comments, setComments] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const {hotelId} = useParams()
  useEffect(() => {
    const fetchAllComment = async (id) => {
      try {
          const comment = await getAllCommentByHotelId(id)
          setComments(comment)
        
      }
       catch(error){
        setErrorMessage(error.errorMessage)
       }
    } 
    fetchAllComment(hotelId)
    
  }, [hotelId])


  if(errorMessage){
    return <div className="error">{errorMessage}</div>
  }


  return (
    <div id="comment" style={{height: 'auto '}} className='container-fluid mt-5' >
      <OverView comments={comments} />
        <ListComment comments={comments} />
    </div>
  )
}

export default Comment