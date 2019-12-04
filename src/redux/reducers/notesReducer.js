import { notesActionTypes } from '../actions/notesActions';

const initialState = {
    notes: [],
    note: undefined,
};

const notesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case notesActionTypes.ADD_NOTE:
            return {
                notes: [payload.note, ...state.notes],
            };
        case notesActionTypes.DELETE_NOTE:
            return {
                notes: state.notes.filter(note => note.id !== payload),
            };

        case notesActionTypes.EDIT_TASK:
            return {
                note: state.notes.find(note => note.id === payload),
            };
        default:
            return state;
    }
};

export default notesReducer;
