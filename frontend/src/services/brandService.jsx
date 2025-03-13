import React from "react";
import axiosInstance from "./axiosInstance";

class BrandService {
  static getAll() {
    return axiosInstance.get("/brand");
  }

  static getDatatable(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosInstance.get("/brand/data", {
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
    return axiosInstance.get(`/brand/${id}`);
  }

  static create(data) {
    return axiosInstance.post("/brand", data);
  }

  static update(id, data) {
    return axiosInstance.put(`/brand/${id}`, data);
  }

  static delete(id) {
    return axiosInstance.delete(`/brand/${id}`);
  }
}

export default BrandService;
