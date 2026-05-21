import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Sidebar from "./Sidebar";
import styles from "./DetailSuratCamat.module.css";

const DetailSuratCamat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/surat/masuk/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSurat(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat detail surat.");
        setLoading(false);
      });
  }, [id, navigate]);

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>Detail Surat</span>
              <h1>Detail Surat Camat</h1>
              <p>Informasi lengkap surat masuk yang dipilih.</p>
            </div>

            <button
              className={styles.backBtn}
              onClick={() => navigate("/kelola-surat-camat")}>
              Kembali
            </button>
          </div>

          {loading ? (
            <div className={styles.stateBox}>Loading detail surat...</div>
          ) : error ? (
            <div className={styles.stateError}>{error}</div>
          ) : surat ? (
            <>
              <div className={styles.summaryRow}>
                <div className={styles.summaryCard}>
                  <span>Nomor Agenda</span>
                  <strong>{surat.nomor_agenda}</strong>
                </div>
                <div className={styles.summaryCard}>
                  <span>Status</span>
                  <strong>
                    {surat.status === "disposisi" ? "Didisposisi" : "Belum"}
                  </strong>
                </div>
                <div className={styles.summaryCard}>
                  <span>Pengirim</span>
                  <strong>{surat.pengirim_surat}</strong>
                </div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <label>Nomor Surat</label>
                  <p>{surat.nomor_surat}</p>
                </div>

                <div className={styles.detailItem}>
                  <label>Tanggal Masuk</label>
                  <p>{format(new Date(surat.tanggal_masuk), "dd MMM yyyy")}</p>
                </div>

                <div className={styles.detailItem}>
                  <label>Tanggal Surat</label>
                  <p>{format(new Date(surat.tanggal_surat), "dd MMM yyyy")}</p>
                </div>

                <div className={styles.detailItem}>
                  <label>Penanggung Jawab</label>
                  <p>{surat.penanggung_jawab || "-"}</p>
                </div>

                <div className={styles.fullItem}>
                  <label>Isi Ringkasan</label>
                  <p>{surat.isi_ringkasan}</p>
                </div>

                <div className={styles.fullItem}>
                  <label>File Surat</label>
                  {surat.file_surat ? (
                    <a
                      className={styles.fileLink}
                      href={`http://localhost:5000/uploads/${surat.file_surat}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      Lihat File Surat
                    </a>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.stateBox}>Data surat tidak ditemukan.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DetailSuratCamat;
