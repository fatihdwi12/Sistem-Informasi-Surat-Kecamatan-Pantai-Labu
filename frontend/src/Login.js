import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Impor CSS Module

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (!response.data.token || !response.data.role) {
        setError("Login failed: Missing token or role");
        return;
      }

      localStorage.setItem("admin-token", response.data.token);
      localStorage.setItem("role", response.data.role);

      const userRole = response.data.role;

      if (userRole === "camat") {
        navigate("/dashboard-camat");
      } else if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "user") {
        navigate("/dashboard-user");
      } else {
        setError("You are not authorized to access this page.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else if (error.request) {
        setError("Network error, please try again later.");
      } else {
        setError("An error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.welcomeMessage}>
        <h1>
          Selamat Datang Pada Aplikasi Manajemen Surat
          <br />
          <span>Kecamatan Pantai Labu</span>
        </h1>
      </div>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Login;
