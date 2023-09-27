import React from 'react'
import { useSelector } from "react-redux";
import "./StockPosition.css";


function StockPosition({ latestPrice, stocks_owned_by_user }) {

    // Stock owned by user and average cost per share
    const shares_owned = stocks_owned_by_user.reduce((accum, currentValue) => {
        return accum + currentValue.shares
    }, 0)

    const totalPrice = stocks_owned_by_user.reduce((accum, currentValue) => {
        const total = currentValue.price * currentValue.shares;
        return accum + total
    }, 0)
    const averagePrice = totalPrice / shares_owned

    //Market value
    //console.log(latestPrice)
    const marketValue = latestPrice * shares_owned
    const totalReturn = marketValue - totalPrice
    const totalPercentReturn = (totalReturn / totalPrice) * 100

    const todaysReturn = marketValue - totalPrice
    const todaysPercentReturn = (todaysReturn/totalPrice) * 100


    //console.log(stocks_owned_by_user)
    return (
        <div id="stock-position-container">
            <div id="market-value-container">
                <h3>Your Market value</h3> ${marketValue.toFixed(2)}
                <p className='first-line'><span>Today's Return  </span><span className='stock-position-lastspan'>${todaysReturn.toLocaleString()} ({todaysPercentReturn.toFixed(2)}%) </span> </p>

                <p><span>Total Return  </span><span className='stock-position-lastspan'>${totalReturn.toFixed(2)} ({totalPercentReturn.toFixed(2)})% </span> </p>
            </div>
            <div id="average-cost-container">
                <h3>Your Average Cost</h3>  ${averagePrice.toFixed(2)}

                <p className='first-line'><span>Current Shares </span><span className='stock-position-lastspan'>{shares_owned} </span></p>
                <p><span>Portfolio Diversity </span> <span className='stock-position-lastspan'> 6% </span ></p>
            </div>


        </div>
    )
}

export default StockPosition