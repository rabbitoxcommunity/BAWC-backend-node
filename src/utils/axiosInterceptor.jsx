import axios from "axios";
import { API_BASE_URL } from "../config/configuration";
import { errorToast } from "../redux/actionCreator";

const defaultOptions = {
  baseURL: API_BASE_URL,
};

// axios instance for making requests
const axiosInstance = axios.create(defaultOptions);

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  let csrf = localStorage.getItem("csrf");
  token && (config.headers.Authorization = `Bearer ${token}`);
  csrf && (config.headers["x-csrf-token"] = csrf);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      if (error) {
        errorToast(error.message);
      }
      return Promise.reject(error);
    }
    
    if (error.response.data.token === false || 
        error.response.data.message === "Token failed" || 
        error.response.data.message === "Not authorized") {
      localStorage.removeItem("token");
      // No redirect to login page
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;