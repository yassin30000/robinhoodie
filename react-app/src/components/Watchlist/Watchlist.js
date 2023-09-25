import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWatchlists } from "../../store/watchlists";
import "../Watchlist/Watchlist.css";
import { useState } from "react";
import WatchlistFormModal from "../WatchlistFormModal/index.js";
import OpenCustomModalButton from "../OpenModalButton/OpenModalButton2";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import WatchlistUpdateModal from "../WatchlistUpdateModal";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Watchlist() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []
    const [rotatedItems, setRotatedItems] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleRotate = (id, event) => {
        // Check if the click target is the list item itself
        if (event.target.id === "list-item") {
            setRotatedItems((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
    };

    useEffect(() => {
        dispatch(fetchUserWatchlists());
    }, [dispatch]);

    const handleMoreHorizClick = (id) => {
        setActiveDropdown((prevActive) => (prevActive === id ? null : id));
    };

    return (
        <>
            <div id="list-container">
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
                                        <span class="material-icons dots-16" onClick={() => handleMoreHorizClick(watchlist.id)}>more_horiz</span>
                                        <span
                                            class={rotatedItems[watchlist.id] ? "material-icons arrow rotate-180" : "material-icons arrow rotate-0"}>expand_more</span>
                                    </div>

                                    {activeDropdown === watchlist.id && (
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
            </div >
        </>
    );
}

export default Watchlist;
