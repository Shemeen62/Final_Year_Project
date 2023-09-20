import React, { useState } from 'react';
import '../stylesheets/Navbar.css';
import '../stylesheets/Popup.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, teal } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

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

  const navigateHome = () => {
    navigate('/');
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to a new page with input values
    navigate(`/new-page?input1=${input1}&input2=${input2}`);
    // Close the popup
    setPopupVisible(false);
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
        <a href='#vgghvhg'>Ticker Info</a>
      </nav>

      {isPopupVisible && (
        <div className='popup-container'>
        <div className='popup-content'>
          <h3>STOCK Predictor +</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="stockTicker">Stock Ticker:</label>
              <TextField
                required
                id="stockTicker"
                label="Required"
                defaultValue=""
              />
            </div>
      
            <div className="form-group">
              <label htmlFor="numDays">Number of Days to predict:</label>
              <TextField
                required
                id="numDays"
                label="Required"
                defaultValue=""
              />
            </div>
      
            <div className="button-container">
              <ThemeProvider theme={theme}>
                <Button variant="contained">Predict</Button>
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