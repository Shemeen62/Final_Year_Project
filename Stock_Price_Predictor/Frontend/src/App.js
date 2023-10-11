import './App.css';
// import SideBar from './sidebar/SideBar';
// import Dashboard from './components/Dashboard';
// import Homepage from "./components/HomePage";
import StockOverviewPage from './pages/StockOverviewPage';
import StockDetailPage from './pages/StockDetailPage';
import TickerInfoPage from './pages/Ticker_InfoPage';
import { WatchListContextProvider } from './context/WatchListContext';
import { AppStateProvider } from '../src/components/AppStateProvider';
import Predictions from './components/Predictions';

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Homepage/> */}
      {/* <Dashboard/> */}
      {/* <SideBar/> */}
      <WatchListContextProvider>
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage/>}/>
            <Route path="/detail/:symbol" element={<StockDetailPage/>}/>
            <Route path="/tickerinfo" element={<TickerInfoPage/>}/>
            <Route path="/Predictions" element={<Predictions/>} />
          </Routes>
        </BrowserRouter>
        </AppStateProvider>
      </WatchListContextProvider>

    </div>

  );
}

export default App;
