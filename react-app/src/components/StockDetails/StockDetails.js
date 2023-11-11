import "./StockDetails.css";
import { useEffect, useState } from 'react';
import { fetchAlpacaStocks } from "../../store/stocks";
import { useParams, Redirect } from "react-router-dom";
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

import { format } from 'date-fns'

function StockDetails() {
    const { ticker } = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const stock_info = useSelector(state => state.stocks.allStocks.stocks[`${ticker}`])
    const portfolio = useSelector(state => state.portfolio.portfolio?.portfolio_stocks)
    const usersData = useSelector((state) => state.session.allUsers)

    const opinions_data = useSelector(state => {
        return stock_info ? state.opinions[stock_info.id] : []})
    
    const alpacaData = useSelector(state => {
        return stock_info ? state.stocks.alpacaData.bars[ticker].slice(-30) : []
    })
    
    const allOpinions = opinions_data ? [...opinions_data].reverse() : [];
    const allUsers = usersData ? Object.values(usersData.users) : [];
    const [viewAllOpinions, setViewAllOpinions] = useState(true);
    
    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []
    
    useEffect(() => {
        let today = new Date().toISOString()
        const seconds = "0:00:00Z"
        let end = today.slice(0, 11) + seconds
        
        dispatch(fetchAlpacaStocks(['AAPL', 'AMZN', 'BABA', 'BAD', 'DIS', 'F', 'GOOGL', 'META', 'MSFT', 'NFLX', 'NVDA', 'PYPL', 'RIVN', 'SNAP', 'TSLA', 'UBER'], end));
        if (stock_info) {

            dispatch(fetchStockOpinions(stock_info.id))
        }
        
    }, [dispatch, ticker, stock_info])
    
    if (!stock_info) return <Redirect to='/404' />

    const stocks_owned_by_user = portfolio?.filter(stock => Number(stock.stock_id) === Number(stock_info.id))
    
    const stockAddedToList = () => {
        for (let list of userWatchlists) {
            for (let stock of list.stocks) {
                if (Number(stock.stock_id) === Number(stock_info.id)) {
                    return 'check'
                }
            }
        }
        return 'add'
    }

    function getUserName(user_id) {
        if (allUsers) {
            let oneUser = allUsers.find(user => user.id === user_id)
            if (oneUser) return oneUser.username
        }
    }


    let latestPrice, latestDate, price_change, percent_change, openPrice;

    let dates_array;
    let prices_array;

    if (alpacaData) {
        latestDate = new Date(Date.parse(alpacaData[alpacaData.length - 1]['t']))
        latestPrice = Number(alpacaData[alpacaData.length - 1]['c']).toFixed(2)
        openPrice = Number(alpacaData[alpacaData.length - 1]['o']).toFixed(2)


        price_change = (latestPrice - alpacaData[0]['c'])
        percent_change = ((price_change / latestPrice) * 100)


        dates_array = alpacaData.map(date => {
            let dateObj = new Date(Date.parse(date['t']))
            return format(dateObj, "MMM d")
        })
        prices_array = alpacaData.map(date => {
            return date.c
        })
    }



    let total_shares = 0;
    stocks_owned_by_user?.forEach(stock => {
        total_shares += stock.shares
    })


    return (
        <div id="stock-details-whole-page-container">


            <div id='stock-details-top-container'>
                <div id='stock-details-container'>
                    <p id='ticker-header'>{stock_info?.name}</p>
                    <p id='ticker-price'>${latestPrice} <span id='price-as-of'>Closing price on {format(latestDate, "PPP")}</span></p>

                    {price_change >= 0 && <div id='price-change-div'>
                        <p id='positive-price-changes'>
                            <span>+${price_change.toFixed(2)}</span>
                            <span>(+{percent_change.toFixed(2)}%)</span>
                        </p>
                        <span>Past month</span></div>}
                    {price_change < 0 && <div id='price-change-div'>
                        <p id='negative-price-changes'>
                            <span>-${Math.abs(price_change.toFixed(2))}</span>
                            <span>(-{Math.abs(percent_change).toFixed(2)}%)</span>
                        </p>
                        <span>Past month</span></div>}

                    <div id="graph-container">

                        {alpacaData && <LineChart2 dates={dates_array} prices={prices_array} price_change={price_change} width={"100%"} />}
                    </div>


                    {total_shares > 0 && <StockPosition latestPrice={latestPrice} stocks_owned_by_user={stocks_owned_by_user} openPrice={openPrice} />}

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

                        {viewAllOpinions ? allUsers && Array.isArray(allOpinions) && allOpinions?.slice(0, 10).map((opinion, index) => (
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
                            allUsers && Array.isArray(allOpinions) && allOpinions?.filter(op => op.user_id === sessionUser?.id).slice(0, 10).map((opinion, index) => (
                                <div key={index} id='opinion-container'>
                                    <div id="opinion">
                                        <div id='opinion-author'>{getUserName(opinion.user_id)}
                                            <div id="edit-delete-opinion-container">
                                                <OpenCustomModalButton
                                                    id="edit-opinion"
                                                    buttonText={""}
                                                    buttonHTML={<span className="material-symbols-outlined edit">edit</span>}

                                                    modalComponent={<OpinionUpdateModal opinionId={opinion.id} prevContent={opinion.content} location='stock-details' stockId={opinion.stock_id} />}
                                                />
                                                <OpenCustomModalButton
                                                    id="delete-opinion"
                                                    buttonText={""}
                                                    buttonHTML={<span className='material-icons delete-opinion'>close</span>}

                                                    modalComponent={<ConfirmDeleteOpinion opinionId={opinion.id} location='stock-details' stockId={opinion.stock_id} />}
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
                        <BuyForm latestPrice={Number(latestPrice)}/>
                    </div>

                    <div id="add-to-lists-container">
                        <OpenCustomModalButton
                            buttonText={"Add to Lists"}
                            buttonHTML={<span className="material-icons checkmark">{stockAddedToList()}</span>}
                            modalComponent={<AddToListsModal ticker={ticker} />}
                        />

                        <OpenCustomModalButton
                            buttonText={"Share your Opinion"}
                            modalComponent={<OpinionFormModal ticker={ticker} />}
                        />
                    </div>
                </div>

            </div >
        </div>


    );
}

export default StockDetails;
