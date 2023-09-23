import './BuyForm.css'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShares } from '../../store/portfolio_stock';
import { fetchStockData, fetchAllStocks } from '../../store/stocks';
import { Redirect, useParams } from "react-router-dom";



function BuyForm() {
    const dispatch = useDispatch();
    const { ticker } = useParams()
    const [shares, setShares] = useState(0);
    const [cost, setCost] = useState(0)
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const stock = useSelector(state => state.stocks[ticker])



    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if(Object.values(errors).length) {
            return alert('Errors been found')
        };

        const sharesData = {
            shares
        }

        let newShares = await dispatch(addShares(sharesData));

        if(newShares) {
            console.log("Shares successfully created")
        }
    }

    return (
        <>
            <div className='buy-container'>
                <form onSubmit={handleSubmit}>
                    <div className='section-one'>
                        <div className='stock-name'>Buy (STOCK NAME HERE)</div>
                    </div>
                    <div className='section-two'>
                       <div className='order-type'>Order Type <span className='type'>Buy Order</span></div>
                        <div className='shares-label'>Shares</div>
                        <input className='shares-input'
                        type='number'
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        required
                        />
                        <div className='market-price'>Market Price <span className='price'>PRICE HERE</span></div>
                    </div>
                    <div className='section-three'>
                       <div className='estimated-cost'>Estimated Cost</div>
                    </div>
                    <div className='section-four'>
                        <div className='buying-power'>buying power available</div>
                        <button className='order'>Trade now</button>
                    </div>
                    <div className='section-five'>
                        <div className='brokerage'>Brokerage</div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default BuyForm;
