import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

interface User {
  id?: number;
  name: string;
  slug?: string;
  title: string;
  email: string;
  phone: string;
  profileImage?: string;
  linkedinURL?: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    name: "",
    title: "",
    email: "",
    phone: "",
    profileImage: "",
    linkedinURL: ""
  });

  const navigate = useNavigate();

  // Load users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle add/update
  const handleSubmit = () => {
    const slug = form.name.toLowerCase().replace(/\s+/g, "-");
    const updatedUser = { ...form, slug };

    if (form.id) {
      // Update existing user
      fetch(`http://localhost:3000/users/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      }).then(() => {
        resetForm();
        window.location.reload();
      });
    } else {
      // Create new user
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      }).then(() => {
        resetForm();
        window.location.reload();
      });
    }
  };

  // Handle delete
  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  };

  // Load user into form for editing
  const handleEdit = (user: User) => {
    setForm(user);
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      title: "",
      email: "",
      phone: "",
      profileImage: "",
      linkedinURL: ""
    });
  };

  return (
    <div className="container">
      <h1>Admin Portal</h1>

      {/* Form */}
      <div className="form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="profileImage"
          placeholder="Profile Image URL"
          value={form.profileImage}
          onChange={handleChange}
        />
        <input
          name="linkedinURL"
          placeholder="LinkedIn URL"
          value={form.linkedinURL}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {form.id ? "Update User" : "Add User"}
        </button>

        {form.id && (
          <button onClick={resetForm} style={{ marginLeft: "10px" }}>
            Cancel Edit
          </button>
        )}
      </div>

      {/* User list */}
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p>{user.title}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button onClick={() => navigate(`/${user.slug}`)}>
                View Profile
              </button>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id!)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
