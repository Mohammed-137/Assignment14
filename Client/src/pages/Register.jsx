import React, { useState, useContext } from "react";
import api from "../api/api";
import { useNavigate,Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    try {
      const res = await api.post("/auth/register", form);

      // if no token, registration failed
      if (!res.data.token) {
        const msg = res.data?.message || res.data?.errors?.[0]?.msg || "Registration failed";
        setError(msg);
        return;
      }

      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      const data = err.response?.data;
      const msg = data?.message || data?.errors?.[0]?.msg || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-3">{error}</div>}
      <form onSubmit={submit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-2 border rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
     <div className="flex justify-between text-sm mt-2">
          <Link to="/auth/login" className="font-bold">
            Already have an account?
            <span className="text-green-700 hover:underline"> Login</span>
          </Link></div>
      </form>
    </div>
  );
}
