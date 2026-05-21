import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./SuratMasukForm.module.css";

const SuratMasukForm = () => {
  const [formSurat, setFormSurat] = useState({
    nomorAgenda: "",
    tanggalMasuk: "",
    pengirimSurat: "",
    nomorSurat: "",
    tanggalSurat: "",
    isiRingkasan: "",
    fileSurat: null,
    tujuanSurat: "",
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormSurat((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleTambahSurat = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin-token");
    const formData = new FormData();

    formData.append("nomor_agenda", formSurat.nomorAgenda);
    formData.append("tanggal_masuk", formSurat.tanggalMasuk);
    formData.append("pengirim_surat", formSurat.pengirimSurat);
    formData.append("nomor_surat", formSurat.nomorSurat);
    formData.append("tanggal_surat", formSurat.tanggalSurat);
    formData.append("isi_ringkasan", formSurat.isiRingkasan);
    formData.append("tujuan_surat", formSurat.tujuanSurat);
    formData.append("file_surat", formSurat.fileSurat);

    axios
      .post("http://localhost:5000/api/surat/masuk", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.message);
        setFormSurat({
          nomorAgenda: "",
          tanggalMasuk: "",
          pengirimSurat: "",
          nomorSurat: "",
          tanggalSurat: "",
          isiRingkasan: "",
          tujuanSurat: "",
          fileSurat: null,
        });
        navigate("/surat-masuk");
      })
      .catch((error) => {
        console.error("Error adding surat masuk:", error);
        alert("Failed to add surat masuk.");
      });
  };

  const filteredUsers = users.filter((user) => user.id === 7 || user.id === 21);

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.kicker}>Form Input</span>
              <h2>Tambah Surat Masuk</h2>
              <p>
                Isi semua data di bawah ini untuk menambahkan surat masuk baru.
              </p>
            </div>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => navigate("/surat-masuk")}>
              Kembali
            </button>
          </div>

          <form onSubmit={handleTambahSurat} className={styles.form}>
            <div className={styles.sectionTitle}>Informasi Surat</div>
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label>Nomor Agenda</label>
                <input
                  type="text"
                  name="nomorAgenda"
                  value={formSurat.nomorAgenda}
                  onChange={handleChange}
                  placeholder="Contoh: 001/2025"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Nomor Surat</label>
                <input
                  type="text"
                  name="nomorSurat"
                  value={formSurat.nomorSurat}
                  onChange={handleChange}
                  placeholder="Contoh: 879/po/2253/2025"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tanggal Masuk</label>
                <input
                  type="date"
                  name="tanggalMasuk"
                  value={formSurat.tanggalMasuk}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tanggal Surat</label>
                <input
                  type="date"
                  name="tanggalSurat"
                  value={formSurat.tanggalSurat}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Pengirim & Tujuan</div>
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label>Pengirim Surat</label>
                <input
                  type="text"
                  name="pengirimSurat"
                  value={formSurat.pengirimSurat}
                  onChange={handleChange}
                  placeholder="Nama instansi / pengirim"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Kirim Ke</label>
                <select
                  name="tujuanSurat"
                  value={formSurat.tujuanSurat}
                  onChange={handleChange}
                  required>
                  <option value="">Pilih tujuan surat</option>
                  {filteredUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.sectionTitle}>Isi & Lampiran</div>
            <div className={styles.formGroup}>
              <label>Isi Ringkasan Surat</label>
              <textarea
                name="isiRingkasan"
                value={formSurat.isiRingkasan}
                onChange={handleChange}
                placeholder="Tuliskan ringkasan isi surat..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>File Surat</label>
              <div className={styles.fileWrap}>
                <input
                  type="file"
                  name="fileSurat"
                  onChange={handleChange}
                  accept=".pdf,.docx,.txt"
                  required
                  id="fileSurat"
                  className={styles.fileInput}
                />
                <label htmlFor="fileSurat" className={styles.fileLabel}>
                  <span className={styles.fileIcon}>📎</span>
                  {formSurat.fileSurat
                    ? formSurat.fileSurat.name
                    : "Pilih file PDF, DOCX, atau TXT"}
                </label>
              </div>
              <span className={styles.fileHint}>
                Maks. 10MB. Format: PDF, DOCX, TXT
              </span>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate("/surat-masuk")}>
                Batal
              </button>
              <button type="submit" className={styles.submitBtn}>
                Simpan Surat
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SuratMasukForm;
