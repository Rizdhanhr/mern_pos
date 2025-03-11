import axios from "axios";
import { getToken, removeToken, setToken } from "../utils/authHelper";
import AuthService from "./authService";

const link = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: link,
  timeout: 10000,
  withCredentials: true 
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => Promise.reject(error) 
);

let refreshTokenPromise = null;
axiosInstance.interceptors.response.use(
  response => response, 
  error => {
   
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = new Promise(async (resolve, reject) => {
            try {
              const response = await AuthService.refreshToken();
              const newAccessToken = response.data.token;
              setToken(newAccessToken);
              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
              const newResponse = await axiosInstance(error.config);
              resolve(newResponse);
            } catch (refreshError) {
              removeToken();
              window.location.href = "/login";
              reject(refreshError);
            } finally {
              refreshTokenPromise = null; 
            }
          });
          return refreshTokenPromise;
        }
        return Promise.reject(error);
      }
      
      // else if (status >= 500) {
      //   window.location.href = "/500"; 
      // } else if (status === 403) {
      //   window.location.href = "/403";
      // } else if (status === 404) {
      //   window.location.href = "/404";
      // }
    }
    else if (error.request) {
      window.location.href = "/500"; 
    } else {
      window.location.href = "/500";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
