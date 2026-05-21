import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ganti useHistory dengan useNavigate

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Menampilkan error jika register gagal
  const navigate = useNavigate(); // Menggunakan useNavigate untuk redirect

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Kirim request untuk register admin ke backend
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });

      // Jika berhasil, tampilkan pesan dan redirect ke halaman login
      alert(response.data.message);
      navigate("/"); // Redirect ke halaman login setelah register berhasil
    } catch (err) {
      // Tangani jika ada error saat register
      setError("Error registering admin");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register Admin</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>} {/* Menampilkan pesan error */}
    </div>
  );
};

export default Register;
