import axios from "axios";

const url = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "jwt"
  )}`;
  return request;
});
