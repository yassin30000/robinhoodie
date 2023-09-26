import './BuyForm.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShares } from '../../store/portfolio_stock';
import { fetchStockData } from '../../store/stocks';
import { fetchPortfolio} from '../../store/portfolio'
import { useParams } from "react-router-dom";


function BuyForm() {
    const dispatch = useDispatch();
    const { ticker } = useParams()
    const [shares, setShares] = useState(0);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const stock = useSelector(state => state.stocks[ticker])
    const portfolio = useSelector(state => state.portfolio.portfolio)

    let latestDate;
    let latestPrice;
    let estimatedCost;

    if(stock) {
        const stock_prices = stock['Time Series (Daily)']
        latestDate = Object.keys(stock_prices).shift()
        latestPrice = Number(stock_prices[latestDate]['4. close']).toFixed(2)
    }

    estimatedCost = (Number(shares) * Number(latestPrice)).toFixed(2)

    const handleSubmit = async (e) => {

        console.log(portfolio)

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

    useEffect(() => {
        if (!stock) dispatch(fetchStockData(ticker))
        if (!portfolio) dispatch(fetchPortfolio());
    }, [dispatch, ticker, stock, portfolio])

    return (
        <>
            <div className='buy-container'>
                <div className='buy-form-container'>
                    <div className='buy-form-wrapper'>
                        <h2>Buy {ticker}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='section'>
                                <div className='order-type-label'>Order Type</div>
                                <div className='buy-order'>Buy Order</div>
                            </div>
                            <div className='section'>
                                <div className='buy-in'>Buy In</div>
                                <div className='buy-in-option'>Shares</div>
                            </div>
                            <div className='section'>
                                <div className='shares-label'>Shares</div>
                                <input className='shares-input'
                                    type='number'
                                    value={shares}
                                    onChange={(e) => setShares(e.target.value)}
                                    required
                                />
                            </div>
                            <div id="line" className='section'>
                                <div className='market-price-label'>Market Price</div>
                                <div>${latestPrice}</div>
                            </div>
                            <div className='section'>
                                <div className='estimated-cost'>Estimated Cost</div>
                                <div className='estimated-cost'>${estimatedCost}</div>
                            </div>
                            <div className='centered-btn'>
                                <button className='order-btn' type='submit'>Order</button>
                            </div>
                            <div className='centered-one'>
                                <div className='buying-power'>${portfolio?.cash} buying power available</div>
                            </div>
                            <div className='centered-one'>
                                <div className='brokerage'>Brokerage</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyForm;
