import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // make sure you created this
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Load users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        setError(error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle add/update
  const handleSubmit = async () => {
    const slug = form.name.toLowerCase().replace(/\s+/g, "-");
    const updatedUser = { ...form, slug };

    try {
      if (form.id) {
        // Update existing user
        const { error } = await supabase
          .from("users")
          .update(updatedUser)
          .eq("id", form.id);
        if (error) throw error;
        setUsers(users.map((u) => (u.id === form.id ? updatedUser : u)));
      } else {
        // Create new user
        const { data, error } = await supabase
          .from("users")
          .insert([updatedUser])
          .select();
        if (error) throw error;
        if (data) setUsers([...users, data[0]]);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
      setUsers(users.filter((u) => u.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Load user into form for editing
  const handleEdit = (user: User) => {
  setForm(user);
  // ✅ Scroll to top when editing
  window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (loading) return <div className="container">Loading users…</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Admin Portal</h1>
   <button
  onClick={async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  }}
>
  Logout
</button>
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
      {/* ✅ Only show the name */}
      <h2>{user.name}</h2>

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
