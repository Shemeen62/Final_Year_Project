import React from 'react';
import StockList from '../components/StockList';
import AutoComplete from '../components/AutoComplete';
import Navbar from '../components/Navbar';

export const StockOverviewPage = () => {
  return (
    <div className='card-container'>
        <Navbar/>
        {/* <h2 >StockOverviewPage</h2> */}
        <div className='comp' style={{ marginTop: '50px' }}>
          <AutoComplete/>
          <StockList/>
        </div>
      </div>
  )
}

export default StockOverviewPage;
