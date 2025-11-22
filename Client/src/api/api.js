import axios from "axios";

// Fallback if VITE_API_URL is missing. Trim to remove accidental whitespace/newlines.
const RAW_URL = (import.meta.env.VITE_API_URL || "http://localhost:5300").trim();

// Remove trailing slashes (fixes duplicate // problems)
const BASE_URL = RAW_URL.replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
  validateStatus: () => true, // Don't throw on any status code
  transformRequest: [
    (data, headers) => {
      // Ensure data is sent as JSON, never as query params
      if (data && typeof data === 'object') {
        headers['Content-Type'] = 'application/json';
        return JSON.stringify(data);
      }
      return data;
    }
  ]
});

// Attach token automatically to every request (check localStorage on every call)
api.interceptors.request.use((config) => {
  // Always read token fresh so updates are applied immediately
  const token = localStorage.getItem("token");
  try {
    config.headers = config.headers || {};
    if (token) {
      // Set Authorization header - standard format
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // noop
  }
  return config;
});

// Log responses and errors for easier debugging in development
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
