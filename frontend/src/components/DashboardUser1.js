import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import styles from "./DashboardUser1.module.css";
import { useNavigate } from "react-router-dom";

/* Ikon */
const InboxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M19 3H4.99C3.88 3 3 3.9 3 5v13c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 13h-4a3 3 0 0 1-6 0H5V5h14v11Z"
    />
  </svg>
);
const PendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11h-4V7h2v4h2v2Z"
    />
  </svg>
);

const n = (v) => Number(v ?? 0);

/* Widget horizontal (reuse style) */
const StatWidget = ({ title, value, color = "primary", Icon }) => (
  <div className={`stat-card stat-horizontal ${color}`} tabIndex={0}>
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

const DashboardUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token"); // pakai storage token yang sama
    if (!token) {
      navigate("/"); // balik ke login
      return;
    }
    axios
      .get(`http://localhost:5000/api/dashboard-user?_=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error /dashboard-user:", err);
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
            <h1>Dashboard User</h1>

            {data ? (
              <>
                <div className="stat-grid">
                  <StatWidget
                    title="Total Surat dari Camat"
                    value={data.total_dari_camat}
                    color="info"
                    Icon={InboxIcon}
                  />
                  <StatWidget
                    title="Belum Ditindaklanjuti"
                    value={data.belum_tindak_lanjut}
                    color="warning"
                    Icon={PendingIcon}
                  />
                </div>

                <div className="panel">
                  <div className="panel-body">
                    <div className="chart-placeholder" />
                  </div>
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

export default DashboardUser;
