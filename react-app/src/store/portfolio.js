//Action Type
const NEW_PORTFOLIO_FUNDS = "portfolio/newPortfolioFunds";
const PORTFOLIO_DETAILS = "portfolio/portfolioDetails";
const TOTAL_PORTFOLIO_VALUE = 'portfolio/totalValue'
const REMOVE_PORTFOLIO = 'portfolio/REMOVE_PORTFOLIO'

//Action Creator
const newPortfolioFunds = (portfolioFunds) => ({
    type: NEW_PORTFOLIO_FUNDS,
    portfolioFunds
})

const myPortfolio = (portfolio) => ({
    type: PORTFOLIO_DETAILS,
    portfolio
})

const totalPortfolioValue = (total) => ({
    type: TOTAL_PORTFOLIO_VALUE,
    payload: total
})

const removePortfolio = () => ({
    type: REMOVE_PORTFOLIO
})
//Thunk

export const fetchPortfolio = () => async (dispatch) => {
    const res = await fetch(`/api/portfolio/`);

    if (res.ok) {
        const details = await res.json();
        dispatch(myPortfolio(details));
        return details;
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getTotalPortfolioValue = (total) => async dispatch => {
    await dispatch(totalPortfolioValue(total))
}

export const logoutPortfolio = () => async dispatch => {
    await dispatch(removePortfolio())
}

export const createFunds = (cash) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/deposit-funds`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(cash)
    })
    if (res.ok) {
        const newFunds = await res.json();
        dispatch(newPortfolioFunds(newFunds))
        return newFunds;
    }
}

export const addFunds = (cash) => async (dispatch) => {
    const res = await fetch(`/api/portfolio/deposit-funds`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(cash)
    })
    if (res.ok) {
        const newFunds = await res.json();
        dispatch(newPortfolioFunds(newFunds))
        return newFunds;
    }
}

export const withdrawFunds = (cash) => async (dispatch) => {
    const res = await fetch('/api/portfolio/withdraw-funds', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(cash)
    })
    if (res.ok) {
        const newFunds = await res.json();
        dispatch(newPortfolioFunds(newFunds))
        return newFunds;
    }
}

//Reducer

const initialState = {}

export default function portfolioReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case PORTFOLIO_DETAILS:
            const portfolioData = action.portfolio;
            newState.portfolio = portfolioData;
            return newState
        case NEW_PORTFOLIO_FUNDS:
            newState[action.portfolioFunds.id] = action.portfolioFunds;
            return newState
        case TOTAL_PORTFOLIO_VALUE:
            newState['totalValue'] = action.payload;
            return newState
        case REMOVE_PORTFOLIO:
            return {portfolio: null}
        default:
            return state;
    }
}
