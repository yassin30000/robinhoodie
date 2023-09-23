import Watchlist from '../Watchlist/Watchlist.js'
import TransferForm from '../TransferFundForm/TransferForm.js'
import './LandingPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpinions } from '../../store/opinions.js';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../store/session.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { fetchAllStocks, fetchAlpacaStocks } from '../../store/stocks.js';
import { fetchPortfolio } from '../../store/portfolio.js';
import { Link } from 'react-router-dom';

// api key: JCQDATAA7R7K8EBJ [alphavantage]
function LandingPage() {


    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const dispatch = useDispatch();
    const opinionsData = useSelector((state) => state.opinions.all_opinions);
    const usersData = useSelector((state) => state.session.allUsers)
    const stocksData = useSelector(state => state.stocks.allStocks)

    const allOpinions = opinionsData ? Object.values(opinionsData.opinions) : [];
    const allUsers = usersData ? Object.values(usersData.users) : [];
    const allStocks = stocksData ? Object.values(stocksData.stocks) : [];
    const portfolio = useSelector(state => state.portfolio.portfolio)

    const [open, setOpen] = useState(false);


    // console.log('!!!!!!!!!ALL OPINIONS: ', allStocks)

    if (!sessionUser) history.push('/login')

    function getStockTicker(stock_id) {
        if (stock_id == 0) return "APPL"
        if (allStocks) {
            let oneStock = allStocks.find(stock => stock.id == stock_id)
            if (oneStock) return oneStock.ticker
        }
    }

    function getUserName(user_id) {
        if (allUsers) {
            let oneUser = allUsers.find(user => user.id == user_id)
            if (oneUser) return oneUser.username
        }
    }

    useEffect( () => {
        let end = new Date().toISOString()
        console.log(end)

        dispatch(fetchAllStocks());
        dispatch(fetchOpinions());
        dispatch(fetchAllUsers());
        dispatch(fetchAlpacaStocks(['AAPL', 'AMZN', 'BABA', 'BAD', 'DIS', 'F', 'GOOGL', 'LUCID', 'META', 'MSFT', 'NFLX', 'NVDA', 'PYPL', 'RIVN', 'SNAP', 'TSLA', 'UBER']));
        dispatch(fetchPortfolio())
    }, [dispatch]);


    return (
        <>
            <div id='graph'> graph goes here...</div>

            <div id='buying-power-container' onClick={() =>{setOpen(!open)}}>
                <div className='buying-menu-trigger'>
                    <div id='buying-power-label'>Buying Power</div>
                    {
                        !open?<div id={`buying-power`}>${portfolio?.cash.toFixed(2)}</div>:null
                    }
                </div>
               <div className={`buying-dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <div>Brokerage cash</div>
                    <div>Buying power {portfolio?.cash}</div>
                    <Link to='/portfolio/deposit-funds'>Deposit funds</Link>
               </div>
            </div>

            <Watchlist />

            <div id='opinions-container'>

                <div id='opinions-title'>Opinions</div>

                {allUsers && Array.isArray(allOpinions) && allOpinions?.map((opinion) => (
                    <div id='opinion-container'>
                        <div id="opinion">
                            <div id='opinion-author'>{getUserName(opinion.user_id)}</div>
                            <div id='opinion-content'>{opinion.content}</div>
                            <div id='opinion-ticker'>{getStockTicker(opinion.stock_id)}</div>
                        </div>
                    </div>
                ))}


            </div>
        </>
    );
}

export default LandingPage;
