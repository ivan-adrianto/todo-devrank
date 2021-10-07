import React from "react";
import { Modal } from "react-bootstrap";

function ModalToast({ show, handleClose, title, text, type }) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-toast"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body onClick={handleClose} >
          <div className={type === "success" ? "icon-alert-sm" : "icon-danger-sm"}></div>
          <p className="pl-3 pr-3">{text}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalToast;
