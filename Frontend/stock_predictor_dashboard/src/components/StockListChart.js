import React from 'react';
import alphavantage from '../apis/alphavantage';
import Plot from 'react-plotly.js';

class StockListChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            XvaluesofStockChart: [],
            ClosevaluesofStockChartAAPL: [],
            ClosevaluesofStockChartMSFT: [],
            ClosevaluesofStockChartORCL: [],
            hasFetchedData: false, // Add this flag
        };
    }

    componentDidMount() {
        if (!this.state.hasFetchedData) {
            this.fetchStocks();
        }
    }

    fetchStocks = async () => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const watchList = ["AAPL", "MSFT", "ORCL"];
        
        try {
            const responses = await Promise.all(
                watchList.map((stock) =>
                    alphavantage.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&&apikey=${API_KEY};`, {
                        params: {
                            Symbol: stock,
                        },
                    })
                )
            );

            const XvaluesofStockChartFunction = [];
            const ClosevaluesofStockChartAAPLFunction = [];
            const ClosevaluesofStockChartMSFTFunction = [];
            const ClosevaluesofStockChartORCLFunction = [];
            
            responses.forEach((response, index) => {
                const stockTicker = watchList[index];
                for (var key in response.data["Time Series (5min)"]) {
                    XvaluesofStockChartFunction.push(key);
                    if (stockTicker === "AAPL") {
                        ClosevaluesofStockChartAAPLFunction.push(response.data['Time Series (5min)'][key]['4. close']);
                    } else if (stockTicker === "MSFT") {
                        ClosevaluesofStockChartMSFTFunction.push(response.data['Time Series (5min)'][key]['4. close']);
                    } else if (stockTicker === "ORCL") {
                        ClosevaluesofStockChartORCLFunction.push(response.data['Time Series (5min)'][key]['4. close']);
                    }
                }
            });

            this.setState({
                XvaluesofStockChart: XvaluesofStockChartFunction,
                ClosevaluesofStockChartAAPL: ClosevaluesofStockChartAAPLFunction,
                ClosevaluesofStockChartMSFT: ClosevaluesofStockChartMSFTFunction,
                ClosevaluesofStockChartORCL: ClosevaluesofStockChartORCLFunction,
            });
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        // Extract close price data from the state
        const closePricesAAPL = this.state.ClosevaluesofStockChartAAPL;
        const closePricesMSFT = this.state.ClosevaluesofStockChartMSFT;
        const closePricesORCL = this.state.ClosevaluesofStockChartORCL;

       
        // Create trace objects for each stock
        const trace1 = {
            x: this.state.XvaluesofStockChart,
            y: closePricesAAPL,
            mode: 'lines',
            name: 'AAPL',
            line: {shape: 'linear'},
            type: 'scatter'
        };
        const trace2 = {
            x: this.state.XvaluesofStockChart,
            y: closePricesMSFT,
            mode: 'lines',
            name: 'MSFT',
            line: {shape: 'linear'},
            type: 'scatter'
        };
        const trace3 = {
            x: this.state.XvaluesofStockChart,
            y: closePricesORCL,
            mode: 'lines',
            name: 'ORCL',
            line: {shape: 'linear'},
            type: 'scatter'
        };

        const data = [trace1, trace2, trace3];

        const layout = {
            plot_bgcolor: '#231f22',
            paper_bgcolor: 'black',
            font: { color: 'white' },
            width: 800,
            height: 800,
            legend: {
                y: 0.5,
                traceorder: 'reversed',
                font: { size: 16 },
                yref: 'paper',
            }
        };

        const config = { responsive: true };

        return (
            <div>
                <h1>Plot Data</h1>
                <Plot data={data} layout={layout} config={config} />
            </div>
        );
    }
}

export default StockListChart;
