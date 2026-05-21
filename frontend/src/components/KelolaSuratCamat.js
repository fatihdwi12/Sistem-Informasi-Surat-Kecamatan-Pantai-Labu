import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./KelolaSuratCamat.module.css";

const KelolaSuratCamat = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [users, setUsers] = useState([]);
  const [petugasId, setPetugasId] = useState("");
  const [pesan, setPesan] = useState("");
  const [penanggungJawab, setPenanggungJawab] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredData = suratMasuk.filter((surat) => {
    const q = search.toLowerCase();
    return (
      surat.nomor_agenda?.toString().toLowerCase().includes(q) ||
      surat.pengirim_surat?.toLowerCase().includes(q) ||
      surat.nomor_surat?.toLowerCase().includes(q)
    );
  });

  const openDisposisiModal = (surat) => {
    setSelectedSurat(surat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSurat(null);
    setPetugasId("");
    setPesan("");
    setPenanggungJawab("");
  };

  const handleDisposisiSurat = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin-token");

    if (!selectedSurat) return;

    try {
      const payload = {
        petugas_id: petugasId,
        pesan,
        penanggung_jawab: penanggungJawab,
      };

      const response = await axios.put(
        `http://localhost:5000/api/surat/disposisi/${selectedSurat.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      alert(response.data.message);
      closeModal();

      const refresh = await axios.get("http://localhost:5000/api/surat/masuk", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuratMasuk(refresh.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error disposing surat:", error);
      alert("Gagal disposisi surat.");
    }
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>Surat Camat</span>
              <h1>Kelola Surat Masuk</h1>
              <p>
                Daftar surat masuk dari dashboard admin. Informasi yang tampil
                hanya data penting agar lebih ringkas.
              </p>
            </div>

            <button
              className={styles.backBtn}
              onClick={() => navigate("/dashboard-camat")}>
              Kembali ke Dashboard
            </button>
          </div>

          <div className={styles.toolbar}>
            <input
              type="text"
              placeholder="Cari nomor agenda, pengirim, nomor surat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {loading ? (
            <div className={styles.stateBox}>Loading data surat...</div>
          ) : error ? (
            <div className={styles.stateError}>{error}</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nomor Agenda</th>
                    <th>Tanggal Masuk</th>
                    <th>Pengirim</th>
                    <th>Nomor Surat</th>
                    <th>Tanggal Surat</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="7">
                        <div className={styles.emptyState}>
                          Tidak ada data surat.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((surat) => (
                      <tr key={surat.id}>
                        <td>{surat.nomor_agenda}</td>
                        <td>
                          {format(new Date(surat.tanggal_masuk), "dd MMM yyyy")}
                        </td>
                        <td>{surat.pengirim_surat}</td>
                        <td>{surat.nomor_surat}</td>
                        <td>
                          {format(new Date(surat.tanggal_surat), "dd MMM yyyy")}
                        </td>
                        <td>
                          {surat.status === "disposisi" ? (
                            <span className={styles.badgeSuccess}>
                              Didisposisi
                            </span>
                          ) : (
                            <span className={styles.badgeWarning}>Belum</span>
                          )}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              className={styles.detailBtn}
                              onClick={() =>
                                navigate(`/kelola-surat-camat/${surat.id}`)
                              }>
                              Detail
                            </button>
                            <button
                              className={styles.actionBtn}
                              onClick={() => openDisposisiModal(surat)}>
                              Disposisi
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.kicker}>Disposisi Surat</span>
                  <h3>Atur Disposisi</h3>
                </div>
                <button className={styles.closeBtn} onClick={closeModal}>
                  ×
                </button>
              </div>

              <form
                className={styles.modalForm}
                onSubmit={handleDisposisiSurat}>
                <div className={styles.formGroup}>
                  <label>Pilih Petugas</label>
                  <select
                    value={petugasId}
                    onChange={(e) => setPetugasId(e.target.value)}
                    required>
                    <option value="">Pilih petugas</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} - {user.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Pesan Instruksi</label>
                  <textarea
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    placeholder="Masukkan pesan instruksi"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Penanggung Jawab</label>
                  <input
                    type="text"
                    value={penanggungJawab}
                    onChange={(e) => setPenanggungJawab(e.target.value)}
                    placeholder="Masukkan penanggung jawab"
                    required
                  />
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={closeModal}>
                    Batal
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Kirim Disposisi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KelolaSuratCamat;
