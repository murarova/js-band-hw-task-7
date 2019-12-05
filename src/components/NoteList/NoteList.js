import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem/NoteItem';

import * as notesActions from '../../redux/actions/notesActions';

const NoteList = ({ notes, deleteNote, onEdit, doneNote }) => (
    <div className="row">
        <div className="col-xs-12">
            <ul className="note-list">
                {notes.map(note => {
                    const { title, text, priority, id, done } = note;
                    return (
                        <NoteItem
                            key={id}
                            title={title}
                            text={text}
                            id={id}
                            priority={priority}
                            done={done}
                            onDelete={() => deleteNote(id)}
                            onEdit={() => onEdit(id)}
                            onDone={() => doneNote(id)}
                        />
                    );
                })}
            </ul>
        </div>
    </div>
);

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteNote: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    doneNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    notes: state.notes.notes,
});

const mapDispatchToProps = dispatch => ({
    deleteNote: id => dispatch(notesActions.deleteNote(id)),
    doneNote: id => dispatch(notesActions.doneNote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
