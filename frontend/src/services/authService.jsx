import React from "react";
import axios from "axios";

class AuthService {
  static loginStore(data) {
    return axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/login", data,{
      withCredentials: true, 
    });
  }

  static refreshToken(data) {
    return axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/refresh",{
      withCredentials: true, 
    });
  }
}

export default AuthService;
