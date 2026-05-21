import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaImages, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  const adminSidebar = (
    <ul className="sidebar-menu">
      <li>
        <Link to="/surat-masuk" className="sidebar-link">
          <FaEnvelope className="sidebar-icon" />
          Surat Masuk
        </Link>
      </li>
      <li>
        <Link to="/galeri-surat" className="sidebar-link">
          {" "}
          {/* Link ke Galeri Surat */}
          <FaImages className="sidebar-icon" />
          Galeri Surat
        </Link>
      </li>
      <li>
        <Link to="/admin/kelola-pengguna" className="sidebar-link">
          <FaUser className="sidebar-icon" />
          Kelola Pengguna
        </Link>
      </li>
      <li>
        <Link to="/" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </Link>
      </li>
    </ul>
  );

  const userSidebar = (
    <ul className="sidebar-menu">
      <li>
        <Link to="/dashboard-user" className="sidebar-link">
          <FaEnvelope className="sidebar-icon" />
          Surat Disposisi
        </Link>
      </li>
      <li>
        <Link to="/galeri-surat" className="sidebar-link">
          {" "}
          {/* Link ke Galeri Surat */}
          <FaImages className="sidebar-icon" />
          Galeri Surat
        </Link>
      </li>
      <li>
        <Link to="/" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </Link>
      </li>
    </ul>
  );

  const camatSidebar = (
    <ul className="sidebar-menu">
      <li>
        <Link to="/dashboard-camat" className="sidebar-link">
          <FaEnvelope className="sidebar-icon" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/galeri-surat" className="sidebar-link">
          {" "}
          {/* Link ke Galeri Surat */}
          <FaImages className="sidebar-icon" />
          Galeri Surat
        </Link>
      </li>
      <li>
        <Link to="/" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <div
      className={`sidebar ${
        role === "admin"
          ? "sidebar-admin"
          : role === "camat"
          ? "sidebar-camat"
          : "sidebar-user"
      }`}>
      <div className="sidebar-header">
        <h2>Manajemen Surat</h2>
      </div>
      {role === "admin" && adminSidebar}
      {role === "camat" && camatSidebar}
      {role === "user" && userSidebar}
    </div>
  );
};

export default Sidebar;
