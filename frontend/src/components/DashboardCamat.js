import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./DashboardCamat.module.css";

const DashboardCamat = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/surat/masuk", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setSuratMasuk(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching surat masuk:", error);
        setError("Failed to fetch surat masuk.");
        setLoading(false);
      });
  }, [navigate]);

  const totalSurat = suratMasuk.length;
  const suratDisposisi = suratMasuk.filter(
    (s) => s.status === "disposisi",
  ).length;
  const suratBelumDisposisi = suratMasuk.filter(
    (s) => s.status !== "disposisi",
  ).length;

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>Camat Workspace</span>
              <h1>Dashboard Camat</h1>
              <p>
                Pantau ringkasan data surat masuk, status disposisi, dan surat
                yang belum diproses.
              </p>
            </div>

            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/kelola-surat-camat")}>
              Lihat Tabel Surat
            </button>
          </div>

          {loading ? (
            <div className={styles.stateBox}>Loading data dashboard...</div>
          ) : error ? (
            <div className={styles.stateError}>{error}</div>
          ) : (
            <>
              <div className={styles.summaryRow}>
                <div className={styles.summaryCard}>
                  <span>Total Surat Masuk</span>
                  <strong>{totalSurat}</strong>
                </div>

                <div className={styles.summaryCard}>
                  <span>Surat Didisposisi</span>
                  <strong>{suratDisposisi}</strong>
                </div>

                <div className={styles.summaryCard}>
                  <span>Surat Belum Didisposisi</span>
                  <strong>{suratBelumDisposisi}</strong>
                </div>
              </div>

              <div className={styles.noteCard}>
                <h3>Ringkasan Aktivitas</h3>
                <p>
                  Gunakan tombol <strong>Lihat Tabel Surat</strong> untuk
                  membuka daftar surat masuk lengkap yang dikirim dari dashboard
                  admin.
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardCamat;
