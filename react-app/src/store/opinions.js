// Action Type
const SET_ALL_OPINIONS = "opinions/SET_ALL_OPINIONS";
const SET_STOCK_OPINIONS = 'opinions/SET_STOCK_OPINIONS'
// Action Creator
const setAllOpinions = (opinions) => ({
    type: SET_ALL_OPINIONS,
    payload: opinions,
});

const setStockOpinions = (opinions) => ({
    type: SET_STOCK_OPINIONS,
    payload: opinions
})

// Redux Thunk Function
export const fetchOpinions = () => async (dispatch) => {
    try {
        const res = await fetch("api/opinions/");

        if (res.ok) {
            const data = await res.json();
            dispatch(setAllOpinions(data)); // Dispatch the action created by setAllOpinions
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching opinions:", error);
        return error;
    }
};

export const fetchStockOpinions = (stockId) => async dispatch => {
    try {
        const res = await fetch(`/api/opinions/stock/${stockId}`);

        if (res.ok) {
            const data = await res.json();
            dispatch(setStockOpinions(data)); // Dispatch the action created by setAllOpinions
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching opinions:", error);
        return error;
    }
}

// Reducer
const initialState = {};

export default function opinionsReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_ALL_OPINIONS:
            const allOpinions = action.payload;
            newState.all_opinions = allOpinions;
            return newState;
        case SET_STOCK_OPINIONS:
            const stockOpinions = action.payload.opinions;
            newState[stockOpinions[0]["stock_id"]] = stockOpinions
            return newState
        default:
            return state;
    }
}
