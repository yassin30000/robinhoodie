// Action Type
const SET_ALL_OPINIONS = "opinions/SET_ALL_OPINIONS";

// Action Creator
const setAllOpinions = (opinions) => ({
    type: SET_ALL_OPINIONS,
    payload: opinions,
});

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

// Reducer
const initialState = {};

export default function opinionsReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_ALL_OPINIONS:
            const allOpinions = action.payload;
            newState.all_opinions = allOpinions;
            return newState;
        default:
            return state;
    }
}