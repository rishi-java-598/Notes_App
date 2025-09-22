
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/api";
import styles from "../styles/form.module.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const data = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/notes");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#9ca3af" : "#4f46e5",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
