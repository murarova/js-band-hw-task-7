import { combineReducers } from 'redux';
import notesReducer from './reducers/notesReducer';
import modalReducer from './reducers/modalReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({
    notes: notesReducer,
    modal: modalReducer,
    filteredNotes: filterReducer,
});

export default rootReducer;
