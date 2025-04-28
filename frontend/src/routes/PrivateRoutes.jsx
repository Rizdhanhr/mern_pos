import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../store/userSlice";
import useAuth from "../hooks/useAuth";
import usePermission from "../hooks/usePermission";

export default function PrivateRoute({ children, permission = null }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { can } = usePermission();
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      dispatch(getUserData()).finally(() => {
        setLoading(false);
      });
    },
    [dispatch]
  );

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !can(permission)) {
    return <Navigate to="/error/403" replace />;
  }

  return children;
}
