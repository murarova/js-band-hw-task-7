import { modalActionTypes } from '../actions/modalActions';

const initialState = {
    isModalOpen: false,
};

const modalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case modalActionTypes.OPEN_MODAL:
            return { ...state, isModalOpen: payload };
        case modalActionTypes.CLOSE_MODAL:
            return { ...state, isModalOpen: payload };
        default:
            return state;
    }
};

export default modalReducer;
