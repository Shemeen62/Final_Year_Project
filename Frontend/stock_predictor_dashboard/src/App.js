import './App.css';
// import SideBar from './sidebar/SideBar';
// import Dashboard from './components/Dashboard';
// import Homepage from "./components/HomePage";
import StockOverviewPage from './pages/StockOverviewPage';
import StockDetailPage from './pages/StockDetailPage';
import { WatchListContextProvider } from './context/WatchListContext';

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Homepage/> */}
      {/* <Dashboard/> */}
      {/* <SideBar/> */}
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage/>}/>
            <Route path="/detail/:symbol" element={<StockDetailPage/>}/>
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>

    </div>

  );
}

export default App;
