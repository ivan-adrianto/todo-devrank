import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  //get activity list
  getActivitiesRequest: ["data"],
  getActivitiesSuccess: ["payload"],
  getActivitiesFailure: ["error"],

  // get activity detail
  getActivityDetailRequest: ["data"],
  getActivityDetailSuccess: ["payload"],
  getActivityDetailFailure: ["error"],

  // add activity detail
  addActivityRequest: ["data"],
  addActivitySuccess: ["payload"],
  addActivityFailure: ["error"],

  // delete activity detail
  deleteActivityRequest: ["data"],
  deleteActivitySuccess: ["payload"],
  deleteActivityFailure: ["error"],

  // update activity detail
  updateActivityRequest: ["data"],
  updateActivitySuccess: ["payload"],
  updateActivityFailure: ["error"],

  // add item
  addItemRequest: ["data"],
  addItemSuccess: ["payload"],
  addItemFailure: ["error"],

  // update item
  updateItemRequest: ["data"],
  updateItemSuccess: ["payload"],
  updateItemFailure: ["error"],

  // delete item
  deleteItemRequest: ["data"],
  deleteItemSuccess: ["payload"],
  deleteItemFailure: ["error"],

  // reset state todo
  resetStateTodo: ["data"],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingGetActivities: false,
  dataGetActivities: false,
  errGetActivities: null,

  isLoadingGetActivityDetail: false,
  dataGetActivityDetail: false,
  errGetActivityDetail: null,

  isLoadingAddActivity: false,
  dataAddActivity: false,
  errAddActivity: null,

  isLoadingDeleteActivity: false,
  dataDeleteActivity: false,
  errDeleteActivity: null,

  isLoadingUpdateActivity: false,
  dataUpdateActivity: false,
  errUpdateActivity: null,

  isLoadingAddItem: false,
  dataAddItem: false,
  errAddItem: null,

  isLoadingUpdateItem: false,
  dataUpdateItem: false,
  errUpdateItem: null,

  isLoadingDeleteItem: false,
  dataDeleteItem: false,
  errDeleteItem: null,
});

/* ------------- Reducers ------------- */

/* --------get activity list-------- */

// request the data from an api
export const getActivitiesRequest = (state) =>
  state.merge({ isLoadingGetActivities: true, dataGetActivities: null });

// successful api lookup
export const getActivitiesSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingGetActivities: false,
    errGetActivities: null,
    dataGetActivities: payload,
  });
};

// Something went wrong somewhere
export const getActivitiesFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingGetActivities: false,
    errGetActivities: error,
    dataGetActivities: null,
  });
};

/* --------get activity detail-------- */

// request the data from an api
export const getActivityDetailRequest = (state) =>
  state.merge({
    isLoadingGetActivityDetail: true,
    dataGetActivityDetail: null,
  });

// successful api lookup
export const getActivityDetailSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingGetActivityDetail: false,
    errGetActivityDetail: null,
    dataGetActivityDetail: payload,
  });
};

// Something went wrong somewhere
export const getActivityDetailFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingGetActivityDetail: false,
    errGetActivityDetail: error,
    dataGetActivityDetail: null,
  });
};

/* --------add activity-------- */

// request the data from an api
export const addActivityRequest = (state) =>
  state.merge({ isLoadingAddActivity: true, dataAddActivity: null });

// successful api lookup
export const addActivitySuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingAddActivity: false,
    errAddActivity: null,
    dataAddActivity: payload,
  });
};

// Something went wrong somewhere
export const addActivityFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingAddActivity: false,
    errAddActivity: error,
    dataAddActivity: null,
  });
};

/* --------delete activity-------- */

// request the data from an api
export const deleteActivityRequest = (state) =>
  state.merge({ isLoadingDeleteActivity: true, dataDeleteActivity: null });

// successful api lookup
export const deleteActivitySuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingDeleteActivity: false,
    errDeleteActivity: null,
    dataDeleteActivity: payload,
  });
};

// Something went wrong somewhere
export const deleteActivityFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingDeleteActivity: false,
    errDeleteActivity: error,
    dataDeleteActivity: null,
  });
};

/* --------update activity-------- */

// request the data from an api
export const updateActivityRequest = (state) =>
  state.merge({ isLoadingUpdateActivity: true, dataUpdateActivity: null });

// successful api lookup
export const updateActivitySuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingUpdateActivity: false,
    errUpdateActivity: null,
    dataUpdateActivity: payload,
  });
};

