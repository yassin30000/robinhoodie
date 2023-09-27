import "./StockDetails.css";
import { useEffect, useState } from 'react';
import { fetchStockData } from "../../store/stocks";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LineChart2 from "../LineChart2/LineChart2";
import BuyForm from "../BuyForm/BuyForm";

import OpenCustomModalButton from "../OpenModalButton/OpenModalButton2";
import AddToListsModal from "../AddToListsModal";
import OpinionFormModal from "../OpinionFormModal";

import StockPosition from "./StockPosition/StockPosition";
import { fetchStockOpinions } from "../../store/opinions";
import OpinionUpdateModal from "../OpinionUpdateModal";
import ConfirmDeleteOpinion from "../ConfirmDeleteOpinion";


function StockDetails() {
    const { ticker } = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const stock = useSelector(state => state.stocks[ticker])
    const stock_info = useSelector(state => state.stocks.allStocks.stocks[`${ticker}`])
    const portfolio = useSelector(state => state.portfolio.portfolio.portfolio_stocks)
    const usersData = useSelector((state) => state.session.allUsers)
    const stocks_owned_by_user = portfolio?.filter(stock => Number(stock.stock_id) === Number(stock_info.id))
    const opinions_data = useSelector(state => state.opinions[stock_info.id])
    // console.log('STOCK::::', stock)
    //
    const allOpinions = opinions_data ? opinions_data : [];
    const allUsers = usersData ? Object.values(usersData.users) : [];
    //console.log(allUsers)
    const [viewAllOpinions, setViewAllOpinions] = useState(false);

    function getUserName(user_id) {
        if (allUsers) {
            let oneUser = allUsers.find(user => user.id == user_id)
            if (oneUser) return oneUser.username
        }
    }

    let latestPrice;
    let latestDate;
    let price_change;
    let percent_change;
    // [dollar amount, % change]

    let dates_array;
    let prices_array;

    if (stock) {
        let stock_prices_at_close = {}

        const stock_prices = stock['Time Series (Daily)']
        latestDate = Object.keys(stock_prices)[0]
        latestPrice = Number(stock_prices[latestDate]['4. close']).toFixed(2)

        const oldestDate = Object.keys(stock_prices)[Object.keys(stock_prices).length - 1]

        for (let key in stock_prices) {
            let newKey = new Date(key)
            stock_prices_at_close[newKey] = Number(stock_prices[key]['4. close'])
        }

        price_change = (latestPrice - stock_prices[oldestDate]['4. close'])
        percent_change = ((price_change / latestPrice) * 100)


        dates_array = Object.keys(stock_prices_at_close).slice(0, 30).reverse().map(date => {
            return date.slice(4, 10)
        })

        prices_array = Object.values(stock_prices_at_close).slice(0, 30).reverse()

    }
    //console.log(price_30_days_before)
    // console.log(dates_array)
    //console.log(price_change)

    useEffect(() => {
        if (!stock) {
            dispatch(fetchStockData(ticker))
        }
        dispatch(fetchStockOpinions(stock_info.id))
    }, [dispatch, ticker, stock, stock_info])


    let total_shares = 0;
    stocks_owned_by_user?.forEach(stock => {
        total_shares += stock.shares
    })


    return (
        <div id='stock-details-wholepage'>
            <div id='stock-details-container'>
                <p id='ticker-header'>{stock_info?.name}</p>
                <p id='ticker-price'>${latestPrice} <span id='price-as-of'>Closing price on {latestDate}</span></p>

                {price_change >= 0 && <div id='price-change-div'><p id='positive-price-changes'> <span>+${price_change.toFixed(2)}</span> (<span>+{percent_change.toFixed(2)}%</span>) </p><span>Past month</span></div>}
                {price_change < 0 && <div id='price-change-div'><p id='negative-price-changes'> <span>-${Math.abs(price_change.toFixed(2))}</span> (<span>-{Math.abs(percent_change).toFixed(2)}%</span>) </p><span>Past month</span></div>}


                {stock && <LineChart2 dates={dates_array} prices={prices_array} price_change={price_change} width={"100%"} />}


                {total_shares > 0 && <StockPosition latestPrice={latestPrice} stocks_owned_by_user={stocks_owned_by_user} />}

                {/* <div id="stock-opinions-container">

                    <div id='opinions-title'>Opinions</div>

                    {stock_opinions.length > 0 && stock_opinions.map((opinion, index) => {
                        return (<div key={index} id='opinion-container'>
                            <div id="opinion">
                                <div id='opinion-author'>{getUserName(opinion.user_id)}</div>
                                <div id='opinion-content'>{opinion.content}</div>
                            </div>
                        </div>)
                    })}

                </div> */}

                <div id='opinions-container'>

                    <div id='opinions-title'>Opinions</div>

                    <div id="opinons-filter-container">
                        <div id="all-opinions"
                            className={!viewAllOpinions ? 'unselected' : 'selected'}
                            onClick={() => setViewAllOpinions(true)}
                        >All Opinions</div>
                        <div id="my-opinons"
                            onClick={() => setViewAllOpinions(false)}
                            className={viewAllOpinions ? 'unselected' : 'selected'}
                        >My Opinions
                        </div>

                    </div>

                    {viewAllOpinions ? allUsers && Array.isArray(allOpinions) && allOpinions?.map((opinion, index) => (
                        <div key={index} id='opinion-container'>
                            <div id="opinion">
                                <div id='opinion-author'>{getUserName(opinion.user_id)}</div>
                                <div id='opinion-content'>
                                    {opinion.content.length > 400
                                        ? opinion.content.slice(0, 400) + '...'
                                        : opinion.content}
                                </div>                                
                                <div id='opinion-ticker'>{ticker}</div>
                            </div>
                        </div>
                    )) :
                        allUsers && Array.isArray(allOpinions) && allOpinions?.filter(op => op.user_id === sessionUser?.id).map((opinion, index) => (
                            <div key={index} id='opinion-container'>
                                <div id="opinion">
                                    <div id='opinion-author'>{getUserName(opinion.user_id)}
                                        <div id="edit-delete-opinion-container">
                                            <OpenCustomModalButton
                                                id="edit-opinion"
                                                buttonText={""}
                                                buttonHTML={<span class="material-symbols-outlined edit">edit</span>}

                                                modalComponent={<OpinionUpdateModal opinionId={opinion.id} prevContent={opinion.content} />}
                                            />
                                            <OpenCustomModalButton
                                                id="delete-opinion"
                                                buttonText={""}
                                                buttonHTML={<span className='material-icons delete-opinion'>close</span>}

                                                modalComponent={<ConfirmDeleteOpinion opinionId={opinion.id} />}
                                            />

                                        </div>

                                    </div>
                                    <div id='opinion-content'>
                                        {opinion.content.length > 400
                                            ? opinion.content.slice(0, 400) + '...'
                                            : opinion.content}
                                    </div>                                    
                                    <div id='opinion-ticker'>{ticker}</div>
                                </div>
                            </div>
                        ))}
                </div>




            </div>

            <div id="right-side-stock-details">


                <div id="order-stock-container">
                    <BuyForm />
                </div>

                <div id="add-to-lists-container">
                    {/* <button onClick={() => alert('Feature Coming Soon...')}>Trade {ticker} options</button> */}

                    <OpenCustomModalButton
                        buttonText={"Add to Lists"}
                        modalComponent={<AddToListsModal ticker={ticker} />}
                    />

                    <OpenCustomModalButton
                        buttonText={"Share your Opinion"}
                        modalComponent={<OpinionFormModal ticker={ticker} />}
                    />
                </div>
            </div>

        </div>
    );
}

export default StockDetails;
