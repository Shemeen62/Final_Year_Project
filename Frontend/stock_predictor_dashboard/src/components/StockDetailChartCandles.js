import React from 'react';
import Plot from 'react-plotly.js';
import { useState } from 'react';

const StockDetailChartCandles = ({ chartData, symbol }) => {

  const [dateFormat, setDateFormat] = useState("24h")

  const { day, week, year } = chartData;

  let XvaluesofStockChartFunction = [];
  let ClosevaluesofStockChartFunction = [];
  let HighvaluesofStockChartFunction = [];
  let LowvaluesofStockChartFunction = [];
  let OpenvaluesofStockChartFunction = [];

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
    HighvaluesofStockChartFunction.push(determineTimeFormat()[key]["h"]);
    LowvaluesofStockChartFunction.push(determineTimeFormat()[key]["l"]);
    OpenvaluesofStockChartFunction.push(determineTimeFormat()[key]["o"]);
  }


  var trace = {
    x: XvaluesofStockChartFunction,
    close: ClosevaluesofStockChartFunction,
    high: HighvaluesofStockChartFunction,
    low: LowvaluesofStockChartFunction,
    open: OpenvaluesofStockChartFunction,

    // cutomise colors
    increasing: {line: {color: 'green'}},
    decreasing: {line: {color: 'red'}},

    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
  };

  var data = [trace];

  const layout = {
    title: symbol,
    plot_bgcolor: '#231f22',
    paper_bgcolor: 'black',
    font: {
      color: 'white'
    },
    width: 800,
    height: 600,
    dragmode: 'zoom',
    margin: {
      r: 60,
      t: 40,
      b: 40,
      l: 60,
    },
    showlegend: false,
    xaxis: {
      type: 'date',
      autorange: true,
      dtick: 'D10', // Set the interval between tick marks to 1 month
      title: 'Date',
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      type: 'linear',
      title: 'Stock Price',
    }
  };

  const config = {responsive: true};

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if(button === dateFormat){
        return classes + "btn-primary"
    }else{
        return classes + "btn-outline-primary"
    }
  } 

  return (
    <div className="card-container">
      <Plot data={data} layout={layout} config={config}/>
      <div>
        <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
        <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
      </div>
    </div>
  );
};

export default StockDetailChartCandles;
