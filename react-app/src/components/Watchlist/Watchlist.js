import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWatchlists } from "../../store/watchlists";
import "../Watchlist/Watchlist.css";
import { useState } from "react";

function Watchlist() {
    const dispatch = useDispatch();
    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []
    const [rotatedItems, setRotatedItems] = useState({});

    const toggleRotate = (id) => {
        setRotatedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    useEffect(() => {
        dispatch(fetchUserWatchlists());
    }, [dispatch]);

    return (
        <>
            <div id="list-container">
                <div id="list-heading-container">
                    <p id="list-heading">Lists</p>
                    <p id="new-list-btn">+</p>
                </div>

                <div id="list-content">
                    {userWatchlists &&
                        userWatchlists.map((watchlist) => (

                            <div id="list-item-container">
                                <div id="list-item"
                                    key={watchlist.id}
                                    onClick={() => toggleRotate(watchlist.id)}
                                >
                                    <div id="left-side">
                                        <span class="material-icons eye-16">visibility</span>
                                        <span id="list-name">{watchlist.name}</span>
                                    </div>

                                    <div id="right-side">
                                        <span class="material-icons dots-16">more_horiz</span>
                                        <span
                                            class={rotatedItems[watchlist.id] ? "material-icons arrow rotate-180" : "material-icons arrow rotate-0"}>expand_more</span>
                                    </div>


                                </div>
                                {rotatedItems[watchlist.id] && (
                                    <div id="watchlist-stocks-container"
                                        className={
                                            watchlist.stocks.length > 0
                                                ? "with-border-bottom"
                                                : ""
                                        }>
                                        {watchlist.stocks.map((stock) => (
                                            <div key={stock.id}>
                                                <span id="list-ticker">{stock.ticker}</span>
                                                <span id="list-graph">graph</span>
                                                <span id="list-numbers-container">
                                                    <p id="list-price">$174.96</p>
                                                    <p id="list-percent">+0.56%</p>
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
