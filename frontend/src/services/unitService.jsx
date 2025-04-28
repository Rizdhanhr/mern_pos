import React from "react";
import axiosService from "./axiosService";

class UnitService {
  static getAll(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosService.get("/unit", {
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
    return axiosService.get(`/unit/${id}`);
  }

  static create(data) {
    return axiosService.post("/unit", data);
  }

  static update(id, data) {
    return axiosService.put(`/unit/${id}`, data);
  }

  static delete(id) {
    return axiosService.delete(`/unit/${id}`);
  }
}

export default UnitService;
