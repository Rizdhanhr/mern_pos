import axios from "axios";
import { getToken, removeToken, setToken} from "../utils/authHelper";
import AuthService from "./authService";
import navigateHelper from "../utils/navigateHelper";

const link = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
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

// async function handleRefreshToken(originalRequest) {
//     if (!refreshTokenPromise) {
//       refreshTokenPromise = (async () => {
//         try {
//           const response = await AuthService.refreshToken();
//           const newAccessToken = response.data.token;
//           setToken(newAccessToken);
//           axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//           failedRequestsQueue.forEach(callback => callback(newAccessToken));
//           failedRequestsQueue.length = 0;
//           refreshTokenPromise = null; 
//           return newAccessToken;
//         } catch (refreshError) {
//           removeToken();
//           navigateHelper.navigate("/login");
//           failedRequestsQueue.length = 0; // Kosongkan queue jika refresh gagal
//           refreshTokenPromise = null; 
//           throw refreshError;
//         } 
//       })();
//   }
//     return new Promise((resolve, reject) => {
//       failedRequestsQueue.push(newAccessToken => {
//         if (!newAccessToken) {
//           reject(new Error("Refresh token failed"));
//         }
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         resolve(axiosInstance(originalRequest)); 
//       });
//     });
// }

axiosInstance.interceptors.request.use(
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


axiosInstance.interceptors.response.use(
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
                resolve(axiosInstance(originalRequest));
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
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`; 
          processQueue(null, newToken); 
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`; 
          return axiosInstance(originalRequest); 
        } catch (err) {
          processQueue(err, null);
          removeToken();
          navigateHelper.navigate("/login"); 
          return Promise.reject(err); 
        } finally {
          isRefresh = false; 
        }    
      } else if (status >= 500) {
        navigateHelper.navigate("/500");
      } else if (status === 403) {
        navigateHelper.navigate("/403");
      } else if (status === 404) {
        navigateHelper.navigate("/404");
      }
    } else {
      navigateHelper.navigate("/500");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
