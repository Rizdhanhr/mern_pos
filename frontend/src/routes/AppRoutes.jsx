import { React, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import UnitIndex from "../pages/unit/Index";
import UnitCreate from "../pages/unit/Create";
import UnitEdit from "../pages/unit/Edit";
import ProductIndex from "../pages/product/Index";
import ProductCreate from "../pages/product/Create";
import ProductEdit from "../pages/product/Edit";
import UserIndex from "../pages/user/Index";
import UserCreate from "../pages/user/Create";
import UserEdit from "../pages/user/Edit";
import RoleIndex from "../pages/role/Index";
import RoleCreate from "../pages/role/Create";
import RoleEdit from "../pages/role/Edit";
import navigateHelper from "../utils/navigateHelper";

export default function AppRoutes() {
  const navigate = useNavigate();
  useEffect(
    () => {
      navigateHelper.navigate = navigate;
    },
    [navigate]
  );

  const routesConfig = [
    { path: "/login", element: <LoginIndex />, protected: false, props: {} },
    { path: "/", element: <Dashboard />, protected: true, props: {} },
    {
      path: "/brand",
      element: <BrandIndex />,
      protected: true,
      props: { permission: "VIEW-BRAND" }
    },
    {
      path: "/brand/create",
      element: <BrandCreate />,
      protected: true,
      props: { permission: "CREATE-BRAND" }
    },
    {
      path: "/brand/:id/edit",
      element: <BrandEdit />,
      protected: true,
      props: { permission: "UPDATE-BRAND" }
    },
    {
      path: "/category",
      element: <CategoryIndex />,
      protected: true,
      props: { permission: "VIEW-CATEGORY" }
    },
    {
      path: "/category/create",
      element: <CategoryCreate />,
      protected: true,
      props: { permission: "CREATE-CATEGORY" }
    },
    {
      path: "/category/:id/edit",
      element: <CategoryEdit />,
      protected: true,
      props: { permission: "UPDATE-CATEGORY" }
    },
    {
      path: "/unit",
      element: <UnitIndex />,
      protected: true,
      props: { permission: "VIEW-UNIT" }
    },
    {
      path: "/unit/create",
      element: <UnitCreate />,
      protected: true,
      props: { permission: "CREATE-UNIT" }
    },
    {
      path: "/unit/:id/edit",
      element: <UnitEdit />,
      protected: true,
      props: { permission: "UPDATE-UNIT" }
    },
    {
      path: "/product",
      element: <ProductIndex />,
      protected: true,
      props: { permission: "VIEW-PRODUCT" }
    },
    {
      path: "/product/create",
      element: <ProductCreate />,
      protected: true,
      props: { permission: "CREATE-PRODUCT" }
    },
    {
      path: "/product/:id/edit",
      element: <ProductEdit />,
      protected: true,
      props: { permission: "UPDATE-PRODUCT" }
    },
    {
      path: "/user",
      element: <UserIndex />,
      protected: true,
      props: { permission: "VIEW-USER" }
    },
    {
      path: "/user/create",
      element: <UserCreate />,
      protected: true,
      props: { permission: "CREATE-USER" }
    },
    {
      path: "/user/:id/edit",
      element: <UserEdit />,
      protected: true,
      props: { permission: "UPDATE-USER" }
    },
    {
      path: "/role",
      element: <RoleIndex />,
      protected: true,
      props: {
        permission: "VIEW-ROLE"
      }
    },
    {
      path: "/role/create",
      element: <RoleCreate />,
      protected: true,
      props: {
        permission: "CREATE-ROLE"
      }
    },
    {
      path: "/role/:id/edit",
      element: <RoleEdit />,
      protected: true,
      props: {
        permission: "UPDATE-ROLE"
      }
    }
  ];

  return (
    <Routes>
      {routesConfig.map((route, index) => {
        const RouteComponent = route.protected ? PrivateRoute : PublicRoute;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteComponent {...route.props}>
                {route.element}
              </RouteComponent>
            }
          />
        );
      })}

      <Route path="/error/404" element={<NotFound />} />
      <Route path="/error/403" element={<Forbidden />} />
      <Route path="/error/500" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/error/404" replace />} />
    </Routes>
  );
}
