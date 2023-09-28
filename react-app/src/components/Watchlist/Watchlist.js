import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWatchlists } from "../../store/watchlists";
import "../Watchlist/Watchlist.css";
import { useState } from "react";
import WatchlistFormModal from "../WatchlistFormModal/index.js";
import OpenCustomModalButton from "../OpenModalButton/OpenModalButton2";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import WatchlistUpdateModal from "../WatchlistUpdateModal";
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import LineChart from "../LineChart/LineChart";


function Watchlist({ portfolio_data, latestPrices, chartDates, graphData }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []
    const stocksData = useSelector(state => state.stocks.allStocks)
    const stocks = stocksData ? stocksData.stocks : [];
    const [rotatedItems, setRotatedItems] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null); // Ref to the dropdown element


    const toggleRotate = (id, event) => {
        // Check if the click target is the list item itself
        if (event.target.id !== "watchlist-dots") {
            setRotatedItems((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
    };

    useEffect(() => {
        dispatch(fetchUserWatchlists());

        document.addEventListener("click", closeDropdown);
        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [dispatch]);

    const handleMoreHorizClick = (id, event) => {
        event.stopPropagation();

        setActiveDropdown((prevActive) => (prevActive === id ? null : id));
    };

    const closeDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    //does the user own any share?
    const hasShares = Object.values(portfolio_data).reduce((accum, shares) => {
        return accum += shares
    }, [])

    //make shares array for mapping
    let sharesArray = []

    for (let key in portfolio_data) {
        if (portfolio_data[key] === 0) {
            delete portfolio_data[key]
        }
        const o = new Object()
        o['shares'] = portfolio_data[key]
        o['ticker'] = key
        o['stock_id'] = stocks[key].id

        sharesArray.push(o)
    }
    // console.log(sharesArray)
    //console.log(latestPrices)
    return (
        <>
            <div id="list-container">
                {hasShares &&
                    <div id='portfolio-stock-heading-container'>
                        <p id="portfolio-stock-list-heading">Stocks</p>
                        <div id="portfolio-stocks-container"
                            className={
                                sharesArray.length > 0
                                    ? "with-border-bottom"
                                    : ""
                            }>
                            {sharesArray.map((stock, index) => (
                                <div className='stock-shares-container' key={stock.id} onClick={() => history.push(`/stocks/${stock.ticker}`)}>
                                    <p id='list-shares-container'>
                                        <p id="list-ticker">{stock.ticker}</p>
                                        <p id="list-shares">{stock.shares} Shares</p>
                                    </p>
                                    <span id="list-graph"><LineChart dates={chartDates} prices={graphData[stock.ticker]} price_change={latestPrices[stock.ticker].percentChange} /></span>
                                    <span id="list-numbers-container">
                                        <p id="list-price">${latestPrices[stock.ticker].price.toFixed(2)}</p>
                                        <p id={latestPrices[stock.ticker].percentChange > 0 ? "list-percent-positive" : "list-percent-negative"}>{latestPrices[stock.ticker].percentChange > 0 ? '+' : '-'}{(Math.abs(latestPrices[stock.ticker].percentChange)).toFixed(2)}%</p>
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>

                }

                <div id="list-heading-container">
                    <p id="list-heading">Lists</p>
                    <p id="new-list-btn">
                        <OpenCustomModalButton
                            buttonText={"+"}
                            modalComponent={<WatchlistFormModal />}
                        />
                    </p>
                </div>

                <div id="list-content">
                    {userWatchlists &&
                        userWatchlists.map((watchlist) => (

                            <div id="list-item-container" key={watchlist.id}>
                                <div id="list-item"
                                    key={watchlist.id}
                                    onClick={(event) => toggleRotate(watchlist.id, event)}
                                >
                                    <div id="left-side">
                                        <span class="material-icons eye-16">visibility</span>
                                        <span id="list-name">{watchlist.name}</span>
                                    </div>

                                    <div id="right-side">
                                        <span id='watchlist-dots' class="material-icons dots-16" onClick={(event) => handleMoreHorizClick(watchlist.id, event)}>more_horiz</span>
                                        <span id="watchlist-arrow"
                                            class={rotatedItems[watchlist.id] ? "material-icons arrow rotate-180" : "material-icons arrow rotate-0"}>expand_more</span>
                                    </div>

                                    {activeDropdown === watchlist.id && (
                                        <div id="dots-dropdown-container" ref={dropdownRef}>


                                            <div id="dots-drowpdown-menu">

                                                <OpenCustomModalButton
                                                    id="edit-option"
                                                    buttonText={"Edit list"}
                                                    buttonHTML={<span className='material-icons edit'>edit</span>}
                                                    modalComponent={<WatchlistUpdateModal prevListName={watchlist.name} listId={watchlist.id} />}
                                                />

                                                <OpenCustomModalButton
                                                    id="delete-option"
                                                    buttonText={"Delete list"}
                                                    buttonHTML={<span className='material-icons delete'>delete</span>}

                                                    modalComponent={<ConfirmDeleteModal listName={watchlist.name} listTotal={watchlist.stocks.length} listId={watchlist.id} />}
                                                />
                                            </div>
                                        </div>
                                    )}

                                </div>
                                {rotatedItems[watchlist.id] && (
                                    <div id="watchlist-stocks-container"
                                        className={
                                            watchlist.stocks.length > 0
                                                ? "with-border-bottom"
                                                : ""
                                        }>
                                        {watchlist.stocks.map((stock) => (
                                            <div key={stock.id} onClick={() => history.push(`/stocks/${stock.ticker}`)}>
                                                <span id="list-ticker">{stock.ticker}</span>
                                                <span id="list-graph"><LineChart dates={chartDates} prices={graphData[stock.ticker]} price_change={latestPrices[stock.ticker].percentChange} /></span>
                                                <span id="list-numbers-container">
                                                    <p id="list-price">${latestPrices[stock.ticker].price.toFixed(2)}</p>
                                                    <p id={latestPrices[stock.ticker].percentChange > 0 ? "list-percent-positive" : "list-percent-negative"}>{latestPrices[stock.ticker].percentChange > 0 ? '+' : '-'}{(Math.abs(latestPrices[stock.ticker].percentChange)).toFixed(2)}%</p>

                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Watchlist;
