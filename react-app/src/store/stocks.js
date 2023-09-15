//GET STOCK DATA

const GET_STOCK = "stocks/SET_STOCK";

const setStock = (stock) => ({
	type: GET_STOCK,
	payload: stock,
});

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
            let ticker = stock_data["Meta Data"]["2. Symbol"]
            newState[ticker] = stock_data
            return newState
		default:
			return state;
	}
}