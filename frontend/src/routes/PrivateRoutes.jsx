import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("accessToken");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
