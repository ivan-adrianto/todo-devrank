import api from "./apiService";

export async function getActivityList() {
  const res = await api.get("/activity-groups");
  return res;
}

export async function getActivityDetail(data) {
  const res = await api.get(`/activity-groups/${data}`);
  return res;
}

export async function addActivity(data) {
  const res = await api.post("/activity-groups/", data);
  return res;
}

export async function updateActivity(value) {
  const { id, data } = value;
  const res = await api.patch(`/activity-groups/${id}`, data);
  return res;
}

export async function deleteActivity(data) {
  const res = await api.delete(`/activity-groups/${data}`, {});
  return res;
}

export async function addItem(data) {
  const res = await api.post(`/todo-items`, data);
  return res;
}

export async function updateItem(value) {
  const { id, data } = value;
  const res = await api.patch(`/todo-items/${id}`, data);
  return res;
}

export async function deleteItem(data) {
  const res = await api.delete(`/todo-items/${data}`, {});
  return res;
}
