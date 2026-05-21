require("dotenv").config(); // Memuat file .env ke dalam environment

const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./db"); // Menggunakan file db.js untuk koneksi ke database
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk parsing JSON
app.use(express.json());

// CORS Middleware (untuk menerima permintaan dari frontend yang berbeda origin)
app.use(
  cors({
    origin: "http://localhost:3000", // Gantilah dengan domain frontend Anda
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Setup untuk menyimpan file upload menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Menyimpan file di folder 'uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Middleware untuk memeriksa token JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Token tidak ada, akses ditolak" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" }); // Token tidak valid
    }
    req.user = user; // Menyimpan data user ke dalam req.user
    next(); // Lanjutkan ke request selanjutnya
  });
};

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Endpoint untuk register admin
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const query =
      "INSERT INTO users (username, password, role) VALUES (?, ?, 'admin')";
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: "Error saving admin" });
      res.status(200).json({ message: "Admin registered successfully" });
    });
  });
});

// Endpoint untuk login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching user" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0]; // Ambil user pertama yang ditemukan
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "Login successful", token, role: user.role });
    });
  });
});

// Endpoint untuk mendapatkan daftar pengguna
app.get("/api/users", authenticateToken, (req, res) => {
  const query = "SELECT id, username, role FROM users";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.status(200).json(results); // Kirimkan hasil data pengguna
  });
});

// Dashboard user: total surat dari camat & belum ditindaklanjuti
app.get("/api/dashboard-user", authenticateToken, (req, res) => {
  const userId = req.user.id; // <-- pastikan middleware mengisi ini

  const sql = `
    SELECT
      /* total surat yang DIKIRIM CAMAT kepada user ini */
      SUM(CASE WHEN pengirim_role = 'camat' AND penerima_user_id = ? THEN 1 ELSE 0 END) AS total_dari_camat,
      /* surat milik user ini yang BELUM ditindaklanjuti */
      SUM(
        CASE 
          WHEN penerima_user_id = ? 
           AND (status_tindak_lanjut IS NULL OR status_tindak_lanjut <> 'Tindak Lanjut')
          THEN 1 ELSE 0 
        END
      ) AS belum_tindak_lanjut
    FROM surat_masuk;
  `;

  db.query(sql, [userId, userId], (err, rows) => {
    if (err) {
      console.error("Error /api/dashboard-user:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    const row = rows?.[0] ?? { total_dari_camat: 0, belum_tindak_lanjut: 0 };
    res.status(200).json(row);
  });
});

// Endpoint untuk menambah pengguna baru
app.post("/api/users", authenticateToken, (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Username, password, and role are required" });
  }

  if (!["admin", "camat", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const query =
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(query, [username, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ message: "Error saving user" });
      res.status(201).json({
        message: "User added successfully",
        id: result.insertId,
        username,
        role,
      });
    });
  });
});

// Endpoint untuk mengubah pengguna
app.put("/api/users/:userId", authenticateToken, (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;

  let updateQuery = "UPDATE users SET username = ? WHERE id = ?";
  let queryParams = [username, userId];

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ message: "Error hashing password" });
      updateQuery = "UPDATE users SET username = ?, password = ? WHERE id = ?";
      queryParams = [username, hashedPassword, userId];
      db.query(updateQuery, queryParams, (err, result) => {
        if (err)
          return res.status(500).json({ message: "Error updating user" });
        res.status(200).json({ message: "User updated successfully" });
      });
    });
  } else {
    db.query(updateQuery, queryParams, (err, result) => {
      if (err) return res.status(500).json({ message: "Error updating user" });
      res.status(200).json({ message: "User updated successfully" });
    });
  }
});

