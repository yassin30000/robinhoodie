//GET STOCK DATA

const GET_STOCK = "stocks/SET_STOCK";
const GET_ALL_STOCKS = 'stocks/GET_ALL_STOCKS'

const getAllStocks = (allStocks) => ({
    type: GET_ALL_STOCKS,
    payload: allStocks
})

const setStock = (stock) => ({
    type: GET_STOCK,
    payload: stock,
});

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
    const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=JCQDATAA7R7K8EBJ`)

    if (res.ok) {
        const data = await res.json();
        dispatch(setStock(data))
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
            const stock_data = action.payload
            // console.log(stock_data)
            const ticker = stock_data["Meta Data"]["2. Symbol"]
            newState[ticker] = stock_data
            return newState

        case GET_ALL_STOCKS:
            const allStocks = action.payload
            newState.allStocks = allStocks
            return newState

        default:
            return state;
    }
}