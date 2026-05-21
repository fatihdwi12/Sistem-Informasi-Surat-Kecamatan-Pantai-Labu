import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; // Import format dari date-fns
import Sidebar from "./Sidebar";
import Modal from "react-modal"; // Import Modal
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./SuratMasuk.module.css"; // Import CSS Module

const SuratMasuk = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [formData, setFormData] = useState({
    nomor_surat: "",
    tanggal_masuk: "",
    pengirim_surat: "",
    tanggal_surat: "",
    isi_ringkasan: "",
    penanggung_jawab: "",
    tujuan_surat: "",
    file_surat: null,
  });

  // State untuk input pencarian
  const [searchIsiRingkasan, setSearchIsiRingkasan] = useState("");
  const [searchPengirimSurat, setSearchPengirimSurat] = useState("");

  const navigate = useNavigate(); // Initialize navigate hook

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
        setSuratMasuk(sortedData); // Set data yang sudah diurutkan
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
        .then((response) => {
          alert("Surat successfully deleted");
          setSuratMasuk(suratMasuk.filter((surat) => surat.id !== suratId));
        })
        .catch((error) => {
          console.error("Error deleting surat:", error);
          alert("Failed to delete surat");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nomor_surat", formData.nomor_surat);
    data.append("tanggal_masuk", formData.tanggal_masuk);
    data.append("pengirim_surat", formData.pengirim_surat);
    data.append("tanggal_surat", formData.tanggal_surat);
    data.append("isi_ringkasan", formData.isi_ringkasan);
    data.append("penanggung_jawab", formData.penanggung_jawab); // Pastikan ini ada
    data.append("tujuan_surat", formData.tujuan_surat);

    if (formData.file_surat) {
      data.append("file_surat", formData.file_surat);
    } else {
      data.append("file_surat", selectedSurat.file_surat);
    }

    axios
      .put(`http://localhost:5000/api/surat/masuk/${selectedSurat.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Surat successfully updated!");
          setIsModalOpen(false);
          setSuratMasuk(
            suratMasuk.map((surat) =>
              surat.id === selectedSurat.id ? response.data.surat : surat
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error updating surat:", error);
        alert("Failed to update surat");
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file_surat: e.target.files[0],
    }));
  };

  // Fungsi untuk memfilter data surat berdasarkan pencarian
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
    <div className={styles.suratMasukContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h2>Surat Masuk</h2>

          {/* Form Pencarian */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Cari Isi Ringkasan"
              value={searchIsiRingkasan}
              onChange={(e) => setSearchIsiRingkasan(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cari Pengirim Surat"
              value={searchPengirimSurat}
              onChange={(e) => setSearchPengirimSurat(e.target.value)}
            />
          </div>

          <button
            className={styles.addBtn}
            onClick={() => navigate("/surat-masuk-form")}>
            + Tambah Surat
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nomor Agenda</th>
              <th>Tanggal Masuk</th>
              <th>Pengirim Surat</th>
              <th>Nomor Surat</th>
              <th>Tanggal Surat</th>
              <th>Isi Ringkasan</th>
              <th>File Surat</th>
              <th>Penanggung Jawab</th>
              <th>Status Disposisi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurat.length === 0 ? (
              <tr>
                <td colSpan="9" className={styles.noData}>
                  Tidak ada surat masuk
                </td>
              </tr>
            ) : (
              filteredSurat.map((surat) => (
                <tr key={surat.id}>
                  <td>{surat.nomor_agenda}</td>

                  <td>{format(new Date(surat.tanggal_masuk), "dd/MM/yyyy")}</td>
                  <td>{surat.pengirim_surat}</td>
                  <td>{surat.nomor_surat}</td>
                  <td>{format(new Date(surat.tanggal_surat), "dd/MM/yyyy")}</td>
                  <td>{surat.isi_ringkasan}</td>

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
                  <td>{surat.penanggung_jawab}</td>
                  <td>
                    {surat.status === "disposisi"
                      ? "Disposisi"
                      : "Belum Disposisi"}
                  </td>

                  <td className={styles.actions}>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Surat"
        ariaHideApp={false}>
        <h3>Edit Surat</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nomor Surat</label>
            <input
              type="text"
              name="nomor_surat"
              value={formData.nomor_surat}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Tanggal Masuk</label>
            <input
              type="date"
              name="tanggal_masuk"
              value={formData.tanggal_masuk}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Pengirim Surat</label>
            <input
              type="text"
              name="pengirim_surat"
              value={formData.pengirim_surat}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Tanggal Surat</label>
            <input
              type="date"
              name="tanggal_surat"
              value={formData.tanggal_surat}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Isi Ringkasan</label>
            <textarea
              name="isi_ringkasan"
              value={formData.isi_ringkasan}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Penanggung Jawab</label>
            <input
              type="text"
              name="penanggung_jawab"
              value={formData.penanggung_jawab}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Upload File Surat (Optional)</label>
            <input type="file" name="file_surat" onChange={handleFileChange} />
          </div>
          <div>
            <button type="submit">Simpan Perubahan</button>
            <button type="button" onClick={closeModal}>
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SuratMasuk;
