import Watchlist from '../Watchlist/Watchlist.js'
import './LandingPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpinions } from '../../store/opinions.js';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../store/session.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { fetchAllStocks, fetchAlpacaStocks } from '../../store/stocks.js';
import { fetchPortfolio } from '../../store/portfolio.js';
import { Link } from 'react-router-dom';
import LineChart2 from '../LineChart2/LineChart2.js';

// api key: JCQDATAA7R7K8EBJ [alphavantage]
function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const opinionsData = useSelector((state) => state.opinions.all_opinions);
    const usersData = useSelector((state) => state.session.allUsers)
    const stocksData = useSelector(state => state.stocks.allStocks)

    const allOpinions = opinionsData ? Object.values(opinionsData.opinions) : [];
    const allUsers = usersData ? Object.values(usersData.users) : [];
    const allStocks = stocksData ? Object.values(stocksData.stocks) : [];
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const alpacaState = useSelector(state => state.stocks.alpacaData)
    const options = { month: 'short', day: 'numeric', timeZone: "UTC" }

    const [viewAllOpinions, setViewAllOpinions] = useState(true);

    let portfolio_value = {}
    if (alpacaState && portfolio?.portfolio_stocks) {
        const alpacaData = alpacaState.bars
        let portfolio_data = {} // {ticker: # of shares owned}
        portfolio.portfolio_stocks.forEach(stock => {
            let ticker = stock.stock.ticker;
            if (portfolio_data[ticker] == undefined) {
                portfolio_data[ticker] = stock.shares
            } else {
                portfolio_data[ticker] += stock.shares
            }
        })
        // console.log(portfolio_data)
        Object.values(alpacaData)[0].forEach(dataPoint => {
            let date = new Date(dataPoint.t)
            portfolio_value[date.toLocaleDateString('en-us', options)] = 0;
            for (let ticker in portfolio_data) {
                if (portfolio_data[ticker] > 0) {
                    let result = alpacaData[ticker].find(value => value.t === dataPoint.t)
                    portfolio_value[date.toLocaleDateString('en-us', options)] += result.c * portfolio_data[ticker]
                }
            }
        })

    }
    const chartDates = Object.keys(portfolio_value);
    const chartValues = Object.values(portfolio_value).map(value => {
        value += portfolio.cash
        return value.toFixed(2)
    });
    const price_change = chartValues.pop() - chartValues.shift()

    const [open, setOpen] = useState(false);

    //grabbing the total amount of money they got from shares
    let total = 0
    let total_money

    if (portfolio?.portfolio_stocks) {
        for (let i = 0; i < portfolio?.portfolio_stocks.length; i++) {
            let number = portfolio?.portfolio_stocks[i]
            let amount = number?.shares * number?.price;
            total += amount
        }
        total_money = Number(total) + Number(portfolio?.cash.toFixed(2))
    }


    //adding the total amount of money from shares with total cash


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

    useEffect(() => {
        dispatch(fetchAllStocks());
        dispatch(fetchOpinions());
        dispatch(fetchAllUsers());
        dispatch(fetchAlpacaStocks(['AAPL', 'AMZN', 'BABA', 'BAD', 'DIS', 'F', 'GOOGL', 'META', 'MSFT', 'NFLX', 'NVDA', 'PYPL', 'RIVN', 'SNAP', 'TSLA', 'UBER']));
        dispatch(fetchPortfolio())
    }, [dispatch]);

    console.log(new Array(5).fill(0))
    return (
        <>
            <div id='graph'>

                {portfolio?.portfolio_stocks && <LineChart2 dates={chartDates} prices={chartValues} price_change={price_change} />}
                
            </div>


            <div id='buying-power-container' onClick={() => { setOpen(!open) }}>
                <div className={`buying-menu-trigger ${open ? 'active' : 'inactive'}`}>
                    <div id='buying-power-label'>Buying Power
                        {
                            !open ? <span id={`buying-power`}>${portfolio?.cash ? portfolio?.cash?.toFixed(2) : 0}
                                <span className='material-icons cash-arrow'>expand_more</span>

                            </span> : null
                        }
                    </div>
                    <div className={`buying-dropdown-menu ${open ? 'active' : 'inactive'}`}>
                        <div className='buying-info-grid'>
                            <div className='brokerage-grid'>
                                <div>Brokerage cash</div>
                                <div>${total_money}</div>
                            </div>
                            <div className='brokerage-grid'>
                                <div>Buying power</div>
                                <div>${portfolio?.cash}</div>
                            </div>
                            <div className='dep-div'>
                                <Link to='/portfolio/deposit-funds' className="deposit-btn">Deposit funds</Link>
                            </div>
                        </div>
                        <div className='buying-information'>
                            Buying power represents the total value of assets you can purchase. <span className='learn-more'>Learn more</span>
                        </div>
                    </div>
                </div>
            </div>

            <Watchlist />

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
                            <div id='opinion-content'>{opinion.content}</div>
                            <div id='opinion-ticker'>{getStockTicker(opinion.stock_id)}</div>
                        </div>
                    </div>
                )) :
                    allUsers && Array.isArray(allOpinions) && allOpinions?.filter(op => op.user_id === sessionUser.id).map((opinion, index) => (
                        <div key={index} id='opinion-container'>
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
