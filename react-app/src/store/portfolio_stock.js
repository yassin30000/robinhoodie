//Action Type
const NEW_PORTFOLIO_SHARES = "portfolio_stocks/NEW_PORTFOLIO_SHARES";
const REMOVE_PORTFOLIO = 'portfolio/REMOVE_PORTFOLIO'

//Action Creator
const newPortfolioShares = (portfolioShares) => ({
    type: NEW_PORTFOLIO_SHARES,
    portfolioShares
});

const removePortfolio = () => ({
    type: REMOVE_PORTFOLIO
})

//Thunk

export const addShares = (sharesId, price, portfolioShares) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/buy-stocks/${sharesId}/${price}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(portfolioShares)
    })
    if (res.ok) {
        const stockShare = await res.json();
        dispatch(newPortfolioShares(stockShare))
        return stockShare;
    }
}

export const sellShares = (sharesId, price, portfolioShares) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/sell-stocks/${sharesId}/${price}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(portfolioShares)
    })
    if (res.ok) {
        const stockShare = await res.json();
        dispatch(newPortfolioShares(stockShare))
        return stockShare;
    }
}

export const logoutPortfolioStock = () => async dispatch => {
    await dispatch(removePortfolio())
}

//Reducer
const initialState = {
}

export default function portfolioStockReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case NEW_PORTFOLIO_SHARES:
            newState[action.portfolioShares.id] = action.portfolioShares;
            return newState
        case REMOVE_PORTFOLIO:
            return {portfolioStock: null}
        default:
            return state
    }
}
