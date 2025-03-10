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
    sortOrder = "desc"
  ) {
    return axiosInstance.get("/brand/data", {
      params: {
        page: page,
        limit: perPage,
        search: search,
        sort: sortColumn,
        order: sortOrder
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
