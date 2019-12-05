import { notesActionTypes } from '../actions/notesActions';

const initialState = {
    notes: [],
    note: {
        title: '',
        text: '',
        priority: 'high',
        id: '',
        done: false,
    },
};

const notesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case notesActionTypes.ADD_NOTE:
            return {
                ...state,
                notes: [payload.note, ...state.notes],
            };
        case notesActionTypes.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== payload.id),
            };

        case notesActionTypes.EDIT_NOTE:
            return {
                ...state,
                note: state.notes.find(note => note.id === payload.id),
            };

        case notesActionTypes.EDIT_SUCCESS:
            return {
                notes: state.notes.map(note =>
                    note.id === payload.note.id ? payload.note : note,
                ),
                note: {
                    title: '',
                    text: '',
                    priority: 'high',
                    id: '',
                    done: false,
                },
            };

        case notesActionTypes.EDIT_NOTE_CANCEL:
            return {
                ...state,
                note: {
                    title: '',
                    text: '',
                    priority: 'high',
                    id: '',
                    done: false,
                },
            };

        case notesActionTypes.DONE_NOTE:
            // eslint-disable-next-line no-case-declarations
            const currentNote = state.notes.find(
                note => note.id === payload.id,
            );
            // eslint-disable-next-line no-case-declarations
            const newNote = { ...currentNote, done: !currentNote.done };

            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === payload.id ? newNote : note,
                ),
            };

        default:
            return state;
    }
};

export default notesReducer;
