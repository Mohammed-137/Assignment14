import React from "react";

export default function CustomerList({ customers = [], onEdit, onDelete }) {
  return (
    <div className="space-y-3">
      {customers.map((c) => (
        <div
          key={c._id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-gray-600">
              {c.email} • {c.phone} • {c.company}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(c)}
              className="px-3 py-1 border rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(c._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
