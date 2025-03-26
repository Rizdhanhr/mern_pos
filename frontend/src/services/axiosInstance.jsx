import axios from "axios";
import { getToken, removeToken, setToken} from "../utils/authHelper";
import AuthService from "./authService";

const link = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: link,
  timeout: 10000,
  withCredentials: true 
});
let refreshTokenPromise = null;
let failedRequestsQueue = [];

async function handleRefreshToken(originalRequest) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = (async () => {
        try {
          const response = await AuthService.refreshToken();
          const newAccessToken = response.data.token;
          setToken(newAccessToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          failedRequestsQueue.forEach(callback => callback(newAccessToken));
          failedRequestsQueue.length = 0; 
          return newAccessToken;
        } catch (refreshError) {
          removeToken();
          window.location.href = "/login";
          failedRequestsQueue.length = 0; // Kosongkan queue jika refresh gagal
          throw refreshError;
        } finally {
          refreshTokenPromise = null; // Reset setelah selesai
        }
      })();
  }
    return new Promise((resolve, reject) => {
      failedRequestsQueue.push(newAccessToken => {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        resolve(axiosInstance(originalRequest)); 
      });
    });
}

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => Promise.reject(error) 
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    
    if (error.response) {
      const status = error.response.status;
      const originalRequest = error.config;
      if (status === 401) {
        return await handleRefreshToken(originalRequest);
      }
      // else if (status >= 500) {
      //   window.location.href = "/500"; 
      // } else if (status === 403) {
      //   window.location.href = "/403";
      // } else if (status === 404) {
      //   window.location.href = "/404";
      // }
    }else if (error.request) {
      // window.location.href = "/500"; 
    } else {
      // window.location.href = "/500";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
