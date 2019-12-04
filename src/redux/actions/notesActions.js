export const notesActionTypes = {
    ADD_NOTE: 'ADD_NOTE',
    ADD_NOTE_CANCEL: 'ADD_NOTE_CANCEL',
    EDIT_NOTE: 'EDIT_NOTE',
    EDIT_NOTE_CANCEL: 'EDIT_NOTE_CANCEL',
    DELETE_NOTE: 'DELETE_NOTE',
    DONE_NOTE: 'DONE_NOTE',
};

export const addNote = note => ({
    type: notesActionTypes.ADD_NOTE,
    payload: {
        note,
    },
});

export const addNoteCancel = () => ({
    type: notesActionTypes.ADD_NOTE_CANCEL,
});

export const editNote = note => ({
    type: notesActionTypes.EDIT_NOTE,
    payload: {
        note,
    },
});

export const editNoteCancel = () => ({
    type: notesActionTypes.EDIT_NOTE_CANCEL,
});

export const deleteNote = id => ({
    type: notesActionTypes.DELETE_NOTE,
    payload: {
        id,
    },
});

export const doneNote = id => ({
    type: notesActionTypes.DONE_NOTE,
    payload: {
        id,
    },
});
