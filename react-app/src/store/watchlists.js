// Constants
const SET_USER_WATCHLISTS = "watchlists/SET_USER_WATCHLISTS";
const CREATE_WATCHLIST = "watchlists/CREATE_WATCHLIST";
const DELETE_WATCHLIST = "watchlists/DELETE_WATCHLIST";
const UPDATE_WATCHLIST = "watchlists/UPDATE_WATCHLIST";
const ADD_STOCK_TO_WATCHLIST = 'ADD_STOCK_TO_WATCHLIST';
const DELETE_WATCHLIST_STOCK = "watchlists/DELETE_WATCHLIST_STOCK";


// Action Creator
const setUserWatchlists = (watchlists) => ({
    type: SET_USER_WATCHLISTS,
    payload: watchlists,
});

const createWatchlist = (newWatchlist) => ({
    type: CREATE_WATCHLIST,
    payload: newWatchlist,
});

const deleteWatchlist = (watchlistId) => ({
    type: DELETE_WATCHLIST,
    payload: watchlistId,
});

const updateWatchlist = (updatedWatchlist) => ({
    type: UPDATE_WATCHLIST,
    payload: updatedWatchlist,
});

const addStockToWatchlist = (watchlistId, stockId) => ({
    type: ADD_STOCK_TO_WATCHLIST,
    payload: { watchlistId, stockId },
});

const deleteWatchlistStock = (watchlistId, stockId) => ({
    type: DELETE_WATCHLIST_STOCK,
    payload: { watchlistId, stockId },
});

// Redux Thunk Function
export const fetchUserWatchlists = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/watchlists/`);

        if (res.ok) {
            const data = await res.json();
            dispatch(setUserWatchlists(data));
        }
    } catch (error) {
        console.error("Error fetching user watchlists:", error);
    }
};

export const createNewWatchlist = (watchlistData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/watchlists/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(watchlistData),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createWatchlist(data));
        }
    } catch (error) {
        console.error("Error creating a new watchlist:", error);
    }
};

export const deleteExistingWatchlist = (watchlistId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/watchlists/${watchlistId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            // Dispatch the action to delete the watchlist from the state
            dispatch(deleteWatchlist(watchlistId));
        } else {
            // Handle errors if necessary
            console.error("Error deleting watchlist:");
        }
    } catch (error) {
        console.error("Error deleting watchlist:", error);
    }
};

export const updateExistingWatchlist = (watchlistId, updatedWatchlistData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/watchlists/${watchlistId}`, {
            method: "PUT", // Use the appropriate HTTP method for updating
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedWatchlistData),
        });

        console.log('STORE RES: ', res)
        if (res.ok) {
            const updatedData = await res.json();
            dispatch(updateWatchlist(updatedData));
        } else {
            // Handle errors if necessary
            console.error("Error updating watchlist:");
        }
    } catch (error) {
        console.error("Error updating watchlist:", error);
    }
};

export const addStockToUserWatchlist = (watchlistId, stockId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/watchlists/${watchlistId}/${stockId}`, {
            method: "POST",
        });

        if (res.ok) {
            // Dispatch the action to add the stock to the watchlist
            dispatch(addStockToWatchlist(watchlistId, stockId));
        } else {
            // Handle errors if necessary
            console.error("Error adding stock to watchlist:");
        }
    } catch (error) {
        console.error("Error adding stock to watchlist:", error);
    }
};

export const deleteWatchlistStockThunk = (watchlistId, stockId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/watchlists/${watchlistId}/${stockId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteWatchlistStock(watchlistId, stockId));
        } else {
            // Handle errors if necessary
            console.error("Error deleting watchlist_stock:", res);
        }
    } catch (error) {
        console.error("Error deleting watchlist_stock:", error);
    }
};


// Reducer
const initialState = {
    userWatchlists: null,
};

export default function watchlistsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_WATCHLISTS:
            return {
                ...state,
                userWatchlists: action.payload,
            };
        case CREATE_WATCHLIST:
            return {
                ...state,
                userWatchlists: [...state.userWatchlists, action.payload],
            };
        case DELETE_WATCHLIST:
            return {
                ...state,
                userWatchlists: [...state.userWatchlists, action.payload],
            };
        case UPDATE_WATCHLIST:
            return {
                ...state,
                userWatchlists: [...state.userWatchlists, action.payload],
            };
        case DELETE_WATCHLIST_STOCK:
            return {
                ...state,
                userWatchlists: [...state.userWatchlists, action.payload],
            };

        default:
            return state;
    }
}
