import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import Sidebar from "./Sidebar";
import styles from "./KelolaSuratUser.module.css";

const KelolaSuratUser = () => {
  const [suratDisposisi, setSuratDisposisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
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

  const handleTindakLanjut = async (id) => {
    const token = localStorage.getItem("admin-token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/surat/tindak-lanjut/${id}`,
        { status_tindak_lanjut: "Tindak Lanjut" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (
        response.data.message ===
        "Status tindak lanjut surat berhasil diperbarui"
      ) {
        setSuratDisposisi((prevSurat) =>
          prevSurat.map((surat) =>
            surat.id === id
              ? { ...surat, status_tindak_lanjut: "Tindak Lanjut" }
              : surat,
          ),
        );
      } else {
        alert("Gagal memperbarui status tindak lanjut.");
      }
    } catch (error) {
      console.error("Error updating surat status:", error);
      alert("Terjadi kesalahan saat memperbarui status.");
    }
  };

  const filteredData = suratDisposisi.filter((surat) => {
    const q = search.toLowerCase();
    return (
      surat.nomor_agenda?.toString().toLowerCase().includes(q) ||
      surat.pengirim_surat?.toLowerCase().includes(q) ||
      surat.nomor_surat?.toLowerCase().includes(q) ||
      surat.pesan?.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>User Workspace</span>
              <h1>Kelola Surat User</h1>
              <p>
                Sajikan daftar surat disposisi lengkap dan tandai tindak lanjut
                dari halaman ini.
              </p>
            </div>

            <button
              className={styles.backBtn}
              onClick={() => navigate("/dashboard-user")}>
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
            <div className={styles.stateBox}>Loading surat disposisi...</div>
          ) : error ? (
            <div className={styles.stateError}>{error}</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      Nomor <br /> Agenda
                    </th>
                    <th>Tanggal Masuk</th>
                    <th>Pengirim</th>
                    <th>Nomor Surat</th>
                    <th>Tanggal Surat</th>
                    <th>Isi Ringkasan</th>
                    <th>Pesan Disposisi</th>
                    <th>
                      Status Tindak <br /> Lanjut
                    </th>
                    <th>File Surat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="10">
                        <div className={styles.emptyState}>
                          Tidak ada surat disposisi.
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
                        <td className={styles.summaryCell}>
                          {surat.isi_ringkasan}
                        </td>
                        <td className={styles.summaryCell}>{surat.pesan}</td>
                        <td>
                          {surat.status_tindak_lanjut === "Tindak Lanjut" ? (
                            <span className={styles.badgeSuccess}>Sudah</span>
                          ) : (
                            <span className={styles.badgeWarning}>Belum</span>
                          )}
                        </td>
                        <td>
                          {surat.file_surat ? (
                            <a
                              className={styles.fileLink}
                              href={`http://localhost:5000/uploads/${surat.file_surat}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              Lihat File
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <button
                            className={styles.statusBtn}
                            onClick={() => handleTindakLanjut(surat.id)}
                            disabled={
                              surat.status_tindak_lanjut === "Tindak Lanjut"
                            }>
                            Tandai Tindak Lanjut
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default KelolaSuratUser;
