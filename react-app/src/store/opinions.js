// Action Type
const SET_ALL_OPINIONS = "opinions/SET_ALL_OPINIONS";
const SET_STOCK_OPINIONS = 'opinions/SET_STOCK_OPINIONS'
const CREATE_OPINION = 'opinions/CREATE_OPINION';
const DELETE_OPINION = 'opinions/DELETE_OPINION';
const UPDATE_OPINION = 'opinions/UPDATE_OPINION';

// Action Creator
const setAllOpinions = (opinions) => ({
    type: SET_ALL_OPINIONS,
    payload: opinions,
});

const setStockOpinions = (opinions) => ({
    type: SET_STOCK_OPINIONS,
    payload: opinions
})

const createOpinionAction = (opinion) => ({
    type: CREATE_OPINION,
    payload: opinion,
});

const deleteOpinionAction = (opinionId) => ({
    type: DELETE_OPINION,
    payload: opinionId,
});

const updateOpinionAction = (opinion) => ({
    type: UPDATE_OPINION,
    payload: opinion,
});

// Redux Thunk Function
export const fetchOpinions = () => async (dispatch) => {
    try {
        const res = await fetch("/api/opinions/");

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

export const createOpinion = (stockId, content) => async (dispatch) => {
    try {
        const res = await fetch(`/api/opinions/${stockId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add any additional headers if needed (e.g., authentication token)
            },
            body: JSON.stringify({ content }),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createOpinionAction(data)); // Dispatch the action for creating a new opinion
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.log("Error creating opinion:", error);
        return error;
    }
};

export const deleteOpinion = (opinionId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/opinions/${opinionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed (e.g., authentication token)
            },
        });

        if (res.ok) {
            // Dispatch the action for deleting the opinion
            dispatch(deleteOpinionAction(opinionId));
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.log('Error deleting opinion:', error);
        return error;
    }
};

export const updateOpinion = (opinionId, content) => async (dispatch) => {
    try {
        const res = await fetch(`/api/opinions/${opinionId}`, {
            method: 'PUT', // Use the appropriate HTTP method for updating (e.g., PUT)
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed (e.g., authentication token)
            },
            body: JSON.stringify({ content }),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(updateOpinionAction(data)); // Dispatch the action for updating the opinion
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.log('Error updating opinion:', error);
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
        
        case SET_STOCK_OPINIONS:
            const stockOpinions = action.payload.opinions;
            if (stockOpinions.length) {

                newState[stockOpinions[0]["stock_id"]] = stockOpinions
            }
            return newState
        
        case CREATE_OPINION:
            const newOpinion = action.payload;
            const stockId = newOpinion.stock_id;
            if (!newState[stockId]) {
                newState[stockId] = [];
            }
            newState[stockId].push(newOpinion);
            return newState;
        
        case DELETE_OPINION:
            const deletedOpinionId = action.payload;
            for (const stockId in newState) {
                newState[stockId] = newState[stockId].filter(
                    (opinion) => opinion.id !== deletedOpinionId
                );
            }
            return newState;

        case UPDATE_OPINION:
            const updatedOpinion = action.payload;
            const updatedStockId = updatedOpinion.stock_id;
            if (newState[updatedStockId]) {
                const opinionIndex = newState[updatedStockId].findIndex(
                    (opinion) => opinion.id === updatedOpinion.id
                );
                if (opinionIndex !== -1) {
                    newState[updatedStockId][opinionIndex] = updatedOpinion;
                }
            }

            return newState;
        default:
            return state;
    }
}
