import React from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaImages, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  const sidebarClass =
    role === "admin"
      ? "sidebar sidebar-admin"
      : role === "camat"
        ? "sidebar sidebar-camat"
        : "sidebar sidebar-user";

  const logout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("role");
  };

  const adminSidebar = (
    <ul className="sidebar-menu">
      <li>
        <NavLink to="/surat-masuk" className="sidebar-link">
          <FaEnvelope className="sidebar-icon" />
          Surat Masuk
        </NavLink>
      </li>
      <li>
        <NavLink to="/galeri-surat" className="sidebar-link">
          <FaImages className="sidebar-icon" />
          Galeri Surat
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/kelola-pengguna" className="sidebar-link">
          <FaUser className="sidebar-icon" />
          Kelola Pengguna
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="sidebar-link" onClick={logout}>
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </NavLink>
      </li>
    </ul>
  );

  const userSidebar = (
    <ul className="sidebar-menu">
      <li>
        <NavLink to="/dashboard-user" className="sidebar-link">
          <FaEnvelope className="sidebar-icon" />
          Surat Disposisi
        </NavLink>
      </li>
      <li>
        <NavLink to="/galeri-surat" className="sidebar-link">
          <FaImages className="sidebar-icon" />
          Galeri Surat
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="sidebar-link" onClick={logout}>
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </NavLink>
      </li>
    </ul>
  );

  const camatSidebar = (
    <ul className="sidebar-menu">
      <li>
        <NavLink to="/dashboard-camat" className="sidebar-link">
          <FaEnvelope className="sidebar-icon" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/galeri-surat" className="sidebar-link">
          <FaImages className="sidebar-icon" />
          Galeri Surat
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="sidebar-link" onClick={logout}>
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </NavLink>
      </li>
    </ul>
  );

  return (
    <aside className={sidebarClass}>
      <div className="sidebar-header">
        <NavLink to="/admin/dashboard" className="sidebar-brand">
          <h2>Manajemen Surat</h2>
        </NavLink>
      </div>

      {role === "admin" && adminSidebar}
      {role === "camat" && camatSidebar}
      {role === "user" && userSidebar}
    </aside>
  );
};

export default Sidebar;
