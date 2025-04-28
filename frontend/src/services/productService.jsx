import React from "react";
import axiosService from "./axiosService";

class ProductService {
  static getAll(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosService.get("/product", {
      params: {
        page: page,
        perPage: perPage,
        search: search,
        sortColumn: sortColumn,
        sortOrder: sortOrder === "ascend" ? "asc" : "desc"
      }
    });
  }

  static getFormAttributes() {
    return axiosService.get(`/product/form-attributes`);
  }

  static create(data) {
    return axiosService.post("/product", data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  static getById(id) {
    return axiosService.get(`/product/${id}`);
  }

  static update(id, data) {
    return axiosService.put(`/product/${id}`, data);
  }
  static delete(id) {
    return axiosService.delete(`/product/${id}`);
  }
}

export default ProductService;
