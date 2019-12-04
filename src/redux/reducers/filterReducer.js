import { filterActionTypes } from '../actions/filterActions';

const initialState = {
    filter: [],
};

const filterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case filterActionTypes.SEARCH_TASKS:
            return { ...state, filter: payload };
        case filterActionTypes.CLEAR_SEARCH:
            return { ...state, filter: payload };

        default:
            return state;
    }
};

export default filterReducer;
