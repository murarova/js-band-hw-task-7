export const filterActionTypes = {
    SEARCH_NOTE: 'SEARCH_NOTE',
    CLEAR_SEARCH: 'CLEAR_SEARCH',
};

export const searchNotes = search => ({
    type: filterActionTypes.SEARCH_TASKS,
    payload: search,
});

export const clearSearch = () => ({
    type: filterActionTypes.CLEAR_SEARCH,
    payload: {
        title: '',
        priority: '',
        done: '',
    },
});
