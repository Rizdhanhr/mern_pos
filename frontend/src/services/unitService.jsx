import React from "react";
import axiosInstance from "./axiosInstance";

class UnitService {
  static getAll() {
    return axiosInstance.get("/unit");
  }

  static getDatatable(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosInstance.get("/unit/data", {
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
    return axiosInstance.get(`/unit/${id}`);
  }

  static create(data) {
    return axiosInstance.post("/unit", data);
  }

  static update(id, data) {
    return axiosInstance.put(`/unit/${id}`, data);
  }

  static delete(id) {
    return axiosInstance.delete(`/unit/${id}`);
  }
}

export default UnitService;
