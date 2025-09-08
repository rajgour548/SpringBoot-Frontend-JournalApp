import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL:backendUrl, // change if your backend is deployed
});

// Attach token for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Logout if token expired (backend returns 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("jwt"); // remove expired token
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);


export default api;
