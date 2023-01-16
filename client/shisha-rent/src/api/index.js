import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://aura-backend-d24g.onrender.com/api"
    : "http://localhost:3001/api";

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "jwt"
  )}`;
  return request;
});
