import React from "react";
import axiosService from "./axiosService";

class BrandService {
  static getAll(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosService.get("/brand", {
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
    return axiosService.get(`/brand/${id}`);
  }

  static create(data) {
    return axiosService.post("/brand", data);
  }

  static update(id, data) {
    return axiosService.put(`/brand/${id}`, data);
  }

  static delete(id) {
    return axiosService.delete(`/brand/${id}`);
  }
}

export default BrandService;
