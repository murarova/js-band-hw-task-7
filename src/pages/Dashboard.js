import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteEditor from '../components/NoteEditor/NoteEditor';
import NoteList from '../components/NoteList/NoteList';
import Filter from '../components/Filter/Filter';
import Modal from '../components/Modal/Modal';
import '../index.css';

import * as modalActions from '../redux/actions/modalActions';
import * as notesActions from '../redux/actions/notesActions';
import * as filterActions from '../redux/actions/filterActions';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onSubmit(title, text, priority, id, done) {
        const { addNote, editNoteSuccess, closeModal } = this.props;
        if (!id) {
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
            editNoteSuccess(noteToAdd);
        }
        closeModal();
    }

    onCancel() {
        const { editNoteCancel, closeModal } = this.props;
        editNoteCancel();
        closeModal();
    }

    onEdit(id) {
        const { openModal, editNote } = this.props;
        openModal();
        editNote(id);
    }

    onFilterChange(e) {
        const { searchNotes } = this.props;
        if (e.target.value === 'all') {
            const newFilterValue = { [e.target.name]: '' };
            searchNotes({ ...newFilterValue });
            return;
        }
        if (e.target.value === 'open') {
            const newFilterValue = { [e.target.name]: false };
            searchNotes({ ...newFilterValue });
            return;
        }
        if (e.target.value === 'done') {
            const newFilterValue = { [e.target.name]: true };
            searchNotes({ ...newFilterValue });
            return;
        }
        const newFilterValue = { [e.target.name]: e.target.value };

        searchNotes({ ...newFilterValue });
    }

    render() {
        const { isModalOpen, openModal, closeModal, notes } = this.props;
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="text-center">JS-BAND-HW-TASK-7</h2>
                    <div>
                        {isModalOpen && (
                            <Modal onClose={closeModal}>
                                <NoteEditor
                                    onCancel={this.onCancel}
                                    onSubmit={this.onSubmit}
                                />
                            </Modal>
                        )}
                        <Filter
                            onChange={this.onFilterChange}
                            onClick={openModal}
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
    editNote: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    editNoteSuccess: PropTypes.func.isRequired,
    editNoteCancel: PropTypes.func.isRequired,
    searchNotes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isModalOpen: state.modal.isModalOpen,
    notes: state.notes.notes,
    filterState: state.filter.filterState,
});

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(modalActions.openModal()),
    closeModal: () => dispatch(modalActions.closeModal()),
    addNote: note => dispatch(notesActions.addNote(note)),
    editNote: id => dispatch(notesActions.editNote(id)),
    editNoteSuccess: note => dispatch(notesActions.editNoteSuccess(note)),
    editNoteCancel: () => dispatch(notesActions.editNoteCancel()),
    searchNotes: search => dispatch(filterActions.searchNotes(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
