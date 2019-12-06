/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.backdropeRef = createRef();

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleBackDropClick = this.handleBackDropClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleBackDropClick(e) {
        const { onClose } = this.props;
        const { current } = this.backdropeRef;
        if (current && e.target !== current) return;
        onClose();
    }

    handleKeyPress(e) {
        const { onClose } = this.props;
        if (e.code !== 'Escape') return;
        onClose();
    }

    render() {
        const { children } = this.props;
        return (
            <div
                className="overlay"
                onClick={this.handleBackDropClick}
                ref={this.backdropeRef}
            >
                {children}
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
