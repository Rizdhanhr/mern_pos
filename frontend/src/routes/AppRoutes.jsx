import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import BrandIndex from "../pages/brand/Index";
import BrandCreate from "../pages/brand/Create";
import BrandEdit from "../pages/brand/Edit";
import Dashboard from "../pages/dashboard/Index";
import NotFound from "../pages/errors/404";
import Forbidden from "../pages/errors/403";
import ServerError from "../pages/errors/500";
import LoginIndex from "../pages/login/Index";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Autentikasi */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginIndex />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/brand"
        element={
          <PrivateRoute>
            <BrandIndex />
          </PrivateRoute>
        }
      />
      <Route
        path="/brand/create"
        element={
          <PrivateRoute>
            <BrandCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/brand/:id/edit"
        element={
          <PrivateRoute>
            <BrandEdit />
          </PrivateRoute>
        }
      />

      {/* Error Page */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
