import React, { useState } from 'react'
import './ChoiceLocation.css'
import { getLocation } from '../../utils/APIFunctions'
import ChoiceLocationList from './ChoiceLocationList'

const ChoiceLocation = ({location}) => {

  const [input, setInput] = useState("")
  const [result, setResult] = useState([])

  const fetchData = async (value) => {
    try {
      const response = await getLocation(value)
      const lowerCaseValue = value.toLowerCase()
      const filteredResult = response.filter((item) => {
        return item.toLowerCase().includes(lowerCaseValue)
      })
      setResult(filteredResult)
    }
    catch(err){
      console.error(err.message)
    }
  }

  const handleInputChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  const handleChoiceLocation = (choice) => {
    location(choice)
  }

  return (
    <section className='container border border-gray shadow shadow-2 rounded-3 p-0' style={{ zIndex: 9999, position: 'absolute'}} >
      <input
        type="text"
        className="form-control border-0 custom-input ms-0 mb-0"
        style={{ height: '50px', fontSize: '50px !important' }}
        placeholder="Điểm đến"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      
      <div>
        <ChoiceLocationList results={result} location={handleChoiceLocation} />
      </div>
    </section>
  )
}

export default ChoiceLocation