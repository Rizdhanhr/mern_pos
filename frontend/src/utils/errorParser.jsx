import React from "react";

export const errorValidation = (errorResponse) => {
  const errorFields = {};

  if (errorResponse?.data?.errors) {
    errorResponse.data.errors.forEach((error) => {
      errorFields[error.path] = error.msg; // Mapping error berdasarkan field
    });
  }

  return errorFields;
};