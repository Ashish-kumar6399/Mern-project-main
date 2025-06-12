import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token"); // check if token is stored (user is logged in)

  // If auth token exists, allow access
  if (auth) {
    return <Outlet />; // Outlet renders the nested/child routes
  } else {
    return <Navigate to="/login" />; // If not logged in, redirect to login
  }
};

export default PrivateRoute;
