import { filterActionTypes } from '../actions/filterActions';

const initialState = {
    filterState: {
        title: '',
        priority: '',
        done: '',
    },
};

const filterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case filterActionTypes.SEARCH_NOTES:
            return {
                ...state,
                filterState: { ...state.filterState, ...payload },
            };

        default:
            return state;
    }
};

export default filterReducer;
