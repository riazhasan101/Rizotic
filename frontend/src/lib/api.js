// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token if present (for admin routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rizotic_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("rizotic_admin_token");
      window.location.href = "/admin";
    }
    return Promise.reject(err);
  }
);

export default api;
