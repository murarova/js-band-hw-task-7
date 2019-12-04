/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as modalActions from '../../redux/actions/modalActions';

const Filter = ({ openModal, onChange }) => (
    <>
        <div className="row">
            <div className="col-xs-12">
                <form className="form-inline main-form">
                    <div className="col-xs-12 col-sm-5">
                        <div className="form-group width-100">
                            <input
                                type="text"
                                className="form-control width-100"
                                name="title"
                                placeholder="search by title"
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-2">
                        <div className="form-group width-100">
                            <select
                                className="form-control width-100"
                                name="done"
                                onChange={onChange}
                            >
                                <option value="all">all</option>
                                <option value="open">open</option>
                                <option value="done">done</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-2">
                        <div className="form-group width-100">
                            <select
                                className="form-control width-100"
                                name="priority"
                                onChange={onChange}
                            >
                                <option value="all">all</option>
                                <option value="high">high</option>
                                <option value="normal">normal</option>
                                <option value="low">low</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-3">
                        <div className="form-group width-100">
                            <button
                                type="button"
                                className="btn btn-primary width-100"
                                onClick={openModal}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
);

Filter.propTypes = {
    openModal: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    openModal: () => dispatch(modalActions.openModal()),
});

export default connect(null, mapDispatchToProps)(Filter);
