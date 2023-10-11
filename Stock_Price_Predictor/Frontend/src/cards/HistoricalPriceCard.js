import React from 'react'
import "../stylesheets/Card.css"
import Stocks from '../components/Stocks';

const Card = () => {
  return (
    <div className='card-container'>
        <Stocks/>
    </div>
  )
}

export default Card;
