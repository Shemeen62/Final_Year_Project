import React from 'react';
import StockList from '../components/StockList';
import AutoComplete from '../components/AutoComplete';
import Navbar from '../components/Navbar';
import "../stylesheets/Predictions.css";

export const StockOverviewPage = () => {
  return (
    <div className='card-container'>
        <Navbar/>
        <div className='comp' style={{ marginTop: '50px' }}>
        <h1 className="predictions-heading" style={{color:"white", paddingTop:50, fontWeight:'bolder', fontSize:35}}> STOCK Dashboard</h1>
          <AutoComplete/>
          <StockList/>
        </div>
      </div>
  )
}

export default StockOverviewPage;
