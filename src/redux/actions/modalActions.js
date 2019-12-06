export const modalActionTypes = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export const openModal = () => ({
    type: modalActionTypes.OPEN_MODAL,
    payload: true,
});

export const closeModal = () => ({
    type: modalActionTypes.CLOSE_MODAL,
    payload: false,
});
