import React, { useState, useEffect } from "react";
import "./AdminDashboard.css"; // Pastikan file CSS sudah benar dan diimport
import vector from "./Vector.png"; // Gambar yang digunakan di dalam Box

export const Box = (): JSX.Element => {
  // State untuk waktu dan tanggal
  const [currentDateTime, setCurrentDateTime] = useState(""); // Tidak perlu tipe string di sini

  // Effect untuk memperbarui waktu setiap detik
  useEffect(() => {
    const updateDateTime = () => {
      const currentDate = new Date();

      // Format tanggal dengan menggunakan Intl.DateTimeFormat
      const formattedDate = new Intl.DateTimeFormat("id-ID", {
        weekday: "long", // Menampilkan nama hari
        year: "numeric", // Tahun
        month: "long", // Nama bulan
        day: "numeric", // Tanggal
      }).format(currentDate);

      setCurrentDateTime(formattedDate); // Update state dengan tanggal terformat
    };

    // Update waktu setiap detik
    const intervalId = setInterval(updateDateTime, 1000);

    // Bersihkan interval saat komponen dibersihkan
    return () => clearInterval(intervalId);
  }, []); // Dependency array kosong, karena setCurrentDateTime tidak berubah

  return (
    <div className="box">
      <div className="group">
        <div className="overlap-group">
          <div className="overlap">
            <div className="text-wrapper-container">
              <div className="text-wrapper">Welcome, Administrator!</div>
              <img className="vector" alt="Vector" src={vector} />
            </div>
            {/* Menampilkan waktu dan tanggal */}
            <div className="time-date">{currentDateTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
