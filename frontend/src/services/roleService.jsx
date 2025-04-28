import React from "react";
import axiosService from "./axiosService";

class RoleService {
  static getAll(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosService.get("/role", {
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
    return axiosService.get(`/role/form-attributes`);
  }

  static getById(id) {
    return axiosService.get(`/role/${id}`);
  }

  static create(data) {
    return axiosService.post("/role", data);
  }

  static update(id, data) {
    return axiosService.put(`/role/${id}`, data);
  }

  static delete(id) {
    return axiosService.delete(`/role/${id}`);
  }
}

export default RoleService;
