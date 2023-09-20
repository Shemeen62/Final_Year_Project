import React from 'react';
import Plot from 'react-plotly.js';

class Stocks extends React.Component{

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
       let symbol = 'ORCL';
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
        const trace1 = {
            x: this.state.XvaluesofStockChart,
            close: this.state.ClosevaluesofStockChart,
            decreasing: { line: { color: '#ff0030' } },
            high: this.state.HighevaluesofStockChart,
            increasing: { line: { color: '#157e2b' } },
            line: { color: 'rgba(31,119,180,1)' },
            low: this.state.LowvaluesofStockChart,
            open: this.state.OpenvaluesofStockChart,
            type: 'candlestick',
        };

        const data = [trace1];

        const layout = {
            plot_bgcolor: '#231f22',  // Set the background color
            paper_bgcolor: 'black', // Set the color of the entire plot area
            font: {
                color: 'white'         // Set the color of text elements
            },
            width: 800,
            height: 600,
            dragmode: 'zoom',
            margin: {
                r: 60,
                t: 40,
                b: 40,
                l: 60,
                // pad: 20
            },
            showlegend: false,
            xaxis: {
                autorange: true,
                domain: [0, 1],
                range: [
                    `${this.state.XvaluesofStockChart[this.state.XvaluesofStockChart.length - 1]} 12:00`,
                    `${this.state.XvaluesofStockChart[0]} 12:00`
                ],
                rangeslider: {
                    range: [
                        `${this.state.XvaluesofStockChart[this.state.XvaluesofStockChart.length - 1]} 12:00`,
                        `${this.state.XvaluesofStockChart[0]} 12:00`
                    ]
                },
                title: 'Date',
                type: 'date'
            },
            yaxis: {
                autorange: true,
                domain: [0, 1],
                // range: [114.609999778, 337.410004222],
                type: 'linear',
                title: 'Stock Price',
            },
        };

        const config = {responsive: true};

        return(
            <div>
            <h1>AAPL</h1>
                {/* <Plot
                    data={[
                    {
                        x: this.state.XvaluesofStockChart,
                        y: this.state.ClosevaluesofStockChart,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }
                ]}
                    layout={ {width: 1500, height: 600, title: 'AAPL'} }
                /> */}
                <Plot data={data} layout={layout} config={config}/>
            </div>
        )
    }
            

};

export default Stocks;
