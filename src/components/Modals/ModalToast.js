import React from "react";
import { Modal } from "react-bootstrap";
import alertIconSm from "../../assets/images/icon-alert-sm.svg"
import dangerIcon from "../../assets/images/icon-alert.svg"

function ModalToast({ show, handleClose, title, text, type }) {
  return (
    <div data-cy="modal-information">
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-toast"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body onClick={handleClose} >
          <div data-cy="modal-information-icon" >
            <img src={type === "success" ? alertIconSm : dangerIcon} alt="" className="icon-danger-sm" />
          </div>
          <p data-cy="modal-information-title" className="pl-3 pr-3">{text}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalToast;
