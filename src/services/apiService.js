import Axios from "axios";


const api = Axios.create({
  baseURL: "https://api.todo.dev.gethired.id",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;