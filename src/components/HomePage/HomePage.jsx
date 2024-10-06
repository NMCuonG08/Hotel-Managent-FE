import React, { useState } from 'react'
import Finding from './Finding'
import ChoiceTypeVacation from './ChoiceTypeVacation'
import OfferCard from './OfferCard'
import Title from './Title'
import './home.css'
const HomePage = () => {
  return (
    
      <div className="container  mt-4 clearfix" >  
          <h2> Bạn muốn đi đâu ?</h2>
          <Finding  />
          <Title/>
         <ChoiceTypeVacation/>
         <OfferCard/>
         </div>
   
  )
}

export default HomePage