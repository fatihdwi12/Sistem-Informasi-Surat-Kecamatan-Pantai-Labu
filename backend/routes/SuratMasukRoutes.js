const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken"); // Pastikan Anda mengimport middleware otentikasi

// Route untuk mengambil data surat masuk
router.get("/surat/masuk", authenticateToken, (req, res) => {
  const role = req.user.role; // Mendapatkan role dari user yang sudah terverifikasi

  // Logika untuk menyesuaikan dengan role (admin, camat, user)
  if (role === "admin") {
    // Ambil semua data surat masuk
    db.query("SELECT * FROM surat_masuk", (err, result) => {
      if (err) return res.status(500).send("Error fetching surat.");
      res.json(result);
    });
  } else if (role === "camat") {
    // Ambil surat masuk yang pengirimnya admin
    db.query(
      "SELECT * FROM surat_masuk WHERE pengirim_surat = 'admin'",
      (err, result) => {
        if (err) return res.status(500).send("Error fetching surat.");
        res.json(result);
      }
    );
  } else if (role === "user") {
    // Ambil surat masuk yang pengirimnya camat
    db.query(
      "SELECT * FROM surat_masuk WHERE pengirim_surat = 'camat'",
      (err, result) => {
        if (err) return res.status(500).send("Error fetching surat.");
        res.json(result);
      }
    );
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
});

module.exports = router;
