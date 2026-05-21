const jwt = require("jsonwebtoken");

// Middleware untuk memverifikasi token
const authenticateToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token not provided" }); // Jika token tidak ada
  }

  try {
    // Verifikasi token menggunakan kunci rahasia
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan informasi pengguna di request (decoded token)
    next(); // Lanjutkan ke handler berikutnya
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" }); // Token tidak valid atau kadaluarsa
  }
};

module.exports = authenticateToken;
