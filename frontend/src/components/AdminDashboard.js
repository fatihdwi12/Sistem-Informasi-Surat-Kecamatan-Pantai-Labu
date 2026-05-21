import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Box } from "./Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ---- Ikon SVG ringan (tanpa dependency) ---- */
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
    />
  </svg>
);
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M2 21 23 12 2 3v7l15 2-15 2v7Z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z"
    />
  </svg>
);

/* helper: pastikan angka (backend MySQL kadang kirim string) */
const n = (v) => Number(v ?? 0);

/* ---- Komponen kecil untuk 1 widget (horizontal) ---- */
const StatWidget = ({ title, value, color = "primary", Icon }) => (
  <div className={`stat-card stat-horizontal ${color}`} tabIndex={0}>
    {/* header berwarna */}
    <div className="stat-header">
      <div className="icon-box">
        <Icon />
      </div>
      <div className="stat-info">
        <h4>{title}</h4>
        <p>{n(value)}</p>
      </div>
      <button className="stat-action" aria-label="More options">
        ⋯
      </button>
    </div>

    {/* mini chart / sparkline */}
    <div className="stat-chart">
      <svg
        className="spark"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        aria-hidden="true">
        <path
          className="spark-line"
          d="M0,20 L15,15 L30,22 L45,10 L60,16 L75,8 L90,14 L100,9"
        />
      </svg>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      alert("Token not found. Please log in again.");
      navigate("/login");
      return;
    }
    axios
      .get(`http://localhost:5000/api/dashboard-admin?_=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
        if (err.response && err.response.status === 403)
          navigate("/unauthorized");
      });
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="content">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            <h1>Dashboard Admin</h1>

            {/* === PANEL BOX LAMA === */}
            <div className="panel box-panel">
              <div className="panel-body">{data && <Box data={data} />}</div>
            </div>

            {data ? (
              <>
                {/* GRID WIDGET */}
                <div className="stat-grid">
                  {/* GANTI: widget pertama sekarang Total Surat */}
                  <StatWidget
                    title="Total Surat"
                    value={data.total_surat}
                    color="info"
                    Icon={MailIcon}
                  />
                  <StatWidget
                    title="Surat Sudah Disposisi"
                    value={data.surat_disposisi}
                    color="warning"
                    Icon={SendIcon}
                  />
                  <StatWidget
                    title="Sudah Ditindaklanjuti"
                    value={data.surat_tindak_lanjut}
                    color="danger"
                    Icon={CheckIcon}
                  />
                </div>
              </>
            ) : (
              <p>No data available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
