import './BuyForm.css'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";



function BuyForm() {
    const dispatch = useDispatch();
    const [shares, setShares] = useState(0);
    const [cost, setCost] = useState(0)
    const [errors, setErrors] = useState([]);
    const handleSubmit = async (e) => {

    }

    return (
        <>
            <div className='buy-container'>
                <form onSubmit={handleSubmit}>
                    <div className='stock-name'>Buy (STOCK NAME HERE)</div>
                    <div className='order-type'>Order Type <span className='type'>Buy Order</span></div>
                    <div className='shares-label'>Shares</div>
                    <input className='shares-input'
                    type='number'
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    required
                    />
                    <div className='market-price'>Market Price <span className='price'>PRICE HERE</span></div>
                    <div className='estimated-cost'>Estimated Cost</div>
                </form>

            </div>
        </>
    )
}

export default BuyForm;
