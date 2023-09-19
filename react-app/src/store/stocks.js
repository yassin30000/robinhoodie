//GET STOCK DATA

const GET_STOCK = "stocks/SET_STOCK";

const setStock = (stock) => ({
	type: GET_STOCK,
	payload: stock,
});

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

const initialState = {};

export default function stocksReducer(state = initialState, action) {
    let newState = { ...state }
	switch (action.type) {
		case GET_STOCK:
            const stock_data = action.payload
            const ticker = stock_data["Meta Data"]["2. Symbol"]
            newState[ticker] = stock_data
            return newState
		default:
			return state;
	}
}