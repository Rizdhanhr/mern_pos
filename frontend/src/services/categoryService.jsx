import React from "react";
import axiosService from "./axiosService";

class CategoryService {
  static getAll(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosService.get("/category", {
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
    return axiosService.get(`/category/${id}`);
  }

  static create(data) {
    return axiosService.post("/category", data);
  }

  static update(id, data) {
    return axiosService.put(`/category/${id}`, data);
  }

  static delete(id) {
    return axiosService.delete(`/category/${id}`);
  }
}

export default CategoryService;
