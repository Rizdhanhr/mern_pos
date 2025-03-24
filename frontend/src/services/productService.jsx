import React from "react";
import axiosInstance from "./axiosInstance";

class ProductService {
  static create(data) {
    return axiosInstance.post("/product", data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }
}

export default ProductService;
