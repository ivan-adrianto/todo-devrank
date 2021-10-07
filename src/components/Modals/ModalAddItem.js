import React, { useEffect, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Select from "react-select";
import { Creators as TodoActions } from "../../redux/TodoRedux";

function ModalAddItem({ show, handleClose, title, text }) {
  const params = useParams().todoId;
  const dispatch = useDispatch();
  const addItem = (data) => dispatch(TodoActions.addItemRequest(data));
  const resetState = () => dispatch(TodoActions.resetStateTodo());

  const { isLoadingAddItem, errAddItem, dataAddItem } = useSelector(
    (state) => state.todo
  );

  const [itemName, setItemName] = useState("");
  const [priority, setPriority] = useState("very-high");

  useEffect(() => {
    if (errAddItem !== null || dataAddItem) {
      handleClose();
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errAddItem, dataAddItem]);

  const options = [
    {
      value: "very-high",
      label: "Very High",
    },
    {
      value: "high",
      label: "High",
    },
    {
      value: "medium",
      label: "Medium",
    },
    {
      value: "low",
      label: "Low",
    },
    {
      value: "very-low",
      label: "Very Low",
    },
  ];

  const formatOptionLabel = ({ value, label }) => (
    <div className="d-flex align-items-center">
      <div className={`label-indicator ${value}`}></div>
      <div>{label}</div>
    </div>
  );

  const submitAdd = () => {
    const data = {
      title: itemName,
      activity_group_id: params,
      priority
    }
    addItem(data);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-add-activity"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="pt-4">
            <h4 className="font-weight-bold">Tambah List Item</h4>
            <div className="icon-close" onClick={handleClose}></div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <label>NAMA LIST ITEM</label>
            <Form.Control
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Tambahkan nama Activity"
              id="AddFormTitle"
            />
            <label>PRIORITY</label>
            <br />
            <Select
              defaultValue={options[0]}
              formatOptionLabel={formatOptionLabel}
              options={options}
              className="select-priority"
              onChange={(e) => setPriority(e.value)}
              id="AddFormPriority"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button
            className="btn btn-primary"
            onClick={submitAdd}
            disabled={itemName === ""}
            id="AddFormSubmit"
          >
            {isLoadingAddItem ? (
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Simpan"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddItem;
