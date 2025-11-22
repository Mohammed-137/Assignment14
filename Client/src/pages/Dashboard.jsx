import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const create = async (data) => {
    try {
      const res = await api.post("/customers", data);
      setCustomers((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const update = async (data) => {
    try {
      const { name, email, phone, company, notes } = data;
      const res = await api.put(`/customers/${editing._id}`, {
        name,
        email,
        phone,
        company,
        notes,
      });
      setCustomers((prev) =>
        prev.map((c) => (c._id === res.data._id ? res.data : c))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await api.delete(`/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          Logged in as {user?.email}
        </div>
        <CustomerForm
          initial={editing ?? undefined}
          onSubmit={editing ? update : create}
          onCancel={cancelEdit}
          isEditing={!!editing}
        />
      </div>
      <CustomerList
        customers={customers}
        onEdit={(c) => setEditing(c)}
        onDelete={remove}
      />
    </div>
  );
}
