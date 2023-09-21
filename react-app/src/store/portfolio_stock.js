//Action Type
const NEW_SHARES = "portfolio_stocks/NEW_SHARES";

//Action Creator
const newShares = (shares) => ({
    type: NEW_SHARES,
    shares
});

//Thunk

export const addShares = (shares) => async (dispatch) => {
    const res = await fetch('/api/portfolio/buy-stocks')
}

//Reducer
const initialState = {}

export default function portfolioStockReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case NEW_SHARES:
            return [
                ...state,
            ]
    }
}
