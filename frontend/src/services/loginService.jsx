import React from "react";
import axios from "axios";

class LoginService {
  static loginStore(data) {
    return axios.post(import.meta.env.VITE_BACKEND_URL + "/login", data);
  }
}

export default LoginService;
