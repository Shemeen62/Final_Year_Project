import React from 'react';
import Plot from 'react-plotly.js';

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

 
    render(){

        const layout = {
            plot_bgcolor: '#231f22',  // Set the background color
            paper_bgcolor: 'black', // Set the color of the entire plot area
            font: {
                color: 'white'         // Set the color of text elements
            },
            width: 800,
            height: 600,
            title: 'AAPL'
        }
        
        const config = {responsive: true};
        return(
            <div>
            <h1>AAPL Predictor</h1>
                <Plot
                    data={[
                    {
                        x: this.state.XvaluesofStockChart,
                        y: this.state.ClosevaluesofStockChart,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: '#ff0030'},
                    }
                ]}
                    layout={ layout }
                    config={config}
                />
            </div>
        )
    }
            

};

export default Predictions;
