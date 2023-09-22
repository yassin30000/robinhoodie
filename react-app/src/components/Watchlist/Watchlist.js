import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWatchlists } from "../../store/watchlists";
import "../Watchlist/Watchlist.css";
import { useState } from "react";


function Watchlist() {
    const dispatch = useDispatch();
    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []
    const [rotatedItems, setRotatedItems] = useState({}); // Maintain state for rotated items

    useEffect(() => {
        // Fetch the user's watchlists when the component mounts
        dispatch(fetchUserWatchlists()); // Replace 'userId' with the actual user's ID
    }, [dispatch]);

    const toggleRotate = (id) => {
        setRotatedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle the rotation status for the item
        }));
    };

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
                        ))}
                </div>
            </div>
        </>
    );
}

export default Watchlist;
