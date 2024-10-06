import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];

  // Create an array with 'rating' number of stars
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i} style={{color: '#DFFF00', fontSize:'25px'}}>★</span>);
  }

  return <div>{stars}</div>;
};

export default StarRating;
