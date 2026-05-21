import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Ganti dengan:
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns"; // pastikan 'date-fns' sudah terinstal
import Sidebar from "./Sidebar"; // Import Sidebar
import styles from "./DashboardUser.module.css";

const DashboardUser = () => {
  const [suratDisposisi, setSuratDisposisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch surat disposisi dari API
  const fetchSuratDisposisi = async () => {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Dekode token untuk mendapatkan userId
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/surat/terusan/${userId}`, // Tambahkan userId ke URL
        {
          headers: { Authorization: `Bearer ${token}` }, // Token harus ada di sini
        }
      );

      // Urutkan data berdasarkan ID (paling besar terlebih dahulu)
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
  }, []); // Hanya memanggil sekali saat komponen pertama kali dimuat

  const handleTindakLanjut = async (id) => {
    const token = localStorage.getItem("admin-token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/surat/tindak-lanjut/${id}`,
        { status_tindak_lanjut: "Tindak Lanjut" }, // Mengirimkan status tindak lanjut
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log response untuk debugging
      console.log("Response from server:", response);

      if (
        response.data.message ===
        "Status tindak lanjut surat berhasil diperbarui"
      ) {
        setSuratDisposisi((prevSurat) =>
          prevSurat.map((surat) =>
            surat.id === id
              ? { ...surat, status_tindak_lanjut: "Tindak Lanjut" }
              : surat
          )
        );
      } else {
        alert("Gagal memperbarui status tindak lanjut.");
      }
    } catch (error) {
      console.error("Error updating surat status:", error);
      alert("Terjadi kesalahan saat memperbarui status.");
    }
  };

  return (
    <div className={styles.dashboardUserWrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className={styles.dashboardUserContent}>
        <h1>Dashboard User</h1>
        {loading ? (
          <p>Loading surat disposisi...</p>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nomor Agenda</th>
                <th>Tanggal Masuk</th>
                <th>Pengirim</th>
                <th>Nomor Surat</th>
                <th>Tanggal Surat</th>
                <th>Isi Ringkasan</th>
                <th>Pesan Disposisi</th>
                <th>Status</th>
                <th>File Surat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suratDisposisi.length === 0 ? (
                <tr>
                  <td colSpan="9">Tidak ada surat disposisi.</td>
                </tr>
              ) : (
                suratDisposisi.map((surat) => (
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
                    <td>{surat.isi_ringkasan}</td>
                    <td>{surat.pesan}</td>
                    <td
                      className={
                        surat.status_tindak_lanjut === "Tindak Lanjut"
                          ? "status-tindak-lanjut"
                          : "status-belum"
                      }>
                      {surat.status_tindak_lanjut === "Tindak Lanjut"
                        ? "Sudah"
                        : "Belum"}
                    </td>

                    {/* Kolom untuk menampilkan file PDF */}
                    <td>
                      {surat.file_surat ? (
                        <a
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
                        Tandai Sebagai Tindak Lanjut
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
