import React from "react";
import axiosInstance from "./axiosInstance";

class RoleService {
  static getAll() {
    return axiosInstance.get("/role");
  }
  static getDatatable(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosInstance.get("/role/data", {
      params: {
        page: page,
        perPage: perPage,
        search: search,
        sortColumn: sortColumn,
        sortOrder: sortOrder === "ascend" ? "asc" : "desc"
      }
    });
  }
  static getRolePermission() {
    return axiosInstance.get(`/role/permission`);
  }

  static getById(id) {
    return axiosInstance.get(`/role/${id}`);
  }

  static create(data) {
    return axiosInstance.post("/role", data);
  }

  static update(id, data) {
    return axiosInstance.put(`/role/${id}`, data);
  }

  static delete(id) {
    return axiosInstance.delete(`/role/${id}`);
  }
}

export default RoleService;
