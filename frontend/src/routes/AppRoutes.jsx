import React from "react";
import { Routes, Route } from "react-router-dom";
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
      <Route path="/login" element={<LoginIndex />} />

      <Route path="/" element={<Dashboard />} />
      <Route path="/brand" element={<BrandIndex />} />
      <Route path="/brand/create" element={<BrandCreate />} />
      <Route path="/brand/:id/edit" element={<BrandEdit />} />

      {/* Error Page */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
