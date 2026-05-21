import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./DashboardCamat.module.css";
import { format } from "date-fns";

const DashboardCamat = () => {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);
  const [petugasId, setPetugasId] = useState("");
  const [penanggungJawab, setPenanggungJawab] = useState(""); // Penanggung Jawab
  const [pesan, setPesan] = useState("");
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(""); // Untuk menyimpan role pengguna
  const navigate = useNavigate();

  const fetchSuratMasuk = useCallback(async () => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/surat/masuk",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const sortedData = response.data.sort((a, b) => b.id - a.id);
      setSuratMasuk(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching surat masuk:", error);
      setError("Failed to fetch surat masuk.");
      setLoading(false);
    }
  }, [navigate]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("admin-token");
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token
      setUserRole(decodedToken.role); // Set role dari token
    } else {
      navigate("/login");
    }

    fetchSuratMasuk();
    fetchUsers();
  }, [fetchSuratMasuk, navigate]);

  const handleDisposisiClick = (surat) => {
    setSelectedSurat(surat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPetugasId("");
    setPenanggungJawab(""); // Reset penanggungJawab
    setPesan("");
  };

  const handlePetugasSelect = (e) => {
    const petugas = users.find((user) => user.id === e.target.value);
    setPetugasId(e.target.value);
  };

  const handleDisposisiSurat = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin-token");

    const formData = {
      petugas_id: petugasId,
      pesan: pesan,
      penanggung_jawab: penanggungJawab, // Kirim data penanggungJawab
    };

    axios
      .put(
        `http://localhost:5000/api/surat/disposisi/${selectedSurat.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/surat-masuk");
      })
      .catch((error) => {
        console.error("Error disposing surat:", error);
        alert("Gagal disposisi surat.");
      });
  };

  return (
    <div className={styles.dashboardCamatWrapper}>
      <Sidebar />
      <div className={styles.dashboardCamatContent}>
        <h1>Dashboard Camat</h1>
        {loading ? (
          <p>Loading surat masuk...</p>
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
                <th>Status Disposisi</th>
                <th>Penanggung Jawab</th>
                <th>File Surat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suratMasuk.length === 0 ? (
                <tr>
                  <td colSpan="9">Tidak ada surat masuk.</td>
                </tr>
              ) : (
                suratMasuk.map((surat) => (
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

                    <td>
                      {surat.status === "disposisi" ? (
                        <button className={styles.statusBtnDisposisi}>
                          Sudah Didisposisi
                        </button>
                      ) : (
                        <button className={styles.statusBtnBelum}>
                          Belum Didisposisi
                        </button>
                      )}
                    </td>
                    <td>{surat.penanggung_jawab}</td>
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
                      {(userRole === "admin" || userRole === "camat") && (
                        <button onClick={() => handleDisposisiClick(surat)}>
                          Disposisi ke Petugas
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>Disposisi Surat</h3>
              <label>Select Petugas:</label>
              <select
                value={petugasId}
                onChange={(e) => handlePetugasSelect(e)}>
                <option value="">Select Petugas</option>
                {users.length > 0 ? (
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} - {user.role}
                    </option>
                  ))
                ) : (
                  <option value="">No Users Available</option>
                )}
              </select>
              <br />
              <label>Pesan Instruksi:</label>
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Masukkan pesan instruksi"
              />
              <br />
              <label>Penanggung Jawab:</label>
              <input
                type="text"
                value={penanggungJawab}
                onChange={(e) => setPenanggungJawab(e.target.value)}
                placeholder="Masukkan penanggung jawab"
              />
              <br />
              <button onClick={handleDisposisiSurat}>Disposisi</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCamat;
