import './BuyForm.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShares, sellShares } from '../../store/portfolio_stock';
import { fetchStockData, fetchAllStocks } from '../../store/stocks';
import { fetchPortfolio} from '../../store/portfolio'
import { useParams, useHistory } from "react-router-dom";


function BuyForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const orderOption = ["Cost", "Gain"]
    const { ticker } = useParams()
    const [shares, setShares] = useState(0);
    const [style, setStyle] = useState(false);
    const [errors, setErrors] = useState([]);
    const [order, setOrder] = useState(orderOption[0])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const stock = useSelector(state => state.stocks[ticker])
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const obj = useSelector(state => state.stocks.allStocks.stocks)
    let stockId;

    for(const [key, value] of Object.entries(obj)) {
        if (key === ticker) {
            stockId = Number(value.id)
        }
    }

    let latestDate;
    let latestPrice;
    let estimatedCost;

    function buy () {
        setOrder(orderOption[0])
        setStyle(false)
    }

    function sell () {
        setOrder(orderOption[1])
        setStyle(true)
    }

    if(stock) {
        const stock_prices = stock['Time Series (Daily)']
        latestDate = Object.keys(stock_prices).shift()
        latestPrice = Number(stock_prices[latestDate]['4. close']).toFixed(2)
    }

    estimatedCost = (Number(shares) * Number(latestPrice)).toFixed(2)

    const handleSubmit = async (e) => {

        e.preventDefault();

        setHasSubmitted(true);

        if(Object.values(errors).length) {
            return alert('Errors been found')
        };

        const sharesData = {
            shares
        }

        if(order === orderOption[0]) {
            await dispatch(addShares(stockId, latestPrice, sharesData));
            await dispatch(fetchPortfolio())
        }
        if(order === orderOption[1]) {
            await dispatch(sellShares(stockId, latestPrice, sharesData))
            await dispatch(fetchPortfolio())
        }

        history.push(`/stocks/${ticker}`)

    }

    useEffect(() => {
        if (!stock) dispatch(fetchStockData(ticker))
        if (!portfolio) dispatch(fetchPortfolio());
        dispatch(fetchAllStocks())
    }, [dispatch, ticker, stock, portfolio])

    return (
        <>
            <div className='buy-container'>
                <div className='buy-form-container'>
                    <div className='buy-form-wrapper'>
                        <div className='button-box'>
                            <div id={`btn`}></div>
                            <button type='button' className={`toggle-btn-one ${style ? 'active' : 'inactive'}`} onClick={buy}>Buy {ticker}</button>
                            <button type='button' className={`toggle-btn-two ${style ? 'active' : 'inactive'}`} onClick={sell}>Sell {ticker}</button>
                        </div>
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
                                <div className='estimated-cost'>Estimated {order}</div>
                                <div className='estimated-cost'>${estimatedCost}</div>
                            </div>
                            <div className='centered-btn'>
                                <button className='order-btn' type='submit'>Order</button>
                            </div>
                            <div className='centered-one'>
                                <div className='buying-power'>${portfolio?.cash.toFixed(2)} buying power available</div>
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
