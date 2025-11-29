// LearnSphere/client/src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  // If authenticated, render child routes, else redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
