import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, element }) => {
  const role = localStorage.getItem("role"); // Mendapatkan role dari localStorage
  const token = localStorage.getItem("admin-token"); // Mendapatkan token

  // Memeriksa apakah role dan token ada, dan apakah role sesuai dengan yang diizinkan
  if (!token) {
    return <Navigate to="/" />; // Redirect ke halaman login jika tidak ada token
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />; // Redirect ke halaman login jika role tidak sesuai
  }

  return element; // Jika role sesuai, render komponen yang diberikan
};

export default PrivateRoute;
