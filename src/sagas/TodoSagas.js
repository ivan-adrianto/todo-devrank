import { call, put, all, takeLatest } from "redux-saga/effects";
import {
  Types as TodoTypes,
  Creators as TodoActions,
} from "../redux/TodoRedux";
import {
  addActivity,
  addItem,
  deleteActivity,
  deleteItem,
  getActivityDetail,
  getActivityList,
  updateActivity,
  updateItem,
} from "../services/todo";

/* --------add Client-------- */

function* getActivitiesSaga(action) {
  try {
    const res = yield call(getActivityList);
    yield put(TodoActions.getActivitiesSuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.getActivitiesFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* getActivitiesRequestSaga() {
  yield takeLatest(TodoTypes.GET_ACTIVITIES_REQUEST, getActivitiesSaga);
}

function* getActivityDetailSaga(action) {
  const { data } = action;

  try {
    const res = yield call(getActivityDetail, data);
    yield put(TodoActions.getActivityDetailSuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.getActivityDetailFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* getActivityDetailRequestSaga() {
  yield takeLatest(
    TodoTypes.GET_ACTIVITY_DETAIL_REQUEST,
    getActivityDetailSaga
  );
}

function* addActivitySaga(action) {
  const { data } = action;

  try {
    const res = yield call(addActivity, data);
    yield put(TodoActions.addActivitySuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.addActivityFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* addActivityRequestSaga() {
  yield takeLatest(TodoTypes.ADD_ACTIVITY_REQUEST, addActivitySaga);
}

function* deleteActivitySaga(action) {
  const { data } = action;

  try {
    const res = yield call(deleteActivity, data);
    yield put(TodoActions.deleteActivitySuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.deleteActivityFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* deleteActivityRequestSaga() {
  yield takeLatest(TodoTypes.DELETE_ACTIVITY_REQUEST, deleteActivitySaga);
}


function* updateActivitySaga(action) {
  const { data } = action;

  try {
    const res = yield call(updateActivity, data);
    yield put(TodoActions.updateActivitySuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.updateActivityFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* updateActivityRequestSaga() {
  yield takeLatest(TodoTypes.UPDATE_ACTIVITY_REQUEST, updateActivitySaga);
}


// add item
function* addItemSaga(action) {
  const { data } = action;

  try {
    const res = yield call(addItem, data);
    yield put(TodoActions.addItemSuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.addItemFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* addItemRequestSaga() {
  yield takeLatest(TodoTypes.ADD_ITEM_REQUEST, addItemSaga);
}


// update item
function* updateItemSaga(action) {
  const { data } = action;

  try {
    const res = yield call(updateItem, data);
    yield put(TodoActions.updateItemSuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.updateItemFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* updateItemRequestSaga() {
  yield takeLatest(TodoTypes.UPDATE_ITEM_REQUEST, updateItemSaga);
}


// delete item
function* deleteItemSaga(action) {
  const { data } = action;

  try {
    const res = yield call(deleteItem, data);
    yield put(TodoActions.deleteItemSuccess(res.data));
  } catch (error) {
    yield put(
      TodoActions.deleteItemFailure(error?.response?.data?.meta?.errors)
    );
  }
}

export function* deleteItemRequestSaga() {
  yield takeLatest(TodoTypes.DELETE_ITEM_REQUEST, deleteItemSaga);
}

export function* todoSaga() {
  yield all([
    call(getActivitiesRequestSaga),
    call(getActivityDetailRequestSaga),
    call(addActivityRequestSaga),
    call(deleteActivityRequestSaga),
    call(updateActivityRequestSaga),
    call(addItemRequestSaga),
    call(updateItemRequestSaga),
    call(deleteItemRequestSaga),
  ]);
}
