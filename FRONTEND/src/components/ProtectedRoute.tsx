import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const loc = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
