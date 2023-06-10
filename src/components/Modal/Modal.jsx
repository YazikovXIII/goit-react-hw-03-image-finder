import React from 'react';
import { createPortal } from 'react-dom';
import { ModalBlock, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal');

export class Modal extends React.Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalHide();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.modalHide();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <ModalWrapper onClick={this.handleBackDrop}>
        <ModalBlock>{this.props.children}</ModalBlock>
      </ModalWrapper>,
      modalRoot
    );
  }
}
