import axios from "axios";
export const defaultAxiosInstance = axios.create({
  baseURL: "http://localhost:3030/",
  headers: {
    "Content-Type": "application/json",
  },
});

defaultAxiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

defaultAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
