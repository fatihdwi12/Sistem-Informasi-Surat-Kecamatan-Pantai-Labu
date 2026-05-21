import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import Sidebar from "./Sidebar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import styles from "./GaleriSurat.module.css";

const GaleriSurat = () => {
  const [suratGaleri, setSuratGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchGaleriSurat = async () => {
      const token = localStorage.getItem("admin-token");

      if (!token) {
        setError("Token is missing, please log in again.");
        setLoading(false);
        return;
      }

      try {
        let url = "http://localhost:5000/api/surat/masuk";
        if (role === "admin") {
          url = "http://localhost:5000/api/surat/masuk";
        } else if (role === "camat") {
          url = "http://localhost:5000/api/surat/camat";
        } else if (role === "user") {
          url = "http://localhost:5000/api/surat/user";
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedData = response.data
          .map((surat) => ({
            ...surat,
            tanggal_masuk: format(new Date(surat.tanggal_masuk), "dd MMM yyyy"),
            tanggal_surat: format(new Date(surat.tanggal_surat), "dd MMM yyyy"),
          }))
          .sort((a, b) => b.id - a.id);

        setSuratGaleri(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching galeri surat:", error);
        setError("Error fetching galeri surat.");
        setLoading(false);
      }
    };

    fetchGaleriSurat();
  }, [role]);

  const filterData = () => {
    return suratGaleri.filter((surat) => {
      const suratDate = new Date(surat.tanggal_masuk);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        (!startDate || suratDate >= start) && (!endDate || suratDate <= end)
      );
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Galeri Surat", 14, 16);

    const filteredData = filterData();

    const columns = [
      "Nomor Agenda",
      "Tanggal Masuk",
      "Pengirim Surat",
      "Nomor Surat",
      "Tanggal Surat",
      "Isi Ringkasan",
      "Penanggung Jawab",
      "Status",
      "Status Tindak Lanjut",
    ];

    const rows = filteredData.map((surat) => [
      surat.nomor_agenda,
      surat.tanggal_masuk,
      surat.pengirim_surat,
      surat.nomor_surat,
      surat.tanggal_surat,
      surat.isi_ringkasan,
      surat.penanggung_jawab,
      surat.status,
      surat.status_tindak_lanjut,
    ]);

    // Menggunakan autoTable untuk membuat tabel dengan pengaturan yang lebih baik
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30, // Mulai tabel dari posisi 30 di halaman
      margin: { top: 10, left: 10, right: 10, bottom: 10 }, // Margin untuk tabel
      styles: {
        fontSize: 10, // Ukuran font yang lebih kecil
        cellPadding: 1, // Padding untuk sel
        halign: "center", // Posisikan teks di tengah untuk semua kolom
        valign: "middle", // Posisikan teks di tengah secara vertikal
      },
      headStyles: {
        fillColor: [22, 160, 133], // Warna latar belakang header tabel
        textColor: 255, // Warna teks pada header tabel
        fontSize: 10, // Ukuran font header lebih besar
        halign: "center", // Header teks di tengah
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Latar belakang sel body tabel
        textColor: 50, // Warna teks pada body tabel
      },
      theme: "grid", // Tema grid untuk tabel
    });

    // Menyimpan PDF di jendela baru
    const pdfOutput = doc.output("datauristring");
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width="100%" height="100%" src="${pdfOutput}"></iframe>`
    );
  };

  return (
    <div className={styles.galeriSuratPage}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.container}>
        <div className={styles.galeriSuratContent}>
          <h1>Galeri Surat</h1>
          <div className={styles.filterContainer}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Tanggal Mulai"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Tanggal Selesai"
            />
            <button onClick={generatePDF}>Cetak PDF</button>
          </div>

          {loading ? (
            <p>Loading galeri surat...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className={styles.cardContainer}>
              {filterData().length === 0 ? (
                <p>No surat available for your role.</p>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nomor Agenda</th>
                      <th>Tanggal Masuk</th>
                      <th>Pengirim Surat</th>
                      <th>Nomor Surat</th>
                      <th>Tanggal Surat</th>
                      <th>Isi Ringkasan</th>
                      <th>Penanggung Jawab</th>
                      <th>Status</th>
                      <th>Status Tindak Lanjut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData().map((surat) => (
                      <tr key={surat.id}>
                        <td>{surat.nomor_agenda}</td>
                        <td>{surat.tanggal_masuk}</td>
                        <td>{surat.pengirim_surat}</td>
                        <td>{surat.nomor_surat}</td>
                        <td>{surat.tanggal_surat}</td>
                        <td>{surat.isi_ringkasan}</td>
                        <td>{surat.penanggung_jawab}</td>
                        <td>{surat.status}</td>
                        <td>{surat.status_tindak_lanjut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaleriSurat;
