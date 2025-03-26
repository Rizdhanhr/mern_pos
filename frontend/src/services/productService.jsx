import React from "react";
import axiosInstance from "./axiosInstance";

class ProductService {
  static getDatatable(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosInstance.get("/product/data", {
      params: {
        page: page,
        perPage: perPage,
        search: search,
        sortColumn: sortColumn,
        sortOrder: sortOrder === "ascend" ? "asc" : "desc"
      }
    });
  }

  static create(data) {
    return axiosInstance.post("/product", data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }
  static getById(id) {
    return axiosInstance.get(`/product/${id}`);
  }
}

export default ProductService;