app.get("/api/surat", async (req, res) => {
  const userRole = req.user.role; // Role pengguna yang ada dalam token

  if (userRole === "Admin") {
    // Admin dapat melihat semua surat
    const surat = await Surat.find({});
    res.json(surat);
  } else if (userRole === "Camat") {
    // Camat hanya bisa melihat surat terkait dengan peran mereka
    const surat = await Surat.find({ role: "Camat" });
    if (surat.length === 0) {
      return res.status(404).send("No surat available for Camat.");
    }
    res.json(surat);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/api/dashboard-admin", authenticateToken, (req, res) => {
  const query = `
    SELECT
      COUNT(id) AS total_surat,
      COALESCE(SUM(CASE WHEN status IS NULL THEN 1 ELSE 0 END), 0) AS surat_masuk,
      COALESCE(SUM(CASE WHEN status = 'disposisi' THEN 1 ELSE 0 END), 0) AS surat_disposisi,
      COALESCE(SUM(CASE WHEN status_tindak_lanjut = 'Tindak Lanjut' THEN 1 ELSE 0 END), 0) AS surat_tindak_lanjut
    FROM surat_masuk;
  `;

  console.log("[/api/dashboard-admin] running query...");

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dashboard data:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    const row = results?.[0] ?? {
      total_surat: 0,
      surat_masuk: 0,
      surat_disposisi: 0,
      surat_tindak_lanjut: 0,
    };
    console.log("[/api/dashboard-admin] result:", row);
    return res.status(200).json(row);
  });
});

