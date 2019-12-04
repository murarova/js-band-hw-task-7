import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteEditor from '../NoteEditor/NoteEditor';
import NoteList from '../NoteList/NoteList';
import Filter from '../Filter/Filter';
import Modal from '../Modal/Modal';
import '../../index.css';

import * as modalActions from '../../redux/actions/modalActions';
import * as notesActions from '../../redux/actions/notesActions';
// import * as filterActions from '../../redux/actions/filterActions';

const INITIAL_FILTER_STATE = {
    title: '',
    priority: '',
    done: '',
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filterState: INITIAL_FILTER_STATE,
        };
    }

    // =====================
    // for save notes in LOCALSTORAGE, please, uncomment 2 methods below and
    // import LOCALSTORAGE from '../../services/localStorage';

    // componentDidMount() {
    //     const fromLS = LOCALSTORAGE.get('notes') || [];
    //     this.setState({ notes: fromLS, filteredNotes: fromLS });
    // }

    // componentDidUpdate() {
    //     const { notes } = this.state;
    //     LOCALSTORAGE.set(notes);
    // }
    // =====================

    onSubmit = (title, text, priority, id, done) => {
        const { closeModal, addNote } = this.props;

        if (id === '') {
            const noteToAdd = {
                done,
                title,
                text,
                priority,
                id: shortid.generate(),
            };
            addNote(noteToAdd);
        } else {
            const noteToAdd = {
                done,
                title,
                text,
                priority,
                id,
            };
            addNote(noteToAdd);
        }
        closeModal();
    };

    onEdit = id => {
        const currentNote = this.findNote(id)[0];
        // this.setState({ isModalOpen: true, note: currentNote });
        this.props.openModal();
        this.props.editNote(currentNote);
    };

    onClose = () => {
        this.props.closeModal();
    };

    onDone = id => {
        const { notes } = this.state;
        const currentNote = this.findNote(id)[0];
        const newNote = { ...currentNote, done: !currentNote.done };

        const newNotes = notes.map(note => (note.id === id ? newNote : note));
        this.setState({ notes: newNotes, filteredNotes: newNotes });
    };

    findNote = id => {
        const { notes } = this.props;
        return notes.filter(el => el.id === id);
    };

    onFilterChange = e => {
        const { filterState } = this.state;
        if (e.target.value === 'all') {
            const newFilterValue = { [e.target.name]: '' };

            this.setState(
                { filterState: { ...filterState, ...newFilterValue } },
                () => this.filterItems(),
            );
            return;
        }
        if (e.target.value === 'open') {
            const newFilterValue = { [e.target.name]: false };

            this.setState(
                { filterState: { ...filterState, ...newFilterValue } },
                () => this.filterItems(),
            );
            return;
        }
        if (e.target.value === 'done') {
            const newFilterValue = { [e.target.name]: true };

            this.setState(
                { filterState: { ...filterState, ...newFilterValue } },
                () => this.filterItems(),
            );
            return;
        }
        const newFilterValue = { [e.target.name]: e.target.value };

        this.setState(
            { filterState: { ...filterState, ...newFilterValue } },
            () => this.filterItems(),
        );
    };

    updateFilterNotes = (previousFilteredNotes, curentFilteredNotes) => {
        if (previousFilteredNotes.length > 0) {
            const arr = [];
            previousFilteredNotes.filter(note =>
                curentFilteredNotes.forEach(item => {
                    if (item.id === note.id) {
                        arr.push(item);
                    }
                }),
            );
            return arr;
        }
        return curentFilteredNotes;
    };

    filterItems = () => {
        const { filterState, notes, filteredNotes } = this.state;

        const isFomaStateEmpty = Object.values(filterState).every(
            el => el === '',
        );
        if (isFomaStateEmpty) {
            this.setState({ filteredNotes: notes });
        }

        let newFilterNotes = [];

        if (filteredNotes.title !== '') {
            const selectedNotes = notes.filter(item =>
                item.title
                    .toLowerCase()
                    .includes(filterState.title.toLowerCase()),
            );
            newFilterNotes = this.updateFilterNotes(
                newFilterNotes,
                selectedNotes,
            );
        }

        if (filterState.done !== '' && filterState.done !== 'all') {
            const selectedNotes = notes.filter(
                item => item.done === filterState.done,
            );
            newFilterNotes = this.updateFilterNotes(
                newFilterNotes,
                selectedNotes,
            );
        }

        if (filterState.priority !== '' && filterState.priority !== 'all') {
            const selectedNotes = notes.filter(
                item => item.priority === filterState.priority,
            );
            newFilterNotes = this.updateFilterNotes(
                newFilterNotes,
                selectedNotes,
            );
        }
        this.setState({ filteredNotes: newFilterNotes });
    };

    render() {
        const { isModalOpen, closeModal, notes, note } = this.props;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="text-center">JS-BAND-HW-TASK-6</h2>
                    <div>
                        {isModalOpen && (
                            <Modal onClose={closeModal}>
                                <NoteEditor
                                    note={note}
                                    onCancel={this.onClose}
                                    onSubmit={this.onSubmit}
                                />
                            </Modal>
                        )}
                        <Filter
                            onChange={this.onFilterChange}
                            onClick={this.onCreate}
                        />
                        {notes.length > 0 && (
                            <NoteList
                                onEdit={this.onEdit}
                                onDone={this.onDone}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.defaultProps = {
    note: {},
};

Dashboard.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    note: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        priority: PropTypes.string,
        id: PropTypes.string,
        done: PropTypes.bool,
    }),
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    // addNoteCancel: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    notes: state.notes.notes,
    note: state.notes.note,
    // filteredNotes: state.filteredNotes.filter,
    isModalOpen: state.modal.isModalOpen,
});

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(modalActions.openModal()),
    closeModal: () => dispatch(modalActions.closeModal()),
    addNote: note => dispatch(notesActions.addNote(note)),
    addNoteCancel: () => dispatch(notesActions.addNoteCancel()),
    editNote: note => dispatch(notesActions.editNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
