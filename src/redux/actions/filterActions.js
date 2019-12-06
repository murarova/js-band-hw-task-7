export const filterActionTypes = {
    SEARCH_NOTES: 'SEARCH_NOTES',
};

export const searchNotes = search => {
    return {
        type: filterActionTypes.SEARCH_NOTES,
        payload: {
            ...search,
        },
    };
};
