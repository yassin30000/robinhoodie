// import { useDispatch, useSelector } from 'react-redux';
// import { useCustomModal } from '../../context/Modal2';
// import { deleteWatchlistStockThunk } from '../../store/watchlists';
// import './RemoveFromWatchlist.css'


// function RemoveFromWatchlist({ listName, listId, latestPrices }) {

//     const dispatch = useDispatch();
//     const { closeModal } = useCustomModal();

//     const listStocks = useSelector(state => state.watchlists.userWatchlists.watchlists[listId].stocks);

//     const stocksData = useSelector(state => state.stocks.allStocks)
//     const stocks = stocksData ? stocksData.stocks : [];

//     const getStockName = (ticker) => {
//         return stocks[ticker].name;
//     }

//     const handleRemoveStock = (stockId) => {
//         dispatch(deleteWatchlistStockThunk(listId, stockId))
//         closeModal();
//         window.location.reload();
//     }

//     return (
//         <>

//             <div id="watchlist-details-container">


//                 <div id="watchlist-details-heading-container">

//                     <div>{listName}</div>
//                 </div>

//                 <div id="watchlist-details-table-container">


//                     <p id='first-table-heading'>Name</p>
//                     <p>Symbol</p>
//                     <p>Price</p>
//                     <p>Today</p>


//                     {listStocks && listStocks.map((stock) => (
//                         <div key={stock.id}>
//                             <span id="list-table-ticker">{getStockName(stock.ticker)}</span>
//                             <span id="list-table-ticker">{stock.ticker}</span>
//                             {/* <span id="list-graph"><LineChart dates={chartDates} prices={graphData[stock.ticker]} price_change={latestPrices[stock.ticker].percentChange} /></span> */}
//                             <span id="list-table-numbers-container">
//                                 <p id="list-table-price">${latestPrices[stock.ticker].price.toFixed(2)}</p>
//                                 <p id={latestPrices[stock.ticker].percentChange > 0 ? "list-percent-positive" : "list-percent-negative"}>{latestPrices[stock.ticker].percentChange > 0 ? '+' : '-'}{(Math.abs(latestPrices[stock.ticker].percentChange)).toFixed(2)}%</p>
//                                 <span onClick={() => handleRemoveStock(stock.id)} className='material-icons delete'>close</span>                    </span>
//                         </div>
//                     ))
//                     }
//                 </div>


//             </div>

//         </>
//     )
// }

// export default RemoveFromWatchlist;

import { useDispatch, useSelector } from 'react-redux';
import { useCustomModal } from '../../context/Modal2';
import { deleteWatchlistStockThunk } from '../../store/watchlists';
import './RemoveFromWatchlist.css'
import { useEffect, useState } from 'react';
import { fetchUserWatchlists } from '../../store/watchlists';

function RemoveFromWatchlist({ listName, listId, latestPrices }) {
    const dispatch = useDispatch();
    const { closeModal } = useCustomModal();

    const listStocks = useSelector(state => state.watchlists.userWatchlists.watchlists[listId].stocks);
    const stocksData = useSelector(state => state.stocks.allStocks)
    const stocks = stocksData ? stocksData.stocks : [];

    const [stockList, setStockList] = useState([]);



    const getStockName = (ticker) => {
        return stocks[ticker].name;
    }

    const handleRemoveStock = (stockId) => {
        dispatch(deleteWatchlistStockThunk(listId, stockId))

        setStockList(prevStocks => prevStocks.filter(stock => stock.stock_id !== stockId));
    }

    const handleSaveChanges = () => {
        dispatch(fetchUserWatchlists())
        closeModal();
    }

    useEffect(() => {
        setStockList(listStocks || []);
    }, [listStocks]);

    return (
        <div id="watchlist-details-container">
            <div id="watchlist-details-heading-container">
                <div>{listName}</div>
            </div>

            <table id="watchlist-details-table">
                <thead>
                    <tr>
                        <th id='th-name'>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Today</th>
                    </tr>
                </thead>
                <tbody>
                    {stockList && stockList.map((stock) => (
                        <tr id='tr-stock-item' key={stock.id}>
                            <td id='td-stock-name'>{getStockName(stock.ticker)}</td>
                            <td>{stock.ticker}</td>
                            <td>${latestPrices[stock.ticker].price.toFixed(2)}</td>
                            <td id={latestPrices[stock.ticker].percentChange > 0 ? "list-percent-positive" : "list-percent-negative"}>
                                {latestPrices[stock.ticker].percentChange > 0 ? '+' : '-'}
                                {(Math.abs(latestPrices[stock.ticker].percentChange)).toFixed(2)}%
                            </td>
                            <td id='td-close-btn'>
                                <span id='td-close-btn-actual' onClick={() => handleRemoveStock(stock.stock_id)} className='material-icons delete'>close</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div id="table-save-changes-btn-container">
                <button onClick={handleSaveChanges}>Save Changes</button>

            </div>
        </div>
    )
}

export default RemoveFromWatchlist;
