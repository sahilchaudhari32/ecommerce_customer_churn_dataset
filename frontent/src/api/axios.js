import axios from "axios";

const api = axios.create({
  // Using a relative path leverages the Vite proxy configured in vite.config.js
  baseURL: "/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
