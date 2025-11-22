import React, { useState, useEffect } from "react";

const emptyCustomer = {
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
};

export default function CustomerForm({
  initial,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) {
  const [form, setForm] = useState(initial || emptyCustomer);

  useEffect(() => {
    setForm(initial || emptyCustomer);
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : isEditing ? "Update" : "Create"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
