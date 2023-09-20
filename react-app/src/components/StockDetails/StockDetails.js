import "./StockDetails.css";
import { useEffect } from 'react';
import { fetchStockData } from "../../store/stocks";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../LineChart/LineChart";
import Page404 from '../404Page/index';



function StockDetails() {
    const { ticker } = useParams()
    const dispatch = useDispatch()
    const stock = useSelector(state => state.stocks[ticker])

    // 
    let latestPrice;
    let latestDate;
    let price_change;
    let percent_change;
    // [dollar amount, % change]

    let price_30_days_before;
    let date_30_days_before;
    let chartData;

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

 

        const dates_array = Object.keys(stock_prices_at_close).slice(0,30).reverse()
        const prices_array = Object.values(stock_prices_at_close).slice(0, 30).reverse()
        chartData = {
            labels: dates_array,
            datasets: [{
                label: '$',
                data: prices_array,
                borderColor: price_change > 0 ? 'rgb(0, 200, 5)' : 'rgb(255, 0, 0)',
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: price_change > 0 ? 'rgb(0, 200, 5)' : 'rgb(255, 0, 0)',
            }]
        }

    }
    //


    useEffect(() => {
        if (!stock) dispatch(fetchStockData(ticker))
    }, [dispatch, ticker, stock])


    return (
        <div id='stock-details-container'>
            { stock ? (
            <> 
                <p id='ticker-header'>{ticker}</p>
                <p id='ticker-price'>${latestPrice} <span id='price-as-of'>Closing price on {latestDate}</span></p>

                {price_change >= 0 && <div id='price-change-div'><p id='positive-price-changes'> <span>+${price_change}</span> (+<span>{percent_change}%</span>) </p><span>Past month</span></div>}
                {price_change < 0 && <div id='price-change-div'><p id='negative-price-changes'> <span>-${Math.abs(price_change)}</span> (<span>{percent_change}%</span>) </p><span>Past month</span></div>}

                <div id='line-chart-container'>
                    {stock && <LineChart data={chartData} />}
                </div>


                <div id='temp-nav-bar'>
                    <span>Temporary Nav</span>
                    <Link className='temp-nav-link' to='/stocks/AAPL'>AAPL</Link>
                    <Link className='temp-nav-link' to='/stocks/SPY'>SPY</Link>
                    <Link className='temp-nav-link' to='/stocks/DIS'>DIS</Link>
                    <Link className='temp-nav-link' to='/stocks/UBER'>UBER</Link>
                </div> 
            </>
            ) : (<Page404 />)}
        </div>
    );
}

export default StockDetails;
