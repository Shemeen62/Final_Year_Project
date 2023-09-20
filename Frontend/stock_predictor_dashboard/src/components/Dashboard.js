import React from 'react'
import HistoricalPriceCard from '../cards/HistoricalPriceCard';
import PredictionsCard from '../cards/PredictionsCard';
// import HomePage from './HomePage';
// import Navbar from '../navbar/Navbar';

const Dashboard = () => {
  return (
    <div>
      {/* <SideBar/> */}
      <HistoricalPriceCard/>
      <PredictionsCard/>
    </div>

  )
}

export default Dashboard;
