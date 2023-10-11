import React from 'react';
import Plot from 'react-plotly.js';
import Navbar from '../components/Navbar';
import '../stylesheets/Predictions.css';
import { useAppState } from './AppStateProvider';

const Predictions = () => {
  const { resultData } = useAppState(); // Access result data from context
  console.log(resultData)

  const dates = resultData["final_dates"]
  const predictions = resultData["final_predictions"]
  const symbol = resultData["stock_symbol"]

  const layout = {
    plot_bgcolor: '#231f22',
    paper_bgcolor: 'black',
    font: {
      color: 'white',
    },
    width: 800,
    height: 600,
    title: "Predicted "+ symbol +" Stock Prices",
  };

  const config = { responsive: true };

  

  return (
    <div className="predictions-container">
      <Navbar />
      <h1 className="predictions-heading" style={{color:"white", paddingTop:80}}>Predicted {symbol} Stock Prices</h1>
      <div className="plot-container">
        {dates.length > 0 && predictions.length > 0 ? (
          <Plot
            data={[
              {
                x: dates,
                y: predictions,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#ff0030' },
              },
            ]}
            layout={layout}
            config={config}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Predictions;


