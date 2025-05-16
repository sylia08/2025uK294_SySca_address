
import axios from "axios";

export const defaultAxiosInstance = axios.create({
  baseURL: "http://localhost:3030",
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