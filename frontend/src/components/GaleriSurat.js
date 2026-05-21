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

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 28,
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        valign: "middle",
      },
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: {
        textColor: 50,
      },
      theme: "grid",
    });

    const pdfOutput = doc.output("datauristring");
    const pdfWindow = window.open();
    if (pdfWindow) {
      pdfWindow.document.write(
        `<iframe width="100%" height="100%" src="${pdfOutput}"></iframe>`,
      );
    }
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>Document Gallery</span>
              <h1>Galeri Surat</h1>
              <p>
                Filter data surat dan cetak laporan PDF dengan tampilan yang
                lebih rapi.
              </p>
            </div>

            <button className={styles.pdfBtn} onClick={generatePDF}>
              Cetak PDF
            </button>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <label>Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Tanggal Selesai</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className={styles.filterActions}>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}>
                Reset
              </button>
            </div>
          </div>

          {loading ? (
            <div className={styles.stateBox}>Loading galeri surat...</div>
          ) : error ? (
            <div className={styles.stateError}>{error}</div>
          ) : (
            <div className={styles.tableWrap}>
              {filterData().length === 0 ? (
                <div className={styles.stateBox}>
                  Tidak ada surat untuk rentang tanggal ini.
                </div>
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
                      <th>
                        Status Tindak <br /> Lanjut
                      </th>
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
                        <td className={styles.summaryCell}>
                          {surat.isi_ringkasan}
                        </td>
                        <td>{surat.penanggung_jawab}</td>
                        <td>
                          <span
                            className={
                              surat.status === "disposisi"
                                ? styles.badgeSuccess
                                : styles.badgeWarning
                            }>
                            {surat.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={
                              surat.status_tindak_lanjut === "selesai"
                                ? styles.badgeSuccess
                                : styles.badgeNeutral
                            }>
                            {surat.status_tindak_lanjut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default GaleriSurat;
