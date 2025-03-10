import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("accessToken");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
