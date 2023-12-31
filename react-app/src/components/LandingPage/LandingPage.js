import Watchlist from '../Watchlist/Watchlist.js'
import './LandingPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpinions } from '../../store/opinions.js';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../store/session.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { fetchAllStocks, fetchAlpacaStocks } from '../../store/stocks.js';
import { fetchPortfolio, getTotalPortfolioValue } from '../../store/portfolio.js';
import { Link } from 'react-router-dom';
import { subMonths } from 'date-fns';
import LineChart2 from '../LineChart2/LineChart2.js';
import ConfirmDeleteOpinion from '../ConfirmDeleteOpinion/index.js';
import OpenCustomModalButton from '../OpenModalButton/OpenModalButton2.js';
import OpinionUpdateModal from '../OpinionUpdateModal/index.js';
import Footer from '../Footer/index.js';

// api key: JCQDATAA7R7K8EBJ [alphavantage]
function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const opinionsData = useSelector((state) => state.opinions.all_opinions);
    const usersData = useSelector((state) => state.session.allUsers)
    const stocksData = useSelector(state => state.stocks.allStocks)
    const allOpinions = opinionsData ? Object.values(opinionsData.opinions).reverse() : [];
    const allUsers = usersData ? Object.values(usersData.users) : [];
    const allStocks = stocksData ? Object.values(stocksData.stocks) : [];
    const portfolio = useSelector(state => state.portfolio.portfolio)
    const alpacaState = useSelector(state => state.stocks.alpacaData)
    const options = { month: 'short', day: 'numeric', timeZone: "UTC" }
    const [viewAllOpinions, setViewAllOpinions] = useState(true);

    //calculate how many shares of each stock in portfolio
    let portfolio_value = {}
    let portfolio_data = {} // {ticker: # of shares owned}
    if (alpacaState && portfolio) {
        const alpacaData = alpacaState.bars

        if (portfolio.portfolio_stocks) {
            portfolio.portfolio_stocks.forEach(stock => {
                let ticker = stock.stock.ticker;
                if (portfolio_data[ticker] === undefined) {
                    portfolio_data[ticker] = stock.shares
                } else {
                    portfolio_data[ticker] += stock.shares
                }
            })
        }

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

    //Chart Data
    const chartDates = Object.keys(portfolio_value);
    const chartValues = Object.values(portfolio_value).map(value => {
        value += portfolio.cash
        return value.toFixed(2)
    });
    const price_change = chartValues[chartValues.length - 1] - chartValues[0]

    //stock latest prices and stock chart data
    let latestPrices = {}
    let graphData = {}
    if (alpacaState) {
        const alpacaData = alpacaState.bars
        for (let ticker in alpacaData) {
            latestPrices[ticker] = {}
            latestPrices[ticker].price = alpacaData[ticker][alpacaData[ticker].length - 1].c;
            latestPrices[ticker].percentChange = ((alpacaData[ticker][alpacaData[ticker].length - 1].c - alpacaData[ticker][0].c) / alpacaData[ticker][0].c) * 100;
            graphData[ticker] = alpacaData[ticker].map(dataPoint => dataPoint.c)
        }
    }

    const [open, setOpen] = useState(false);

    if (!sessionUser) history.push('/login')

    function getStockTicker(stock_id) {
        if (stock_id === 0) return "APPL"
        if (allStocks) {
            let oneStock = allStocks.find(stock => stock.id === stock_id)
            if (oneStock) return oneStock.ticker
        }
    }

    function getUserName(user_id) {
        if (allUsers) {
            let oneUser = allUsers.find(user => user.id === user_id)
            if (oneUser) return oneUser.username
        }
    }

    const currentPortfolioValue = chartValues[chartValues.length - 1]
    useEffect(() => {

        
        dispatch(fetchAllStocks());
        dispatch(fetchOpinions());
        dispatch(fetchAllUsers());
        dispatch(fetchAlpacaStocks(['AAPL', 'AMZN', 'BABA', 'BAD', 'DIS', 'F', 'GOOGL', 'META', 'MSFT', 'NFLX', 'NVDA', 'PYPL', 'RIVN', 'SNAP', 'TSLA', 'UBER']));
        dispatch(fetchPortfolio())
        dispatch(getTotalPortfolioValue(currentPortfolioValue))
    }, [dispatch, currentPortfolioValue]);

    // console.log(portfolio?.cash)

    return (
        <div id='landingpage-whole-page-container'>

            <div className='landingpage-top-container'>
                <div id="landingpage-left-container">

                    <div id='portfolio-value-container'>

                        <p id='currentPortfolioValue'>${Number(currentPortfolioValue) ? Number(currentPortfolioValue).toLocaleString() : 0}</p>
                        {Number(price_change) ? (<p id={price_change > 0 ? 'portfolio-change-positive' : 'portfolio-change-negative'}>
                            {price_change > 0 ? <i className="fa-solid fa-caret-down fa-rotate-180"></i> : <i className="fa-solid fa-caret-down"></i>}
                            ${Math.abs(price_change.toFixed(2))} ({Math.abs(((price_change / chartValues[0]) * 100).toFixed(2))}%) <span>Past Month</span></p>) : <></>}
                    </div>

                    <div id='graph'>

                        {portfolio?.portfolio_stocks && <LineChart2 dates={chartDates} prices={chartValues} price_change={price_change} width={"100%"} />}
                        {portfolio?.message && <LineChart2 dates={chartDates} prices={new Array(15).fill(0)} price_change={price_change} width={"100%"} />}

                    </div>

                    <div id='buying-power-container'>
                        <div className={`buying-menu-trigger ${open ? 'active' : 'inactive'}`}>
                            <div id='buying-power-label' onClick={() => { setOpen(!open) }}>
                                {
                                    <>
                                        <div>
                                            <p>Buying Power</p>
                                        </div>
                                        <div id='buying-power-label-right'>
                                            <p id={`buying-power`}>${portfolio?.cash ? portfolio?.cash?.toFixed(2) : 0}</p>
                                            <p id='buying-power-arrow' className={open ? "material-icons arrow rotate-180" : "material-icons arrow rotate-0"}>expand_more</p>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className={`buying-dropdown-menu ${open ? 'active' : 'inactive'}`}>

                                {/* <div className='buying-information'>
                                    <p>Buying power represents the total value of assets you can purchase.</p>
                                </div> */}
                                <div className='buying-power-content'>
                                    {/* <div className='brokerage-grid'>
                                        <div>Brokerage cash</div>
                                        <div>${total_money}</div>
                                    </div> */}
                                    <div className='buying-power-row-container-1'>
                                        <div>Brokerage cash</div>
                                        <div id='actual-cash'>${portfolio?.cash?.toFixed(2)}</div>
                                    </div>

                                    <div className='buying-power-row-container-2'>
                                        <div>Total</div>
                                        <div>${portfolio?.cash?.toFixed(2)}</div>
                                    </div>

                                    <div className='transfer-button-container'>
                                        <Link to='/portfolio/deposit-funds' className="deposit-btn">Transfer funds</Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                    <div id='opinions-container'>

                        <div id='opinions-title'>Opinions</div>

                        <div id="opinons-filter-container">
                            <div id="all-opinions"
                                className={!viewAllOpinions ? 'unselected' : 'selected'}
                                onClick={() => setViewAllOpinions(true)}
                            >Trending Opinions</div>
                            <div id="my-opinons"
                                onClick={() => setViewAllOpinions(false)}
                                className={viewAllOpinions ? 'unselected' : 'selected'}
                            >My Opinions
                            </div>

                        </div>

                        {viewAllOpinions ? allUsers && Array.isArray(allOpinions) && allOpinions?.slice(0, 10).map((opinion, index) => (
                            <div key={index} id='opinion-container'>
                                <div id="opinion" >
                                    <div id='opinion-author'>{getUserName(opinion.user_id)}</div>
                                    <div id='opinion-content' >
                                        {opinion.content.length > 400
                                            ? opinion.content.slice(0, 400) + '...'
                                            : opinion.content}
                                    </div>
                                    <div id='opinion-ticker'>{getStockTicker(opinion.stock_id)}</div>
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

                                                    modalComponent={<OpinionUpdateModal opinionId={opinion.id} prevContent={opinion.content} location='landing-page'/>}
                                                />
                                                <OpenCustomModalButton
                                                    id="delete-opinion"
                                                    buttonText={""}
                                                    buttonHTML={<span className='material-icons delete-opinion'>close</span>}

                                                    modalComponent={<ConfirmDeleteOpinion opinionId={opinion.id} location='landing-page'/>}
                                                />

                                            </div>

                                        </div>
                                        <div id='opinion-content'>
                                            {opinion.content.length > 400
                                                ? opinion.content.slice(0, 400) + '...'
                                                : opinion.content}
                                        </div>
                                        <div id='opinion-ticker'>{getStockTicker(opinion.stock_id)}</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div id="landingpage-right-container">
                    <Watchlist portfolio_data={portfolio_data} latestPrices={latestPrices} chartDates={chartDates} graphData={graphData} />
                </div>

            </div>

            <div className='langing-page-bottom-container'>
                <Footer />
            </div>


        </div>
    );
}

export default LandingPage;
