import { useDispatch, useSelector } from 'react-redux';
import './AddToListModal.css';
import { useEffect, useState } from 'react';
import { addStockToUserWatchlist, fetchUserWatchlists } from '../../store/watchlists';
import { fetchAllStocks } from '../../store/stocks';
import { useCustomModal } from '../../context/Modal2';

function AddToListsModal({ ticker }) {
    const { closeModal } = useCustomModal();
    const dispatch = useDispatch();
    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []

    const stocksData = useSelector(state => state.stocks.allStocks)
    const allStocks = stocksData ? Object.values(stocksData.stocks) : [];
    const stock = allStocks.find(stock => stock.ticker === ticker)

    const [selectedWatchlists, setSelectedWatchlists] = useState({});


    const handleCheckboxChange = (watchlistId) => {
        setSelectedWatchlists((prevSelected) => ({
            ...prevSelected,
            [watchlistId]: !prevSelected[watchlistId],
        }));
    };


    const handleAddToLists = () => {
        const selectedIds = Object.keys(selectedWatchlists).filter(
            (id) => selectedWatchlists[id]
        );

        for (let id of selectedIds) dispatch(addStockToUserWatchlist(id, stock.id));
        closeModal();
    };

    useEffect(() => {
        dispatch(fetchUserWatchlists());
        dispatch(fetchAllStocks());

    }, [dispatch]);

    return (
        <>
            <div id="add-to-lists-form-container">

                <div id='add-lists-heading'>
                    Add {ticker} to Your Lists
                    <span className="material-icons close-lists" onClick={closeModal}>close</span>
                </div>

                <form id='add-to-lists-form'>
                    {userWatchlists &&
                        userWatchlists.map((watchlist) => (
                            <div key={watchlist.id} id='saved-lists'>
                                <input
                                    type="checkbox"
                                    id={`watchlist-${watchlist.id}`}
                                    checked={selectedWatchlists[watchlist.id] || false}
                                    onChange={() => handleCheckboxChange(watchlist.id)}
                                />

                                <div id="pic-container">
                                    <span class="material-icons big-eye">visibility</span>

                                </div>


                                <label htmlFor={`watchlist-${watchlist.id}`}>
                                    {watchlist.name}
                                </label>
                            </div>
                        ))}

                </form>

                <div id="add-lists-btn-container">
                    <button type="button" onClick={handleAddToLists}>
                        Save Changes
                    </button>

                </div>

            </div>
        </>
    );
}

export default AddToListsModal;
