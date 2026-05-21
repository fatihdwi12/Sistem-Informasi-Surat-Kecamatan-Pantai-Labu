import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Sidebar from "./Sidebar";
import styles from "./SuratMasukDetail.module.css";

const SuratMasukDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(null);

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
      .then((res) => setSurat(res.data))
      .catch((err) => {
        console.error(err);
        alert("Gagal memuat detail surat.");
      });
  }, [id, navigate]);

  if (!surat) {
    return (
      <div className={styles.page}>
        <Sidebar />
        <main className={styles.contentArea}>
          <section className={styles.card}>
            <div className={styles.loading}>Memuat detail surat...</div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.hero}>
            <div>
              <div className={styles.kicker}>Surat Masuk</div>
              <h2>Detail Informasi Surat</h2>
              <p>
                Lihat informasi lengkap surat masuk dalam tampilan yang lebih
                rapi.
              </p>
            </div>

            <button
              className={styles.backBtn}
              onClick={() => navigate("/surat-masuk")}>
              Kembali
            </button>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              Nomor Agenda: <strong>{surat.nomor_agenda}</strong>
            </span>
            <span
              className={
                surat.status === "disposisi"
                  ? styles.statusDone
                  : styles.statusPending
              }>
              {surat.status === "disposisi" ? "Disposisi" : "Belum Disposisi"}
            </span>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.label}>Nomor Surat</span>
              <span className={styles.value}>{surat.nomor_surat}</span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.label}>Tanggal Masuk</span>
              <span className={styles.value}>
                {format(new Date(surat.tanggal_masuk), "dd/MM/yyyy")}
              </span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.label}>Tanggal Surat</span>
              <span className={styles.value}>
                {format(new Date(surat.tanggal_surat), "dd/MM/yyyy")}
              </span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.label}>Pengirim Surat</span>
              <span className={styles.value}>{surat.pengirim_surat}</span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.label}>Penanggung Jawab</span>
              <span className={styles.value}>{surat.penanggung_jawab}</span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.label}>Tujuan Surat</span>
              <span className={styles.value}>{surat.tujuan_surat}</span>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <h3>Isi Ringkasan</h3>
            <p className={styles.summaryText}>{surat.isi_ringkasan}</p>
          </div>

          <div className={styles.sectionBlock}>
            <h3>File Surat</h3>
            <div className={styles.fileBox}>
              {surat.file_surat ? (
                <a
                  href={`http://localhost:5000/uploads/${surat.file_surat}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fileLink}>
                  Lihat File
                </a>
              ) : (
                <span className={styles.fileEmpty}>
                  Tidak ada file terlampir
                </span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuratMasukDetail;
