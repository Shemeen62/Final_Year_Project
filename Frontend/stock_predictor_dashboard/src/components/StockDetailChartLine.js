import React from 'react';
import Plot from 'react-plotly.js';
import { useState } from 'react';

const StockDetailChartLine = ({ chartData, symbol }) => {

  const [dateFormat, setDateFormat] = useState("24h")

  const { day, week, year } = chartData;

  let XvaluesofStockChartFunction = [];
  let ClosevaluesofStockChartFunction = [];

  const requiredDateTimeFormat = (timestamp) => {

    const unixTimestamp = timestamp; // Your Unix timestamp in milliseconds
    const dateObj = new Date(unixTimestamp);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDateTime;
  }

  const determineTimeFormat = () => {
    switch (dateFormat) {
        case '24h':
          return day;
        case '7d':
          return week;
        case '1Y':
          return year;
        default:
          return day;
      }
  }

  for (var key in determineTimeFormat()) {
    XvaluesofStockChartFunction.push(requiredDateTimeFormat(determineTimeFormat()[key]["x"]));
    ClosevaluesofStockChartFunction.push(determineTimeFormat()[key]["c"]);
  }

  const layout = {
    plot_bgcolor: '#231f22',  // Set the background color
    paper_bgcolor: 'black', // Set the color of the entire plot area
    font: {
        color: 'white'         // Set the color of text elements
    },
    width: 800,
    height: 600,
    title: symbol
  }

  const config = {responsive: true};

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if(button === dateFormat){
        return classes + "btn-primary"
    }else{
        return classes + "btn-outline-primary"
    }
  } 

//   const color = (determineTimeFormat()[determineTimeFormat().length-1]["c"] - determineTimeFormat()[0]["c"]) > 0 ? "green" : "red"

  return (
    <div className="card-container">
      <Plot
        data={[
            {
                x: XvaluesofStockChartFunction,
                y: ClosevaluesofStockChartFunction,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: "red"},
            }
        ]}
        layout={ layout }
        config={config}
      />

      <div>
        <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
        <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
        <button className={renderButtonSelect("1Y")} onClick={() => setDateFormat("1Y")}>1Y</button>
      </div>
    </div>
  );
};

export default StockDetailChartLine;
