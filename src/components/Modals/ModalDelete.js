import React, { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import alertIcon from "../../assets/images/icon-alert.svg";
import { Creators as TodoActions } from "../../redux/TodoRedux";

function ModalDelete({
  show,
  handleClose,
  title,
  text,
  deletedItem,
  handleDelete,
}) {
  const dispatch = useDispatch();
  const deleteActivity = (data) =>
    dispatch(TodoActions.deleteActivityRequest(data));
  const resetState = () => dispatch(TodoActions.resetStateTodo());

  const {
    isLoadingDeleteActivity,
    dataDeleteActivity,
    errDeleteActivity,
    isLoadingDeleteItem,
    dataDeleteItem,
    errDeleteItem,
  } = useSelector((state) => state.todo);

  useEffect(() => {
    if (errDeleteActivity !== null || dataDeleteActivity) {
      handleClose();
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errDeleteActivity, dataDeleteActivity]);

  useEffect(() => {
    if (errDeleteItem !== null || dataDeleteItem) {
      handleClose();
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errDeleteItem, dataDeleteItem]);

  const handleClickDelete = () => {
    if (handleDelete) {
      handleDelete();
    } else {
      deleteActivity(deletedItem);
    }
  };

  return (
    <div data-cy="modal-delete">
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-delete"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="ModalDelete"
        data-cy="todo-modal-delete"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="pt-4">
            <img src={alertIcon} alt="alert" data-cy="modal-delete-icon" />
            <h4 className="font-weight-bold" data-cy="modal-delete-title">{title}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            className="pl-3 pr-3"
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button className="btn btn-secondary" data-cy="modal-delete-cancel-button" onClick={handleClose}>
            Batal
          </button>
          <button className="btn btn-danger" data-cy="modal-delete-confirm-button" onClick={handleClickDelete}>
            {(isLoadingDeleteActivity || isLoadingDeleteItem) ? (
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Hapus"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDelete;
