import React, { Component } from 'react';
import { Overlay } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeModal = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  render() {
    const { photo } = this.props;
    return (
      <Overlay onClick={this.closeModal}>
        <div>
          <img src={photo} alt="name" width="900" height="700" />
        </div>
      </Overlay>
    );
  }
}
