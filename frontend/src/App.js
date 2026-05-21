import React from "react";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Pastikan menggunakan Routes dan Route dari React Router v6
import AdminDashboard from "./components/AdminDashboard";
import Register from "./Register";
import KelolaPengguna from "./components/Kelolapengguna";
import DashboardCamat from "./components/DashboardCamat";
import SuratMasuk from "./components/SuratMasuk";
import SuratMasukForm from "./components/SuratMasukForm"; // Impor SuratMasukForm
import DashboardUser from "./components/DashboardUser";
import GaleriSurat from "./components/GaleriSurat"; // Impor komponen Galeri Surat
import PrivateRoute from "./components/PrivateRoute"; // Mengimpor PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman login */}
        <Route path="/" element={<Login />} /> {/* Halaman Login */}
        <Route path="register" element={<Register />} />
        {/* Private Route untuk halaman Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              allowedRoles={["admin"]}
              element={<AdminDashboard />}
            />
          }
        />
        {/* Private Route untuk Kelola Pengguna (Admin) */}
        <Route
          path="/admin/kelola-pengguna"
          element={
            <PrivateRoute
              allowedRoles={["admin"]}
              element={<KelolaPengguna />}
            />
          }
        />
        {/* Private Route untuk halaman Camat */}
        <Route
          path="/dashboard-camat"
          element={
            <PrivateRoute
              allowedRoles={["camat"]}
              element={<DashboardCamat />}
            />
          }
        />
        {/* Private Route untuk halaman User */}
        <Route
          path="/dashboard-user"
          element={
            <PrivateRoute allowedRoles={["user"]} element={<DashboardUser />} />
          }
        />
        {/* Route untuk Surat Masuk yang hanya bisa diakses oleh admin/camat */}
        <Route
          path="/surat-masuk"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasuk />}
            />
          }
        />
        {/* Route untuk Surat Masuk Form (Input Surat) */}
        <Route
          path="/surat-masuk-form"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasukForm />} // Mengarah ke halaman SuratMasukForm
            />
          }
        />
        {/* Route untuk Surat Masuk Form dengan ID (Edit Surat) */}
        <Route
          path="/surat-masuk-form/:id" // Surat masuk form dengan parameter ID
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasukForm />} // Mengarah ke halaman SuratMasukForm dengan ID untuk edit
            />
          }
        />
        {/* Route untuk Galeri Surat yang dapat diakses oleh semua role */}
        <Route
          path="/galeri-surat"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat", "user"]} // Semua role dapat mengakses Galeri Surat
              element={<GaleriSurat />} // Komponen Galeri Surat
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
