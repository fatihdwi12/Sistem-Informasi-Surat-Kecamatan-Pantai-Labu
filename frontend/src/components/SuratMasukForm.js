import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./SuratMasukForm.css"; // Styling untuk Form Surat Masuk

const SuratMasukForm = () => {
  const [formSurat, setFormSurat] = useState({
    nomorAgenda: "", // Nomor Agenda
    tanggalMasuk: "",
    pengirimSurat: "",
    nomorSurat: "", // Nomor Surat
    tanggalSurat: "",
    isiRingkasan: "",
    fileSurat: null,
    tujuanSurat: "",
  });
  const [users, setUsers] = useState([]); // Daftar pengguna (penanggung jawab)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/login");
    }

    // Fetch data pengguna (penanggung jawab)
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

    formData.append("nomor_agenda", formSurat.nomorAgenda); // Nomor Agenda
    formData.append("tanggal_masuk", formSurat.tanggalMasuk); // Tanggal masuk
    formData.append("pengirim_surat", formSurat.pengirimSurat); // Pengirim surat
    formData.append("nomor_surat", formSurat.nomorSurat); // Nomor Surat
    formData.append("tanggal_surat", formSurat.tanggalSurat); // Tanggal surat
    formData.append("isi_ringkasan", formSurat.isiRingkasan); // Isi ringkasan
    formData.append("tujuan_surat", formSurat.tujuanSurat); // Tujuan surat
    formData.append("file_surat", formSurat.fileSurat); // File surat

    console.log("Form Data:", formData); // Log data form yang dikirim

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

  // Filter users hanya dengan id 7 dan 21
  const filteredUsers = users.filter((user) => user.id === 7 || user.id === 21);

  return (
    <div className="form-input-container">
      <Sidebar />
      <form onSubmit={handleTambahSurat} className="form-input">
        <input
          type="text"
          name="nomorAgenda"
          value={formSurat.nomorAgenda}
          onChange={handleChange}
          placeholder="Nomor Agenda"
          required
        />
        <input
          type="date"
          name="tanggalMasuk"
          value={formSurat.tanggalMasuk}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pengirimSurat"
          value={formSurat.pengirimSurat}
          onChange={handleChange}
          placeholder="Pengirim Surat"
          required
        />
        <input
          type="text"
          name="nomorSurat"
          value={formSurat.nomorSurat}
          onChange={handleChange}
          placeholder="Nomor Surat"
          required
        />
        <input
          type="date"
          name="tanggalSurat"
          value={formSurat.tanggalSurat}
          onChange={handleChange}
          required
        />
        <textarea
          name="isiRingkasan"
          value={formSurat.isiRingkasan}
          onChange={handleChange}
          placeholder="Isi Ringkasan Surat"
          required
        />

        {/* Dropdown Tujuan Surat - Hanya id 7 dan 21 */}
        <select
          name="tujuanSurat"
          value={formSurat.tujuanSurat}
          onChange={handleChange}
          required>
          <option value="">Kirim Ke-</option>
          {filteredUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="fileSurat"
          onChange={handleChange}
          accept=".pdf,.docx,.txt"
          required
        />
        <button type="submit" className="submit-btn">
          Simpan Surat
        </button>
      </form>
    </div>
  );
};

export default SuratMasukForm;
