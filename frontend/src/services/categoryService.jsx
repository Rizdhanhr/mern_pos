import React from "react";
import axiosInstance from "./axiosInstance";

class CategoryService {
  static getAll() {
    return axiosInstance.get("/category");
  }

  static getDatatable(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosInstance.get("/category/data", {
      params: {
        page: page,
        perPage: perPage,
        search: search,
        sortColumn: sortColumn,
        sortOrder: sortOrder === "ascend" ? "asc" : "desc"
      }
    });
  }

  static getById(id) {
    return axiosInstance.get(`/category/${id}`);
  }

  static create(data) {
    return axiosInstance.post("/category", data);
  }

  static update(id, data) {
    return axiosInstance.put(`/category/${id}`, data);
  }

  static delete(id) {
    return axiosInstance.delete(`/category/${id}`);
  }
}

export default CategoryService;
