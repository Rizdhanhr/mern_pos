import React from "react";
import axiosService from "./axiosService";

class UserService {
  static getAll(
    page = 1,
    perPage = 10,
    search = "",
    sortColumn = 0,
    sortOrder = "ascend"
  ) {
    return axiosService.get("/user", {
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
    return axiosService.get(`/user/form-attributes`);
  }

  static getById(id) {
    return axiosService.get(`/user/${id}`);
  }

  static create(data) {
    return axiosService.post("/user", data);
  }

  static update(id, data) {
    return axiosService.put(`/user/${id}`, data);
  }

  static delete(id) {
    return axiosService.delete(`/user/${id}`);
  }
}

export default UserService;
