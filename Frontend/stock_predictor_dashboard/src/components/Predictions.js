import React from 'react';
import Plot from 'react-plotly.js';
import Navbar from '../components/Navbar';
import '../stylesheets/Predictions.css';

class Predictions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            XvaluesofStockChart : [],
            ClosevaluesofStockChart : [],
            HighevaluesofStockChart : [],
            LowvaluesofStockChart : [],
            OpenvaluesofStockChart : []
        }
    }

    componentDidMount(){
        this.fetchStocks();
    }

    fetchStocks(){
        const pointerToThis = this;
        console.log(pointerToThis);
       let symbol = 'AAPL';
    //    let symbol = this.props.input1;
    //     let numDays = this.props.input2;
       const API_KEY = process.env.REACT_APP_API_KEY;
       let API_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
       let XvaluesofStockChartFunction = [];
       let ClosevaluesofStockChartFunction = [];
       let HighvaluesofStockChartFunction = [];
       let LowvaluesofStockChartFunction = [];
       let OpenvaluesofStockChartFunction = [];


       fetch(API_call)
       .then(
        function(response){
            return response.json();
        }
       )
       .then(
        function(data){
        console.log(data);

        for(var key in data['Time Series (Daily)']){
            XvaluesofStockChartFunction.push(key);
            ClosevaluesofStockChartFunction.push(data['Time Series (Daily)'][key]['4. close']);
            HighvaluesofStockChartFunction.push(data['Time Series (Daily)'][key]['2. high']);
            LowvaluesofStockChartFunction.push(data['Time Series (Daily)'][key]['3. low']);
            OpenvaluesofStockChartFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        // console.log(XvaluesofStockChartFunction[XvaluesofStockChartFunction.length - 1]);
        // console.log(XvaluesofStockChartFunction[0]);
        // console.log(ClosevaluesofStockChartFunction);
        // console.log(HighvaluesofStockChartFunction[0]);
        // console.log(LowvaluesofStockChartFunction[0]);
        // console.log(OpenvaluesofStockChartFunction[0]);

        pointerToThis.setState({
            XvaluesofStockChart : XvaluesofStockChartFunction,
            ClosevaluesofStockChart : ClosevaluesofStockChartFunction,
            HighevaluesofStockChart : HighvaluesofStockChartFunction,
            LowvaluesofStockChart : LowvaluesofStockChartFunction,
            OpenvaluesofStockChart : OpenvaluesofStockChartFunction
        })

        }
       )
    }

 
    render() {
        const layout = {
          plot_bgcolor: '#231f22',
          paper_bgcolor: 'black',
          font: {
            color: 'white'
          },
          width: 800,
          height: 600,
          title: 'AAPL'
        };
    
        const config = { responsive: true };
    
        return (
          <div className="predictions-container"> {/* Apply CSS class to container */}
            <Navbar />
            <h1 className="predictions-heading">Predicted AAPL Stock Prices</h1> {/* Apply CSS class to heading */}
            <div className="plot-container"> {/* Apply CSS class to plot container */}
              <Plot
                data={[
                  {
                    x: this.state.XvaluesofStockChart,
                    y: this.state.ClosevaluesofStockChart,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#ff0030' },
                  }
                ]}
                layout={layout}
                config={config}
              />
            </div>
          </div>
        );
      }
    }
    
    export default Predictions;