import "./StockDetails.css";
import { useEffect } from 'react';
import { fetchStockData } from "../../store/stocks";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LineChart2 from "../LineChart2/LineChart2";

import OpenCustomModalButton from "../OpenModalButton/OpenModalButton2";
import AddToListsModal from "../AddToListsModal";

import StockPosition from "./StockPosition/StockPosition";
import { fetchStockOpinions } from "../../store/opinions";



function StockDetails() {
    const { ticker } = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const stock = useSelector(state => state.stocks[ticker])
    const stock_info = useSelector(state => state.stocks.allStocks.stocks[`${ticker}`])
    const portfolio = useSelector (state => state.portfolio.portfolio.portfolio_stocks)
    const stocks_owned_by_user = portfolio.filter(stock => Number(stock.stock_id) === Number(stock_info.id))

    // console.log('STOCK::::', stock)
    // 
    let latestPrice;
    let latestDate;
    let price_change;
    let percent_change;
    // [dollar amount, % change]

    let price_30_days_before;
    let date_30_days_before;
    let dates_array;
    let prices_array;

    if (stock) {
        let stock_prices_at_close = {}

        const stock_prices = stock['Time Series (Daily)']
        latestDate = Object.keys(stock_prices).shift()
        latestPrice = Number(stock_prices[latestDate]['4. close']).toFixed(2)


        for (let key in stock_prices) {
            let newKey = new Date(key)
            stock_prices_at_close[newKey] = Number(stock_prices[key]['4. close'])
        }
        let newDate = new Date(latestDate)
        date_30_days_before = newDate
        date_30_days_before.setDate((newDate.getDate() - 30))

        price_30_days_before = stock_prices_at_close[date_30_days_before]

        price_change = (latestPrice - price_30_days_before).toFixed(2)
        percent_change = ((price_change / latestPrice) * 100).toFixed(2)



        dates_array = Object.keys(stock_prices_at_close).slice(0, 30).reverse().map(date => {
            return date.slice(4, 10)
        })

        // console.log(dates_array)
        prices_array = Object.values(stock_prices_at_close).slice(0, 30).reverse()

    }


    useEffect(() => {
        if (!stock) dispatch(fetchStockData(ticker))
    }, [dispatch, ticker, stock])


    return (
        <div id='stock-details-container'>

            <>
                <p id='ticker-header'>{ticker}</p>
                <p id='ticker-price'>${latestPrice} <span id='price-as-of'>Closing price on {latestDate}</span></p>

                {price_change >= 0 && <div id='price-change-div'><p id='positive-price-changes'> <span>+${price_change}</span> (+<span>{percent_change}%</span>) </p><span>Past month</span></div>}
                {price_change < 0 && <div id='price-change-div'><p id='negative-price-changes'> <span>-${Math.abs(price_change)}</span> (<span>{percent_change}%</span>) </p><span>Past month</span></div>}

                <div id='line-chart2-container'>
                    {stock && <LineChart2 dates={dates_array} prices={prices_array} price_change={price_change} />}
                </div>

                {stocks_owned_by_user.length > 0 && <StockPosition latestPrice={latestPrice} stocks_owned_by_user={stocks_owned_by_user} />}

                <div id='temp-nav-bar'>
                    <span>Temporary Nav</span>
                    <Link className='temp-nav-link' to='/stocks/AAPL'>AAPL</Link>
                    <Link className='temp-nav-link' to='/stocks/DIS'>DIS</Link>
                    <Link className='temp-nav-link' to='/stocks/UBER'>UBER</Link>

                </div>

                    <Link className='temp-nav-link' to='/stocks/PYPL'>PYPL</Link>
                </div> 

            </>

            <div id="right-side-stock-details">


                <div id="order-stock-container">

                </div>

                <div id="add-to-lists-container">
                    <button onClick={() => alert('Feature Coming Soon...')}>Trade {ticker} options</button>

                    <OpenCustomModalButton
                        buttonText={"Add to Lists"}
                        modalComponent={<AddToListsModal ticker={ticker} />}
                    />


                </div>
            </div>

        </div>
    );
}

export default StockDetails;
