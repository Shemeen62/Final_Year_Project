import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Finnhub from '../apis/Finnhub'
import StockDetailChartCandles from '../components/StockDetailChartCandles'
import StockDetailChartLine from '../components/StockDetailChartLine'
import { TickerDetails } from '../components/TickerDetails'
import Navbar from '../components/Navbar';

const formatData = (data) => {
  return data.t.map((el, index) => {
    return{
      x: el*1000,
      c: data.c[index],
      h:data.h[index],
      l:data.l[index],
      o:data.o[index]
    }
  })

}

const StockDetailPage = () => {

  const [chartData, setChartData] = useState([])

  const {symbol} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const currentTime = Math.floor(date.getTime()/1000)
      let oneDayAgo;

      if(date.getDay() === 6){
        oneDayAgo = currentTime - 2 * 24 * 60 * 60
      }else if(date.getDay() === 0){
        oneDayAgo = currentTime - 3 * 24 * 60 * 60
      }else{
        oneDayAgo = currentTime -  24 * 60 * 60
      }

      const oneWeekAgo = currentTime -  7 * 24 * 60 * 60
      const oneYearAgo = currentTime -  365 * 24 * 60 * 60

      try{
        const responses = await Promise.all([await Finnhub.get("/stock/candle", {
          params : {
            symbol : symbol,
            from : oneDayAgo,
            to : currentTime,
            resolution : 15
          }
        }),
        await Finnhub.get("/stock/candle", {
          params : {
            symbol : symbol,
            from : oneWeekAgo,
            to : currentTime,
            resolution : 60
          }
        }),
        await Finnhub.get("/stock/candle", {
          params : {
            symbol : symbol,
            from : oneYearAgo,
            to : currentTime,
            resolution : "W"
          }
        })
      ])

      // console.log(responses[0].data)
      // console.log(responses[1].data)
      // console.log(responses[2].data)

      setChartData({
        day: formatData(responses[0].data),
        week: formatData(responses[1].data),
        year: formatData(responses[2].data)
      })

      }catch(err){
        console.log(err)
      }

    }
    fetchData()
  },[symbol])

  return (
    <div>
      {chartData && (
        
        <div>
          <Navbar/>
          <div className='comp' style={{ marginTop: '100px' }}>
            <StockDetailChartCandles chartData={chartData} symbol={symbol}/>
            <StockDetailChartLine chartData={chartData} symbol={symbol}/>
            <TickerDetails symbol={symbol}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default StockDetailPage
