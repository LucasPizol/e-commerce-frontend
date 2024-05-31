import axios from "axios";

const api = axios;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.baseURL = "http://localhost:3000";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { api };
