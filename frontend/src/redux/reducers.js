import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, SET_SORT_BY, FETCH_MOVIES_SUCCESS  } from "./actionTypes"; // Assuming SET_SORT_BY is the action type for setting the sort option

const initialState = {
    movies: [],
    watchlist: [],
    sortBy: "default",
};

const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
            };
        case ADD_TO_WATCHLIST:
            return {
                ...state,
                watchlist: [...state.watchlist, action.payload],
            };
        case REMOVE_FROM_WATCHLIST:
            return {
                ...state,
                watchlist: state.watchlist.filter(id => id !== action.payload),
            };
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
