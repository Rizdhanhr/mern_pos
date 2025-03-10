import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const alertSuccess = message => {
  return Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
    timer: 3000, // 2000 ms = 2 detik
    timerProgressBar: true
  });
};

export const alertError = message => {
  return Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK"
  });
};

export const alertConfirmDelete = onDelete => {
  Swal.fire({
    title: "Are you sure?",
    text: "Deleting this data will also remove the associated items",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: true
  }).then(result => {
    if (result.isConfirmed) {
      onDelete();
    }
  });
};
