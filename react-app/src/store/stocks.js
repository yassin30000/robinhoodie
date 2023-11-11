const apiKeyId = process.env.REACT_APP_APCA_API_KEY_ID;
const apiSecretKey = process.env.REACT_APP_APCA_API_SECRET_KEY;

//GET STOCK DATA

const GET_STOCK = "stocks/SET_STOCK";
const GET_ALL_STOCKS = 'stocks/GET_ALL_STOCKS'
const SEARCH_STOCKS = "stocks/SEARCH_STOCKS"
const ALPACA_STOCKS = 'stocks/ALPACA_STOCKS'

const getAllStocks = (allStocks) => ({
    type: GET_ALL_STOCKS,
    payload: allStocks
})

const setStock = (stock) => ({
    type: GET_STOCK,
    payload: stock,
});

const searchStocks = (stocks) => ({
    type: SEARCH_STOCKS,
    payload: stocks
})

const alpacaStocks = (stocks) => ({
    type: ALPACA_STOCKS,
    payload: stocks
})

export const fetchAlpacaStocks = (tickers, end = '2023-09-21T0:00:00Z', start = '2023-08-25T0:00:00Z') => async dispatch => {
    //AAPL,TSLA
    //2020-04-01T0:00:00Z
    //2021-08-26T11:00:00Z
    const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${tickers}&start=${start}&end=${end}&timeframe=1D`
    const res = await fetch(url, {
        headers: {
            "Apca-Api-Key-Id": apiKeyId,
            "Apca-Api-Secret-Key": apiSecretKey
        }
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(alpacaStocks(data));
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}


export const fetchAllStocks = () => async (dispatch) => {
    const res = await fetch('/api/stocks/');

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllStocks(data));
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

export const fetchStockData = (ticker) => async (dispatch) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=JCQDATAA7R7K8EBJ`
    const res = await fetch(url)

    if (res.ok) {
        const data = await res.json();
        if (!data["Error Message"]) {
            dispatch(setStock(data))
        }
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

export const search = (search_stocks) => async (dispatch) => {
    const res = await fetch(`api/stocks/${search}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(searchStocks(data));
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

const initialState = {};

export default function stocksReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_STOCK:
            const stock_data = action.payload;
            const ticker = stock_data["Meta Data"]["2. Symbol"];
            newState[ticker] = stock_data;
            return newState

        case GET_ALL_STOCKS:
            const allStocks = action.payload;
            newState.allStocks = allStocks;
            return newState
        case SEARCH_STOCKS:
            const searchedStocks = action.payload;
            newState["search"] = searchedStocks
            return newState
        case ALPACA_STOCKS:
            const alpacaStocks = action.payload;
            newState['alpacaData'] = alpacaStocks;
            return newState
        default:
            return state;
    }
}