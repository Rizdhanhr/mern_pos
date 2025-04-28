import axios from "axios";
import { getToken, removeToken, setToken} from "../utils/authHelper";
import AuthService from "./authService";
import navigateHelper from "../utils/navigateHelper";
import { alertError } from "../components/alert/Alert";

const link = import.meta.env.VITE_BACKEND_URL;
const axiosService = axios.create({
  baseURL: link,
  timeout: 10000,
  withCredentials: true 
});
let isRefresh = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

axiosService.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  error => Promise.reject(error) 
);


axiosService.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response) {
      const status = error.response.status;
      const originalRequest = error.config;
      if (status === 401 && !originalRequest._retry) {
        if (isRefresh) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(axiosService(originalRequest));
              },
              reject: (err) => reject(err),
            });
          });
        }
        
        isRefresh = false;
        
        try {
          const response = await AuthService.refreshToken();
          const newToken = response.data.token;
          setToken(newToken); 
          axiosService.defaults.headers.common["Authorization"] = `Bearer ${newToken}`; 
          processQueue(null, newToken); 
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`; 
          return axiosService(originalRequest); 
        } catch (err) {
          processQueue(err, null);
          removeToken();
          navigateHelper.navigate("/login"); 
          return Promise.reject(err); 
        } finally {
          isRefresh = false; 
        }    
      } else if (status >= 500) {
        navigateHelper.navigate("/error/500");
      } else if (status === 403) {
        navigateHelper.navigate("/error/403");
      } else if (status === 404) {
        // navigateHelper.navigate("/error/404");
      } else if (status === 409) {
        alertError(error.response.data.message);
      }
    } else {
      navigateHelper.navigate("/error/500");
    }
    return Promise.reject(error);
  }
);

export default axiosService;
