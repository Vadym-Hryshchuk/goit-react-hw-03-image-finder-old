import React, { Component } from "react";
// import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onClickForEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onClickForEscape);
  }

  onClickForEscape = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  onClickForOverlay = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { chooseImage } = this.props;
    return createPortal(
      <Overlay onClick={this.onClickForOverlay}>
        <ModalWindow>
          <img src={chooseImage.url} alt={chooseImage.alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
