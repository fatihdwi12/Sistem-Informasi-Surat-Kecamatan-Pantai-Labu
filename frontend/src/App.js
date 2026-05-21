import React from "react";
import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./Register";
import KelolaPengguna from "./components/Kelolapengguna";
import DashboardCamat from "./components/DashboardCamat";
import SuratMasuk from "./components/SuratMasuk";
import SuratMasukForm from "./components/SuratMasukForm";
import SuratMasukDetail from "./components/SuratMasukDetail";
import DashboardUser from "./components/DashboardUser";
import GaleriSurat from "./components/GaleriSurat";
import PrivateRoute from "./components/PrivateRoute";
import KelolaSuratCamat from "./components/KelolaSuratCamat";
import DetailSuratCamat from "./components/DetailSuratCamat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              allowedRoles={["admin"]}
              element={<AdminDashboard />}
            />
          }
        />

        <Route
          path="/admin/kelola-pengguna"
          element={
            <PrivateRoute
              allowedRoles={["admin"]}
              element={<KelolaPengguna />}
            />
          }
        />

        <Route
          path="/dashboard-camat"
          element={
            <PrivateRoute
              allowedRoles={["camat"]}
              element={<DashboardCamat />}
            />
          }
        />

        <Route
          path="/dashboard-user"
          element={
            <PrivateRoute allowedRoles={["user"]} element={<DashboardUser />} />
          }
        />

        <Route
          path="/surat-masuk"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasuk />}
            />
          }
        />

        <Route
          path="/surat-masuk/:id"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasukDetail />}
            />
          }
        />

        <Route
          path="/surat-masuk-form"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasukForm />}
            />
          }
        />

        <Route
          path="/surat-masuk-form/:id"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<SuratMasukForm />}
            />
          }
        />

        <Route
          path="/dashboard-camat"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<DashboardCamat />}
            />
          }
        />

        <Route
          path="/kelola-surat-camat"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<KelolaSuratCamat />}
            />
          }
        />

        <Route
          path="/kelola-surat-camat/:id"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat"]}
              element={<DetailSuratCamat />}
            />
          }
        />

        <Route
          path="/galeri-surat"
          element={
            <PrivateRoute
              allowedRoles={["admin", "camat", "user"]}
              element={<GaleriSurat />}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
