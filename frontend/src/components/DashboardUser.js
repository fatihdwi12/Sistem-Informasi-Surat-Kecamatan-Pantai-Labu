import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./Sidebar";
import styles from "./DashboardUser.module.css";

const DashboardUser = () => {
  const [suratDisposisi, setSuratDisposisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSuratDisposisi = async () => {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/surat/terusan/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const sortedData = response.data.sort((a, b) => b.id - a.id);
      setSuratDisposisi(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching surat disposisi:", error);
      setError("Failed to fetch surat disposisi. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuratDisposisi();
  }, []);

  const totalSurat = suratDisposisi.length;
  const sudahTindakLanjut = suratDisposisi.filter(
    (s) => s.status_tindak_lanjut === "Tindak Lanjut",
  ).length;
  const belumTindakLanjut = suratDisposisi.filter(
    (s) => s.status_tindak_lanjut !== "Tindak Lanjut",
  ).length;

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>User Workspace</span>
              <h1>Dashboard User</h1>
              <p>
                Pantau ringkasan surat disposisi dan buka halaman kelola untuk
                melihat data lengkap.
              </p>
            </div>

            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/kelola-surat-user")}>
              Lihat Kelola Surat
            </button>
          </div>

          {loading ? (
            <div className={styles.stateBox}>Loading surat disposisi...</div>
          ) : error ? (
            <div className={styles.stateError}>{error}</div>
          ) : (
            <>
              <div className={styles.summaryRow}>
                <div className={styles.summaryCard}>
                  <span>Total Surat</span>
                  <strong>{totalSurat}</strong>
                </div>
                <div className={styles.summaryCard}>
                  <span>Sudah Tindak Lanjut</span>
                  <strong>{sudahTindakLanjut}</strong>
                </div>
                <div className={styles.summaryCard}>
                  <span>Belum Tindak Lanjut</span>
                  <strong>{belumTindakLanjut}</strong>
                </div>
              </div>

              <div className={styles.noteCard}>
                <h3>Ringkasan Aktivitas</h3>
                <p>
                  Gunakan halaman kelola surat untuk membaca isi surat, melihat
                  file, dan menandai tindak lanjut.
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardUser;
