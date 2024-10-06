import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const Convenient = () => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter((option) => option !== value)
                : [...prevSelectedOptions, value]
        )
    }
  return (
    <div className="container">
            <Form>
               <Form.Group>
                <Form.Check
                    type='checkbox'
                    label ='Hồ bơi'
                    value = 'pool'
                    checked={selectedOptions.includes('pool')}
                    onChange={handleOptionChange}   
                />
               </Form.Group>
            </Form>


    </div>
  )
}

export default Convenient