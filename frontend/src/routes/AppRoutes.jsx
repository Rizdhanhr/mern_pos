import { React, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import NotFound from "../pages/errors/404";
import Forbidden from "../pages/errors/403";
import ServerError from "../pages/errors/500";
import LoginIndex from "../pages/login/Index";
import Dashboard from "../pages/dashboard/Index";
import BrandIndex from "../pages/brand/Index";
import BrandCreate from "../pages/brand/Create";
import BrandEdit from "../pages/brand/Edit";
import CategoryIndex from "../pages/category/Index";
import CategoryCreate from "../pages/category/Create";
import CategoryEdit from "../pages/category/Edit";
import ProductIndex from "../pages/product/Index";
import ProductCreate from "../pages/product/Create";
import ProductEdit from "../pages/product/Edit";
import navigateHelper from "../utils/navigateHelper";

export default function AppRoutes() {
  const navigate = useNavigate();
  useEffect(
    () => {
      navigateHelper.navigate = navigate;
    },
    [navigate]
  );

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

      <Route
        path="/category"
        element={
          <PrivateRoute>
            <CategoryIndex />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/create"
        element={
          <PrivateRoute>
            <CategoryCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/:id/edit"
        element={
          <PrivateRoute>
            <CategoryEdit />
          </PrivateRoute>
        }
      />

      <Route
        path="/product"
        element={
          <PrivateRoute>
            <ProductIndex />
          </PrivateRoute>
        }
      />
      <Route
        path="/product/create"
        element={
          <PrivateRoute>
            <ProductCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/product/:id/edit"
        element={
          <PrivateRoute>
            <ProductEdit />
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
