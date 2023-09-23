//Action Type
const NEW_PORTFOLIO_FUNDS = "portfolio/newPortfolioFunds";
const PORTFOLIO_DETAILS = "portfolio/portfolioDetails";



//Action Creator
const newPortfolioFunds = (portfolioFunds) => ({
    type: NEW_PORTFOLIO_FUNDS,
    portfolioFunds
})

const myPortfolio = (portfolio) => ({
    type: PORTFOLIO_DETAILS,
    portfolio
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
        console.log(errors)
        return errors
    }
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
        methods: "PUT",
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
        default:
            return state;
    }
}
