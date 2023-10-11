import React from 'react';
import {useState, useEffect, useContext} from "react";
import Finnhub from '../apis/Finnhub';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { WatchListContext } from '../context/WatchListContext';
import { useNavigate } from 'react-router-dom';

export const StockList = () => {

    const [stock, setStock] = useState([])
    const {watchList, deleteStock} = useContext(WatchListContext)
    const navigate = useNavigate()

    const changeColor = (change) => {
        return change > 0 ? "success" : "danger"
    }

    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try{
                const responses = await Promise.all(watchList.map((stock) => {
                    return Finnhub.get(`/quote?`, {
                        params : {
                            symbol : stock
                        }
                    })
                }))
                
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        Symbol : response.config.params.symbol
                    }
                })

                if(isMounted){
                    setStock(data);
                }
                
            }catch(err){

            }
        }

        fetchData()

        return () => (isMounted = false)
    }, [watchList]);

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }

    return (
        
        <div className='table' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
            <table className='table hover mt-5'>
                <thead style={{color: "rgb(79, 89, 102)"}}>
                <tr>
                    <th scope="col">Symbol</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">PClose</th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                         return(
                                <tr style={{ cursor: 'pointer' }} onClick={() => {handleStockSelect(stockData.Symbol)}} className='table-row' key={stockData.Symbol}>
                                    <th scope='row'>{stockData.Symbol}</th>
                                    <td>{stockData.data.c}</td>
                                    <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                                    <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.dp)}</td>
                                    <td>{stockData.data.h}</td>
                                    <td>{stockData.data.l}</td>
                                    <td>{stockData.data.o}</td>
                                    <td>{stockData.data.pc}</td>
                                    <td><button className='btn btn-danger btn-sm ml-3 d-inline-block delete-button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteStock(stockData.Symbol)
                                    }}>Remove</button></td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StockList;
