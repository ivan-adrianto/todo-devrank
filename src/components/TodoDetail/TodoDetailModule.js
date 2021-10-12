import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Form, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Immutable from "seamless-immutable";
import deleteIcon from "../../assets/images/icon-delete.svg";
import emptyItem from "../../assets/images/empty-item.png";
import { Creators as TodoActions } from "../../redux/TodoRedux";
import ModalAddItem from "../Modals/ModalAddItem";
import ModalToast from "../Modals/ModalToast";
import ModalDelete from "../Modals/ModalDelete";
import ModalEditItem from "../Modals/ModalEditItem";

function TodoDetailModule() {
  const params = useParams().todoId;
  const history = useHistory();
  const titleInput = useRef(null);

  const dispatch = useDispatch();
  const updateActivity = (data) =>
    dispatch(TodoActions.updateActivityRequest(data));
  const getActivityDetail = (data) =>
    dispatch(TodoActions.getActivityDetailRequest(data));
  const resetState = () => dispatch(TodoActions.resetStateTodo());
  const updateItem = (data) => dispatch(TodoActions.updateItemRequest(data));
  const deleteItem = (data) => dispatch(TodoActions.deleteItemRequest(data));

  const {
    dataGetActivityDetail,
    isLoadingGetActivityDetail,
    dataAddItem,
    errAddItem,
    errUpdateItem,
    dataUpdateItem,
  } = useSelector((state) => state.todo);

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [titleState, setTitleState] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [modalText, setModalText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deletedItem, setDeletedItem] = useState("");
  const [showEditItem, setShowEditItem] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(1);

  useEffect(() => {
    if (dataGetActivityDetail) {
      const items = dataGetActivityDetail?.todo_items?.map((item) => {
        return {
          ...item,
          is_active:
            item?.is_active || item?.is_active === 0 ? item?.is_active : 1,
        };
      });
      setTitleState(dataGetActivityDetail?.title);
      setListItems(items);
    }
  }, [dataGetActivityDetail]);

  useEffect(() => {
    if (dataUpdateItem) {
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdateItem]);

  useEffect(() => {
    if (errAddItem !== null) {
      setShowToast(true);
      setToastType("danger");
      errAddItem
        ? setModalText(errAddItem)
        : setModalText("Gagal menambahkan activity");
    }
    if (dataAddItem) {
      getActivityDetail(params);
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errAddItem, dataAddItem]);

  useEffect(() => {
    if (errUpdateItem !== null) {
      setShowToast(true);
      setToastType("danger");
      errUpdateItem
        ? setModalText(errUpdateItem)
        : setModalText("Gagal mengedit activity");
    }
  }, [errUpdateItem]);

  useEffect(() => {
    let items = listItems;
    const sortAlphabetAscending = (a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    };

    const sortAlphabetDescending = (a, b) => {
      if (a.title < b.title) {
        return 1;
      } else if (a.title > b.title) {
        return -1;
      } else {
        return 0;
      }
    };
    if (activeDropdown === 1) {
      let sortedItems = Immutable.asMutable(items).sort((a, b) => b.id - a.id);
      setListItems(sortedItems);
    } else if (activeDropdown === 2) {
      let sortedItems = Immutable.asMutable(items).sort((a, b) => a.id - b.id);
      setListItems(sortedItems);
    } else if (activeDropdown === 3) {
      let sortedItems = Immutable.asMutable(items).sort(sortAlphabetAscending);
      setListItems(sortedItems);
    } else if (activeDropdown === 4) {
      let sortedItems = Immutable.asMutable(items).sort(sortAlphabetDescending);
      setListItems(sortedItems);
    } else {
      let sortedItems = Immutable.asMutable(items).sort(
        (a, b) => b.is_active - a.is_active
      );
      setListItems(sortedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDropdown]);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      // eslint-disable-next-line no-unused-vars
      const [value, setValue] = useState("");
      return (
        <div
          ref={ref}
          style={style}
          className={`${className}`}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const handleEditTitle = () => {
    setIsEditTitle(!isEditTitle);
    if (isEditTitle) {
      updateActivity({
        id: params,
        data: { title: titleState },
      });
    } else {
      setTimeout(() => {
        titleInput?.current?.focus();
      }, 100);
    }
  };

  const handleOnBlur = () => {
    setIsEditTitle(false);
    updateActivity({
      id: params,
      data: { title: titleState },
    });
  };

  const handleChekbox = (id) => {
    let items = [];
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].id !== id) {
        items.push(listItems[i]);
      } else {
        items.push({
          ...listItems[i],
          is_active: listItems[i].is_active === 1 ? 0 : 1,
        });
      }
    }
    setListItems(items);
    const updatedItem = items.find((item) => item.id === id);
    const data = {
      title: updatedItem.data,
      is_active: updatedItem.is_active,
      priority: updatedItem.priority,
    };
    updateItem({ id, data });
  };

  const handleClickDelete = (item) => {
    setShowDelete(true);
    setModalText(
      `<p>Apakah anda yakin menghapus item <strong>“${item?.title}”</strong>?</p>`
    );
    setDeletedItem(item?.id);
  };

  const handleDelete = () => {
    deleteItem(deletedItem);
    const items = listItems.filter((item) => item.id !== deletedItem);
    setListItems(items);
  };

  const handleClickEdit = (item) => {
    setEditedItem(item);
    setShowEditItem(true);
  };

  return (
    <div className="container">
      {isLoadingGetActivityDetail ? (
        <div className="spinner-wrapper">
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        </div>
      ) : (
        <>
          <div className="todo-header">
            <div className="todo-title">
              <div
                className="icon-back"
                onClick={() => history.push("/")}
                data-cy="todo-back-button"
              ></div>
              {isEditTitle ? (
                <input
                  type="text"
                  ref={titleInput}
                  onBlur={handleOnBlur}
                  onChange={(e) => setTitleState(e.target.value)}
                  value={titleState}
                />
              ) : (
                <h1
                  id="TitleDetail"
                  data-cy="todo-title"
                  onClick={handleEditTitle}
                >
                  {titleState}
                </h1>
              )}
              <div
                className="icon-edit-h"
                data-cy="todo-title-edit-button"
                onClick={handleEditTitle}
              ></div>
            </div>
            <div className="d-flex">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <button
                    id="ButtonSort"
                    data-cy="todo-sort-button"
                    className="btn-sort"
                  >
                    <div className="icon-sort"></div>
                  </button>
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu} data-cy="sort-parent">
                  <Dropdown.Item eventKey="1" data-cy="sort-selection">
                    <div
                      className={`d-flex item-label ${
                        activeDropdown === 1 && "active"
                      }`}
                      onClick={() => setActiveDropdown(1)}
                      data-cy={
                        activeDropdown === 1 && "sort-selection-selected"
                      }
                    >
                      <div
                        data-cy="sort-selection-icon"
                        className="icon-sort-newest"
                      ></div>
                      <span data-cy="sort-selection-title">Terbaru</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => setActiveDropdown(2)}
                    data-cy="sort-selection"
                  >
                    <div
                      className={`d-flex item-label ${
                        activeDropdown === 2 && "active"
                      }`}
                      data-cy={
                        activeDropdown === 2 && "sort-selection-selected"
                      }
                    >
                      <div
                        data-cy="sort-selection-icon"
                        className="icon-sort-oldest"
                      ></div>
                      <span data-cy="sort-selection-title">Terlama</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" data-cy="sort-selection">
                    <div
                      className={`d-flex item-label ${
                        activeDropdown === 3 && "active"
                      }`}
                      onClick={() => setActiveDropdown(3)}
                      data-cy={
                        activeDropdown === 3 && "sort-selection-selected"
                      }
                    >
                      <div
                        data-cy="sort-selection-icon"
                        className="icon-sort-a-alpha"
                      ></div>
                      <span data-cy="sort-selection-title">A-Z</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="4"
                    onClick={() => setActiveDropdown(4)}
                    data-cy="sort-selection"
                  >
                    <div
                      className={`d-flex item-label ${
                        activeDropdown === 4 && "active"
                      }`}
                      data-cy={
                        activeDropdown === 4 && "sort-selection-selected"
                      }
                    >
                      <div
                        data-cy="sort-selection-icon"
                        className="icon-sort-d-alpha"
                      ></div>
                      <span data-cy="sort-selection-title">Z-A</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="5"
                    onClick={() => setActiveDropdown(5)}
                    data-cy="sort-selection"
                  >
                    <div
                      className={`d-flex item-label ${
                        activeDropdown === 5 && "active"
                      }`}
                      data-cy={
                        activeDropdown === 5 && "sort-selection-selected"
                      }
                    >
                      <div
                        data-cy="sort-selection-icon"
                        className="icon-sort-done"
                      ></div>
                      <span data-cy="sort-selection-title">Belum Selesai</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddItem(true)}
                id="ButtonAddDetail"
                data-cy="todo-add-button"
              >
                <span className="icon-plus"></span> Tambah
              </button>
            </div>
          </div>
          <div className="detail-content">
            {dataGetActivityDetail?.todo_items?.length < 1 ? (
              <div className="empty-item" data-cy="todo-empty-state">
                <img
                  src={emptyItem}
                  alt="empty"
                  id="TextEmptyTodo"
                  onClick={() => setShowAddItem(true)}
                />
              </div>
            ) : (
              listItems.map((item, key) => (
                <div key={item.id} className="content-item" data-cy="todo-item">
                  <div className="d-flex align-items-center form-check">
                    <Form.Check
                      checked={item?.is_active === 0}
                      type="checkbox"
                      id={`default-${item.id}`}
                      onChange={() => handleChekbox(item.id)}
                      data-cy="todo-item-checkbox"
                    />
                    <div
                      data-cy="todo-item-priority-indicator"
                      className={`label-indicator ${item.priority}`}
                    ></div>
                    <span
                      data-cy="todo-item-title"
                      className={`${item?.is_active === 0 && "todo-done"}`}
                    >
                      {item.title}
                    </span>
                    <div
                      className="icon-edit-p"
                      onClick={() => handleClickEdit(item)}
                      data-cy="todo-item-edit-button"
                    ></div>
                  </div>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => handleClickDelete(item)}
                    data-cy="todo-item-delete-button"
                  />
                </div>
              ))
            )}
          </div>
          <ModalAddItem
            show={showAddItem}
            handleClose={() => setShowAddItem(false)}
          />
          <ModalEditItem
            show={showEditItem}
            handleClose={() => setShowEditItem(false)}
            editedItem={editedItem}
          />
          <ModalToast
            type={toastType}
            text={modalText}
            show={showToast}
            handleClose={() => setShowToast(false)}
          />
          <ModalDelete
            text={modalText}
            show={showDelete}
            deletedItem={deletedItem}
            handleDelete={() => handleDelete(deletedItem)}
            handleClose={() => setShowDelete(false)}
          />
        </>
      )}
    </div>
  );
}

export default TodoDetailModule;