// Endpoint untuk menambah surat masuk
app.post(
  "/api/surat/masuk",
  authenticateToken,
  upload.single("file_surat"),
  (req, res) => {
    const {
      nomor_agenda, // Nomor agenda yang diinputkan dari form
      nomor_surat, // Nomor surat yang diinputkan dari form
      tanggal_masuk,
      pengirim_surat,
      tanggal_surat,
      isi_ringkasan,
      tujuan_surat,
    } = req.body;

    const penanggung_jawab = null; // Kolom penanggung_jawab di sini tetap NULL untuk saat pembuatan surat
    const file_surat = req.file ? req.file.filename : null; // Menyimpan nama file yang di-upload

    if (!file_surat)
      return res.status(400).json({ message: "File Surat tidak ditemukan" });

    // Pastikan nomor_agenda dan nomor_surat diolah dengan benar
    const query = `INSERT INTO surat_masuk (nomor_agenda, nomor_surat, tanggal_masuk, pengirim_surat, tanggal_surat, isi_ringkasan, penanggung_jawab, tujuan_surat, file_surat) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [
        nomor_agenda,
        nomor_surat, // Menyimpan nomor surat ke kolom nomor_surat
        tanggal_masuk,
        pengirim_surat,
        tanggal_surat,
        isi_ringkasan,
        penanggung_jawab, // Menyimpan NULL untuk penanggung_jawab
        tujuan_surat,
        file_surat,
      ],
      (err, result) => {
        if (err)
          return res.status(500).json({ message: "Failed to add surat masuk" });

        res.status(200).json({
          message: "Surat masuk berhasil ditambahkan!",
          surat: {
            nomor_agenda,
            nomor_surat, // Sertakan nomor_surat dalam response
            tanggal_masuk,
            pengirim_surat,
            tanggal_surat,
            isi_ringkasan,
            penanggung_jawab, // Menyertakan penanggung_jawab (null)
            tujuan_surat,
            file_surat,
          },
        });
      }
    );
  }
);

// Endpoint untuk menghapus pengguna
app.delete("/api/users/:id", authenticateToken, (req, res) => {
  const { id } = req.params; // ID pengguna yang akan dihapus

  // Query untuk menghapus pengguna berdasarkan ID
  const query = "DELETE FROM users WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Failed to delete user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respons jika pengguna berhasil dihapus
    res.status(200).json({ message: "User successfully deleted" });
  });
});

// Endpoint untuk mengambil daftar surat masuk
app.get("/api/surat/masuk", authenticateToken, (req, res) => {
  const userRole = req.user.role;
  const userId = req.user.id; // Mendapatkan ID user (Camat)

  let query = "";
  if (userRole === "admin") {
    query = "SELECT * FROM surat_masuk"; // Admin bisa melihat semua surat
  } else if (userRole === "camat") {
    // Camat hanya bisa melihat surat yang ditujukan kepadanya berdasarkan tujuan_surat
    query = "SELECT * FROM surat_masuk WHERE tujuan_surat = ?";
  } else {
    return res.status(403).json({ message: "Access denied" });
  }

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching surat masuk:", err);
      return res.status(500).json({ message: "Failed to fetch surat masuk" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Tidak ada surat masuk" });
    }

    res.status(200).json(results); // Kirimkan data surat masuk
  });
});

// Endpoint untuk mengambil surat masuk berdasarkan ID
app.get("/api/surat/masuk/:id", authenticateToken, (req, res) => {
  const { id } = req.params; // Mendapatkan ID surat dari URL

  const query = "SELECT * FROM surat_masuk WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching surat:", err);
      return res.status(500).json({ message: "Failed to fetch surat" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    res.status(200).json(results[0]); // Kirimkan data surat berdasarkan ID
  });
});

app.get("/api/surat/terusan/:userId", authenticateToken, (req, res) => {
  const { userId } = req.params;

  // Ambil surat yang disposisi ke userId tertentu
  const query = `
        SELECT * FROM surat_masuk
        WHERE petugas_id = ? AND status = 'disposisi'`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch surat disposisi" });
    }
    res.status(200).json(results);
  });
});

// Endpoint untuk mengambil surat yang sudah didisposisi atau belum
app.get("/api/surat/masuk-camat", authenticateToken, (req, res) => {
  const userId = req.user.id; // Ambil userId dari token yang sudah terautentikasi

  // Query untuk mengambil surat yang ditujukan kepada camat dengan status disposisi
  const query = `
        SELECT * FROM surat_masuk
        WHERE tujuan_surat = ? AND (status = 'disposisi' OR status IS NULL)`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching surat masuk:", err);
      return res.status(500).json({ message: "Failed to fetch surat masuk" });
    }

    res.status(200).json(results); // Mengirimkan hasil surat masuk untuk camat
  });
});

// Endpoint untuk memperbarui status tindak lanjut surat
app.put("/api/surat/tindak-lanjut/:id", authenticateToken, (req, res) => {
  const { id } = req.params; // ID surat yang akan diperbarui
  const { status_tindak_lanjut } = req.body; // Mengambil status tindak lanjut dari body

  // Validasi jika status tindak lanjut tidak diberikan
  if (!status_tindak_lanjut) {
    return res.status(400).json({ message: "Status tindak lanjut diperlukan" });
  }

  // Pastikan surat dengan ID ini ada
  const checkQuery = "SELECT * FROM surat_masuk WHERE id = ?";
  db.query(checkQuery, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    // Query untuk memperbarui status tindak lanjut surat
    const query = `
      UPDATE surat_masuk 
      SET status_tindak_lanjut = ? 
      WHERE id = ?
    `;
    db.query(query, [status_tindak_lanjut, id], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ message: "Failed to update surat status" });
      }

      // Response jika surat berhasil diperbarui
      res
        .status(200)
        .json({ message: "Status tindak lanjut surat berhasil diperbarui" });
    });
  });
});

app.put("/api/surat/disposisi/:id", authenticateToken, (req, res) => {
  const { id } = req.params; // ID surat yang akan didisposisi
  const { petugas_id, pesan, penanggung_jawab } = req.body; // Data yang diperlukan untuk disposisi

  // Pastikan role yang mengakses adalah camat
  const userRole = req.user.role;
  if (userRole !== "camat") {
    return res.status(403).json({ message: "Access denied" }); // Jika bukan camat
  }

  if (!petugas_id || !pesan || !penanggung_jawab) {
    return res.status(400).json({
      message: "Petugas, pesan, dan penanggung jawab harus disertakan",
    });
  }

  // Pastikan surat dengan ID ini ada dan statusnya belum disposisi
  const checkQuery = "SELECT * FROM surat_masuk WHERE id = ?";
  db.query(checkQuery, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    if (results[0].status === "disposisi") {
      return res
        .status(400)
        .json({ message: "Surat sudah didisposisikan sebelumnya" });
    }

    // Query untuk memperbarui status surat dan menambahkan petugas_id, pesan, dan penanggung_jawab
    const query = `
      UPDATE surat_masuk SET 
      status = 'disposisi', 
      petugas_id = ?, 
      pesan = ?, 
      penanggung_jawab = ? 
      WHERE id = ?`;

    db.query(
      query,
      [petugas_id, pesan, penanggung_jawab, id],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ message: "Failed to execute query." });
        }

        // Kembalikan response sukses jika query berhasil
        res.status(200).json({ message: "Surat berhasil didisposisikan." });
      }
    );
  });
});

app.get("/api/surat/camat", authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = `
      SELECT * FROM surat_masuk 
      WHERE tujuan_surat = ? AND (status = 'disposisi' OR status IS NULL)
    `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching surat camat:", err);
      return res.status(500).json({ message: "Failed to fetch surat camat" });
    }
    res.status(200).json(results);
  });
});

app.get("/api/surat/user", authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = `
      SELECT * FROM surat_masuk 
      WHERE petugas_id = ? AND status = 'disposisi'
    `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching surat user:", err);
      return res.status(500).json({ message: "Failed to fetch surat user" });
    }
    res.status(200).json(results);
  });
});

app.post("/disposisi/:id", (req, res) => {
  const suratId = req.params.id;

  // Mengupdate status disposisi menjadi true
  Surat.update({ status_disposisi: true }, { where: { id: suratId } })
    .then(() => {
      res.status(200).json({ message: "Surat berhasil didispoisi" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat memperbarui status disposisi" });
    });
});

// Endpoint untuk mengedit surat
app.put(
  "/api/surat/masuk/:id",
  authenticateToken,
  upload.single("file_surat"),
  (req, res) => {
    const { id } = req.params; // ID surat yang akan diedit
    console.log("ID Surat untuk update:", id); // Log ID untuk memeriksa apakah ID yang dikirim benar

    const updatedData = req.body; // Data yang dikirim dari front-end untuk diupdate
    console.log("Data yang dikirim untuk update:", updatedData); // Log data yang diterima oleh server

    const file_surat = req.file ? req.file.filename : updatedData.file_surat; // Cek jika ada file baru, kalau tidak pakai file lama

    // Query untuk mengupdate surat berdasarkan ID
    const query = `UPDATE surat_masuk SET 
    nomor_surat = ?, 
    tanggal_masuk = ?, 
    pengirim_surat = ?, 
    tanggal_surat = ?, 
    isi_ringkasan = ?, 
    penanggung_jawab = ?, 
    tujuan_surat = ?, 
    file_surat = ? 
  WHERE id = ?`;

    db.query(
      query,
      [
        updatedData.nomor_surat,
        updatedData.tanggal_masuk,
        updatedData.pengirim_surat,
        updatedData.tanggal_surat,
        updatedData.isi_ringkasan,
        updatedData.penanggung_jawab,
        updatedData.tujuan_surat,
        file_surat, // Jika ada file baru atau menggunakan file lama
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating surat:", err);
          return res.status(500).json({ message: "Failed to update surat" });
        }

        if (result.affectedRows === 0) {
          console.log("Surat dengan ID ini tidak ditemukan");
          return res.status(404).json({ message: "Surat not found" });
        }

        console.log("Surat berhasil diperbarui");
        res.status(200).json({ message: "Surat updated successfully" });
      }
    );
  }
);

// Endpoint untuk menghapus surat
app.delete("/api/surat/masuk/:id", authenticateToken, (req, res) => {
  const { id } = req.params; // ID surat yang akan dihapus

  const query = "DELETE FROM surat_masuk WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Failed to delete surat" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    res.status(200).json({ message: "Surat berhasil dihapus" });
  });
});

// Menyajikan file statis dari folder 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
