import './BuyForm.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShares, sellShares } from '../../store/portfolio_stock';
import { fetchStockData, fetchAllStocks } from '../../store/stocks';
import { fetchPortfolio } from '../../store/portfolio'
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';

import BuyMessage from '../BuyMessage';
import OpenCustomModalButton from '../OpenModalButton/OpenModalButton2';
import SellMessage from '../SellMessage';

function BuyForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const orderOption = ["Cost", "Gain"]
    const orderName = ["Buy", "Sell"]
    const { ticker } = useParams()
    const [name, setName] = useState(orderName[0])
    const [shares, setShares] = useState('');
    const [style, setStyle] = useState(false);
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState(orderOption[0])
    // const [hasSubmitted, setHasSubmitted] = useState(false)
    const stock = useSelector(state => state.stocks[ticker])
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const stock_portfolio = useSelector(state => state.portfolio.portfolio?.portfolio_stocks)
    const obj = useSelector(state => state.stocks.allStocks.stocks)
    let stockId;
    const stock_info = useSelector(state => state.stocks.allStocks.stocks[`${ticker}`])
    const stocks_owned_by_user = stock_portfolio?.filter(stock => Number(stock.stock_id) === Number(stock_info.id))
    const shares_owned = stocks_owned_by_user?.reduce((accum, currentValue) => {
        return accum + currentValue.shares
    }, 0)


    useEffect(() => {
        const errors = {};
        if (shares < 0) errors.shares = "Shares can't be negative"
        if (shares === "0") errors.shares = "Shares can't be zero"
        if (order === orderOption[1]) {
            if (shares > shares_owned) {
                errors.shares = "Not enough shares to sell"
            }
        }

        setErrors(errors)

        // if a history.push happens, shares set to zero
        return history.listen(() => {
            setShares('');
        });
    }, [shares])

    for (const [key, value] of Object.entries(obj)) {
        if (key === ticker) {
            stockId = Number(value.id)
        }
    }

    let latestDate;
    let latestPrice;
    let estimatedCost;

    function buy() {
        setOrder(orderOption[0])
        setStyle(false)
        setName(orderName[0])
    }

    function sell() {
        setOrder(orderOption[1])
        setStyle(true)
        setName(orderName[1])
    }

    if (stock) {
        const stock_prices = stock['Time Series (Daily)']
        latestDate = Object.keys(stock_prices).shift()
        latestPrice = Number(stock_prices[latestDate]['4. close']).toFixed(2)
    }

    estimatedCost = (Number(shares) * Number(latestPrice)).toFixed(2)

    const handleSubmit = async (e) => {

        e.preventDefault();

        // setHasSubmitted(true);

        if (Object.values(errors).length) {

            return alert('Error please fix the underlying problems')
        };

        const sharesData = {
            shares
        }

        if (order === orderOption[0]) {
            let successfully = await dispatch(addShares(stockId, latestPrice, sharesData));
            await dispatch(fetchPortfolio())
            if (estimatedCost > portfolio?.cash) {
                return alert("Sorry you don't have enough buying power")
            }

            if (successfully) {
                setShares('')
                // return alert("Shares bought successfully")
                return;
            }
        }
        if (order === orderOption[1]) {
            let successfully = await dispatch(sellShares(stockId, latestPrice, sharesData))
            await dispatch(fetchPortfolio())

            if (successfully) {
                setShares('')
                // return alert("Shares sold successfully")
                return;
            }
        }
        setErrors({})


        history.push(`/stocks/${ticker}`)
    }

    useEffect(() => {
        if (!stock) dispatch(fetchStockData(ticker))
        if (!portfolio) dispatch(fetchPortfolio());
        dispatch(fetchAllStocks())
    }, [dispatch, ticker, stock, portfolio])




    return (

        <div className='buy-form-wrapper'>
            <div className='button-box' id='button-box'>
                <div id={`btn`}></div>
                <button type='button' className={`toggle-btn-one ${style ? 'active' : 'inactive'}`} onClick={buy}>Buy {ticker}</button>
                <button type='button' className={`toggle-btn-two ${style ? 'active' : 'inactive'}`} onClick={sell}>Sell {ticker}</button>
            </div>
            <form id="orderForm" onSubmit={handleSubmit}>
                <div className='section' id='top-section'>
                    <div className='order-type-label'>Order Type</div>
                    <div className='buy-order'>{name} Order</div>
                </div>
                <div className='section'>
                    <div className='buy-in'>{name}</div>
                    <div className='buy-in-option'>Shares</div>
                </div>
                <div className='section'>
                    <div className='shares-label'>Shares</div>
                    <input className='shares-input'
                        type='number'
                        placeholder='0'
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        required
                    />
                </div>
                <div className='error-blocks'>
                    {errors.shares && (<p className="error">*{errors.shares}</p>)}
                </div>
                <div id="line" className='section'>
                    <div className='market-price-label'>Market Price</div>
                    <div id='market-price'>${latestPrice}</div>
                </div>
                <div className='section'>
                    <div className='estimated-cost'>Estimated {order}</div>
                    <div className='estimated-cost'>${estimatedCost}</div>
                </div>
                <div className='centered-btn'>
                    {shares
                        && order === orderOption[0]
                        && !Object.values(errors).length
                        && estimatedCost < portfolio?.cash ? (
                        <OpenCustomModalButton
                            className={'order-btn'}
                            buttonText={'Trade Now'}
                            modalComponent={<BuyMessage />}
                        />
                    ) : order === orderOption[1]
                        && shares
                        && !Object.values(errors).length ? (
                        <OpenCustomModalButton
                            className={'order-btn'}
                            buttonText={'Trade Now'}
                            modalComponent={<SellMessage />}
                        />
                    ) : (
                        <button className='order-btn' type='submit'>Trade Now</button>

                    )}

                </div>
                <div className='centered-one'>
                    <div className='buying-power'>${portfolio?.cash ? portfolio?.cash?.toLocaleString() : 0} buying power available</div>
                </div>

            </form >
        </div >


    )
}

export default BuyForm;
