const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Ganti dengan username MySQL kamu
  password: "", // Ganti dengan password MySQL kamu jika ada
  database: "manajemen_surat", // Nama database yang sudah dibuat
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
