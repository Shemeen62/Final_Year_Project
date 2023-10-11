import React from 'react'
import "../stylesheets/Card.css"
import StockListChart from '../components/StockListChart';

const StockListChartCard = () => {
    return (
        <div className='card-container'>
            <StockListChart/>
        </div>
      )
}

export default StockListChartCard;