import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./Sidebar";
import styles from "./KelolaPengguna.module.css";

const KelolaPengguna = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // Fungsi untuk menambah pengguna baru
  const handleAddUserSubmit = () => {
    if (!username || !password || !role) {
      alert("All fields are required!");
      return;
    }

    const token = localStorage.getItem("admin-token");

    if (!token) {
      alert("Token is missing! Please log in again.");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/users",
        { username, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUsers([...users, response.data]);
        setIsAddUserModalOpen(false);
        setUsername("");
        setPassword("");
        setRole("user");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("There was an error adding the user. Please try again.");
      });
  };

  // Handle fetching users
  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    if (token) {
      axios
        .get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoading(false);
        });
    }
  }, []);

  // Fungsi untuk mengubah role pengguna
  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("admin-token");

    const isConfirmed = window.confirm(
      `Are you sure you want to change this user's role to ${newRole}?`
    );

    if (!isConfirmed) return; // Tidak lanjutkan jika tidak dikonfirmasi

    axios
      .put(
        `http://localhost:5000/api/users/${userId}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        alert("There was an error updating the user's role.");
      });
  };

  // Fungsi untuk menghapus pengguna
  const handleDelete = (userId) => {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      alert("You are not authorized to perform this action.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;

    axios
      .delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("There was an error deleting the user.");
      });
  };

  // Fungsi untuk edit pengguna
  const handleEditClick = (user) => {
    setSelectedUser(user); // Set selected user for editing
    setUsername(user.username);
    setPassword(""); // Reset password field
    setRole(user.role); // Set the role for the selected user
    setIsModalOpen(true); // Open modal for editing
  };

  // Fungsi untuk submit edit
  const handleEditSubmit = () => {
    const token = localStorage.getItem("admin-token");

    const dataToSubmit = password
      ? { username, password, role }
      : { username, role };

    axios
      .put(`http://localhost:5000/api/users/${selectedUser.id}`, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, username, password, role }
              : user
          )
        );
        setIsModalOpen(false); // Close modal after edit
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("There was an error updating the user's data.");
      });
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.tableContainer}>
        <h2 className={styles.title}>Kelola Pengguna</h2>

        <button
          className={styles.addUserBtn}
          onClick={() => setIsAddUserModalOpen(true)}>
          Tambah Pengguna
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="camat">Camat</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.edit}
                      onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edit Pengguna */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Pengguna</h3>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="camat">Camat</option>
            </select>
            <br />
            <button onClick={handleEditSubmit}>Submit</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal Tambah Pengguna */}
      {isAddUserModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Tambah Pengguna</h3>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="camat">Camat</option>
            </select>

            <br />
            <button onClick={handleAddUserSubmit}>Add User</button>
            <button onClick={() => setIsAddUserModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaPengguna;
