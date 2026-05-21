const crypto = require("crypto");

// Menghasilkan secret key acak dengan panjang 64 byte
const secret = crypto.randomBytes(64).toString("hex");

console.log(secret); // Menampilkan secret key di console
