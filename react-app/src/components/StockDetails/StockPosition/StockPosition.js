import React from 'react'
import { useSelector } from "react-redux";


function StockPosition({ latestPrice, stocks_owned_by_user }) {

    // Stock owned by user and average cost per share
    const shares_owned = stocks_owned_by_user.reduce ((accum, currentValue) => {
        return accum + currentValue.shares
    }, 0)

    const totalPrice = stocks_owned_by_user.reduce((accum,currentValue)=> {
        const total = currentValue.price * currentValue.shares;
        return accum + total
    }, 0)
    const averagePrice = totalPrice/shares_owned

    //Market value
    //console.log(latestPrice)
    const marketValue = latestPrice * shares_owned
    const totalReturn = marketValue - totalPrice
    const percentReturn = (totalReturn/totalPrice)*100

    return (
        <div>
            <div>
                <h3>Your Market value</h3> ${marketValue.toFixed(2)}
                <p>Total Return</p> ${totalReturn.toFixed(2)} ({percentReturn.toFixed(2)})%

            </div>
            <div>
                <h3>Your Average Cost</h3>  ${averagePrice.toFixed(2)}
                
                <p>Current Shares: </p> {shares_owned}
                <p>Portfolio Diversity</p>
            </div>


        </div>
    )
}

export default StockPosition