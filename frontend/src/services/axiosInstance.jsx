import axios from "axios";

const link = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: link,
  timeout: 10000 // Batas waktu request (opsional)
});

axiosInstance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem("authToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => Promise.reject(error) 
);


axiosInstance.interceptors.response.use(
  response => response, 
  error => {
    if (error.response && error.response.status === 401) {
     
    //   localStorage.removeItem("authToken");
    //   window.location.href = "/login";
    } else if(error.response && error.response.status === 500) {
      window.location.href = "/500";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