// Something went wrong somewhere
export const updateActivityFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingUpdateActivity: false,
    errUpdateActivity: error,
    dataUpdateActivity: null,
  });
};

/* --------add item-------- */

// request the data from an api
export const addItemRequest = (state) =>
  state.merge({ isLoadingAddItem: true, dataAddItem: null });

// successful api lookup
export const addItemSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingAddItem: false,
    errAddItem: null,
    dataAddItem: payload,
  });
};

// Something went wrong somewhere
export const addItemFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingAddItem: false,
    errAddItem: error,
    dataAddItem: null,
  });
};

/* --------update item-------- */

// request the data from an api
export const updateItemRequest = (state) =>
  state.merge({ isLoadingUpdateItem: true, dataUpdateItem: null });

// successful api lookup
export const updateItemSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingUpdateItem: false,
    errUpdateItem: null,
    dataUpdateItem: payload,
  });
};

// Something went wrong somewhere
export const updateItemFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingUpdateItem: false,
    errUpdateItem: error,
    dataUpdateItem: null,
  });
};



/* --------delete item-------- */

// request the data from an api
export const deleteItemRequest = (state) =>
  state.merge({ isLoadingDeleteItem: true, dataDeleteItem: null });

// successful api lookup
export const deleteItemSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({
    isLoadingDeleteItem: false,
    errDeleteItem: null,
    dataDeleteItem: payload,
  });
};

// Something went wrong somewhere
export const deleteItemFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    isLoadingDeleteItem: false,
    errDeleteItem: error,
    dataDeleteItem: null,
  });
};

// Reset state

export const resetStateTodo = (state) =>
  state.merge({
    isLoadingDeleteActivity: false,
    dataDeleteActivity: null,
    errDeleteActivity: null,
    errAddActivity: null,
    dataAddActivity: null,
    dataUpdateItem: null,
    errUpdateItem: null,
  });

/* ------------- Hookup Reducers To Type ------------- */

export const todoReducer = createReducer(INITIAL_STATE, {
  // get activity list
  [Types.GET_ACTIVITIES_REQUEST]: getActivitiesRequest,
  [Types.GET_ACTIVITIES_SUCCESS]: getActivitiesSuccess,
  [Types.GET_ACTIVITIES_FAILURE]: getActivitiesFailure,

  // get activity list
  [Types.GET_ACTIVITY_DETAIL_REQUEST]: getActivityDetailRequest,
  [Types.GET_ACTIVITY_DETAIL_SUCCESS]: getActivityDetailSuccess,
  [Types.GET_ACTIVITY_DETAIL_FAILURE]: getActivityDetailFailure,

  // get activity list
  [Types.ADD_ACTIVITY_REQUEST]: addActivityRequest,
  [Types.ADD_ACTIVITY_SUCCESS]: addActivitySuccess,
  [Types.ADD_ACTIVITY_FAILURE]: addActivityFailure,

  // delete activity
  [Types.DELETE_ACTIVITY_REQUEST]: deleteActivityRequest,
  [Types.DELETE_ACTIVITY_SUCCESS]: deleteActivitySuccess,
  [Types.DELETE_ACTIVITY_FAILURE]: deleteActivityFailure,

  // update activity list
  [Types.UPDATE_ACTIVITY_REQUEST]: updateActivityRequest,
  [Types.UPDATE_ACTIVITY_SUCCESS]: updateActivitySuccess,
  [Types.UPDATE_ACTIVITY_FAILURE]: updateActivityFailure,

  // add item
  [Types.ADD_ITEM_REQUEST]: addItemRequest,
  [Types.ADD_ITEM_SUCCESS]: addItemSuccess,
  [Types.ADD_ITEM_FAILURE]: addItemFailure,

  // update item
  [Types.UPDATE_ITEM_REQUEST]: updateItemRequest,
  [Types.UPDATE_ITEM_SUCCESS]: updateItemSuccess,
  [Types.UPDATE_ITEM_FAILURE]: updateItemFailure,

  // delete item
  [Types.DELETE_ITEM_REQUEST]: deleteItemRequest,
  [Types.DELETE_ITEM_SUCCESS]: deleteItemSuccess,
  [Types.DELETE_ITEM_FAILURE]: deleteItemFailure,

  // reset state todo
  [Types.RESET_STATE_TODO]: resetStateTodo,
});
