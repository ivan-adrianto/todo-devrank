export function titlePage(data = {}) {
  data.title = data.title || "To Do List";
  document.title = data.title;
}
