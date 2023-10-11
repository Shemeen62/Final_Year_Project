import React, { useState } from 'react';
import '../stylesheets/Navbar.css';
import '../stylesheets/Popup.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, teal } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAppState } from './AppStateProvider';

const Navbar = () => {
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: pink,
    },
  });

  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const { setResultData } = useAppState();

  const navigateHome = () => {
    navigate('/');
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = { "stock_symbol": input1, "num_days": input2 };

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Set the data in the global state
      setResultData(data);
    } catch (error) {
      console.error('Error:', error);
    }
    // Close the popup
    setPopupVisible(false);
    navigate('/Predictions');
  };

  return (
    <div className='header'>
      <a href='/' className='logo' onClick={navigateHome}>
        STOCK Predictor +
      </a>

      <nav className='navbar'>
        <a href='/' onClick={navigateHome}>
          Home
        </a>
        <a href='#vgghvhg' onClick={togglePopup}>
          Predict Stocks
        </a>
        <a href='tickerinfo'>Ticker Info</a>
      </nav>

      {isPopupVisible && (
        <div className='popup-container'>
          <div className='popup-content'>
            <h3>STOCK Predictor +</h3>
            <form onSubmit={handleSubmit} method='POST'>
              <div className="form-group">
                <label htmlFor="stockTicker">Stock Ticker:</label>
                <TextField
                  required
                  id="stockTicker"
                  label="Required"
                  defaultValue=""
                  onChange={(e) => setInput1(e.target.value)} // Update input1 state
                />
              </div>

              <div className="form-group">
                <label htmlFor="numDays">Number of Days to predict:</label>
                <TextField
                  required
                  id="numDays"
                  label="Required"
                  defaultValue=""
                  onChange={(e) => setInput2(e.target.value)} // Update input2 state
                />
              </div>

              <div className="button-container">
                <ThemeProvider theme={theme}>
                  <Button type="submit" variant="contained">Predict</Button>
                  <Button variant="contained" color="secondary" onClick={togglePopup} sx={{ ml: 2 }}>
                    Cancel
                  </Button>
                </ThemeProvider>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
