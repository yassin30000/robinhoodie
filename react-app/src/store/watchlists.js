// Constants
const SET_USER_WATCHLISTS = "watchlists/SET_USER_WATCHLISTS";

// Action Creator
const setUserWatchlists = (watchlists) => ({
    type: SET_USER_WATCHLISTS,
    payload: watchlists,
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
        default:
            return state;
    }
}
