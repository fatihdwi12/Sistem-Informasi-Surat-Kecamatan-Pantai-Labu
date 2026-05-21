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
    } else {
      setLoading(false);
    }
  }, []);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRole("user");
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();

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
        },
      )
      .then((response) => {
        setUsers([...users, response.data]);
        setIsAddUserModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("There was an error adding the user. Please try again.");
      });
  };

  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("admin-token");

    const isConfirmed = window.confirm(
      `Are you sure you want to change this user's role to ${newRole}?`,
    );

    if (!isConfirmed) return;

    axios
      .put(
        `http://localhost:5000/api/users/${userId}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user,
          ),
        );
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        alert("There was an error updating the user's role.");
      });
  };

  const handleDelete = (userId) => {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      alert("You are not authorized to perform this action.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?",
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

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUsername(user.username);
    setPassword("");
    setRole(user.role);
    setIsModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

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
            user.id === selectedUser.id ? { ...user, username, role } : user,
          ),
        );
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("There was an error updating the user's data.");
      });
  };

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.contentArea}>
        <section className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.kicker}>User Management</span>
              <h2>Kelola Pengguna</h2>
              <p>
                Tambah, edit, ubah role, dan hapus pengguna dengan tampilan yang
                lebih rapi.
              </p>
            </div>

            <button
              className={styles.addUserBtn}
              onClick={() => setIsAddUserModalOpen(true)}>
              + Tambah Pengguna
            </button>
          </div>

          {loading ? (
            <div className={styles.stateBox}>Loading data pengguna...</div>
          ) : (
            <div className={styles.tableWrap}>
              {users.length === 0 ? (
                <div className={styles.stateBox}>Belum ada data pengguna.</div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className={styles.userCell}>
                            <span className={styles.avatar}>
                              {user.username?.charAt(0).toUpperCase()}
                            </span>
                            <span>{user.username}</span>
                          </div>
                        </td>
                        <td>
                          <select
                            className={styles.roleSelect}
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
                          <div className={styles.actions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => handleEditClick(user)}>
                              Edit
                            </button>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDelete(user.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </section>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Edit Pengguna</h3>
              <p>Ubah data pengguna yang dipilih.</p>

              <form onSubmit={handleEditSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Kosongkan jika tidak diubah"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="camat">Camat</option>
                  </select>
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setIsModalOpen(false)}>
                    Batal
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isAddUserModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Tambah Pengguna</h3>
              <p>Tambahkan pengguna baru ke sistem.</p>

              <form onSubmit={handleAddUserSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="camat">Camat</option>
                  </select>
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setIsAddUserModalOpen(false)}>
                    Batal
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Tambah User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KelolaPengguna;
