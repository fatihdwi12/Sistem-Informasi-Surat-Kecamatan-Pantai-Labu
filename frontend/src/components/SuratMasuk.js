import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import styles from "./SuratMasuk.module.css";

const SuratMasuk = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [searchIsiRingkasan, setSearchIsiRingkasan] = useState("");
  const [searchPengirimSurat, setSearchPengirimSurat] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      alert("Token not found. Please log in again.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/surat/masuk", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sortedData = res.data.sort((a, b) => b.id - a.id);
        setSuratMasuk(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [navigate]);

  const handleDeleteClick = (suratId) => {
    if (window.confirm("Are you sure you want to delete this surat?")) {
      axios
        .delete(`http://localhost:5000/api/surat/masuk/${suratId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
          },
        })
        .then(() => {
          alert("Surat successfully deleted");
          setSuratMasuk(suratMasuk.filter((surat) => surat.id !== suratId));
        })
        .catch((error) => {
          console.error("Error deleting surat:", error);
          alert("Failed to delete surat");
        });
    }
  };

  const filteredSurat = suratMasuk.filter((surat) => {
    const isiRingkasanMatch = surat.isi_ringkasan
      .toLowerCase()
      .includes(searchIsiRingkasan.toLowerCase());
    const pengirimSuratMatch = surat.pengirim_surat
      .toLowerCase()
      .includes(searchPengirimSurat.toLowerCase());
    return isiRingkasanMatch && pengirimSuratMatch;
  });

  return (
    <div className={styles.suratMasukPage}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.pageCard}>
          <div className={styles.header}>
            <div>
              <h2>Surat Masuk</h2>
              <p>Kelola surat masuk dan buka detail lengkap bila diperlukan.</p>
            </div>
            <button
              className={styles.addBtn}
              onClick={() => navigate("/surat-masuk-form")}>
              + Tambah Surat
            </button>
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Cari isi ringkasan"
              value={searchIsiRingkasan}
              onChange={(e) => setSearchIsiRingkasan(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cari pengirim surat"
              value={searchPengirimSurat}
              onChange={(e) => setSearchPengirimSurat(e.target.value)}
            />
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nomor Agenda</th>
                  <th>Tanggal Masuk</th>
                  <th>Pengirim Surat</th>
                  <th>Nomor Surat</th>
                  <th>Ringkasan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurat.length === 0 ? (
                  <tr>
                    <td colSpan="7" className={styles.noData}>
                      Tidak ada surat masuk
                    </td>
                  </tr>
                ) : (
                  filteredSurat.map((surat) => (
                    <tr key={surat.id}>
                      <td>{surat.nomor_agenda}</td>
                      <td>
                        {format(new Date(surat.tanggal_masuk), "dd/MM/yyyy")}
                      </td>
                      <td>{surat.pengirim_surat}</td>
                      <td>{surat.nomor_surat}</td>
                      <td className={styles.summaryCell}>
                        {surat.isi_ringkasan}
                      </td>
                      <td>
                        <span
                          className={
                            surat.status === "disposisi"
                              ? styles.statusDone
                              : styles.statusPending
                          }>
                          {surat.status === "disposisi"
                            ? "Disposisi"
                            : "Belum Disposisi"}
                        </span>
                      </td>
                      <td className={styles.actions}>
                        <button
                          className={styles.detailBtn}
                          onClick={() => navigate(`/surat-masuk/${surat.id}`)}>
                          Detail
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteClick(surat.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuratMasuk;
