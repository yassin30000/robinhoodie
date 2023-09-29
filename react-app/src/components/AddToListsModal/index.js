import { useDispatch, useSelector } from 'react-redux';
import './AddToListModal.css';
import { useEffect, useState } from 'react';
import { addStockToUserWatchlist, fetchUserWatchlists } from '../../store/watchlists';
import { fetchAllStocks } from '../../store/stocks';
import { useCustomModal } from '../../context/Modal2';
import { deleteWatchlistStockThunk } from '../../store/watchlists';

function AddToListsModal({ ticker }) {

    const dispatch = useDispatch();
    const { closeModal } = useCustomModal();

    const userWatchlistsData = useSelector((state) => state.watchlists.userWatchlists);
    const userWatchlists = userWatchlistsData ? Object.values(userWatchlistsData.watchlists) : []

    const stocksData = useSelector(state => state.stocks.allStocks)
    const allStocks = stocksData ? Object.values(stocksData.stocks) : [];
    const stock = allStocks.find(stock => stock.ticker === ticker)

    const initialSelectedWatchlists = userWatchlists.reduce((selected, watchlist) => {
        if (watchlist.stocks.some(watchlistStock => watchlistStock.stock_id === stock.id)) {
            selected[watchlist.id] = true;
        }
        return selected;
    }, {});

    const [selectedWatchlists, setSelectedWatchlists] = useState(initialSelectedWatchlists);

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
        userWatchlists.forEach((watchlist) => {
            if (!selectedIds.includes(watchlist.id)) dispatch(deleteWatchlistStockThunk(watchlist.id, stock.id));
        });
        for (let id of selectedIds) dispatch(addStockToUserWatchlist(id, stock.id));
        // dispatch(fetchUserWatchlists());
        // dispatch(fetchAllStocks());
        // window.location.reload();

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
                        userWatchlists.map((watchlist, index) => (
                            <div key={watchlist.id} id={`saved-lists-${index}}`} className='saved-lists' onClick={(e) => {handleCheckboxChange(watchlist.id)}}>
                                <input
                                    type="checkbox"
                                    id={`watchlist-${watchlist.id}`}
                                    checked={selectedWatchlists[watchlist.id] || false}
                                    onChange={() => handleCheckboxChange(watchlist.id)}
                                />

                                <div id="pic-container">
                                    <span className="material-icons big-eye">visibility</span>
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

