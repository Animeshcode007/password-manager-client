import React from "react";

export default function CredentialList({
  credentials = [],
  onView,
  onDelete,
  loading = false,
}) {
  if (loading) {
    return <p>Loading credentials…</p>;
  }

  if (!loading && credentials.length === 0) {
    return <p className="text-gray-500">No credentials stored yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {credentials.map((cred) => (
        <li
          key={cred.id}
          className="flex justify-between items-center p-4 bg-white shadow rounded-xl"
        >
          <div>
            <h2 className="text-lg font-semibold">{cred.title}</h2>
            <p className="text-gray-500 text-sm">{cred.username}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onView(cred.id)}
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              View
            </button>
            <button
              onClick={() => onDelete(cred.id)}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
