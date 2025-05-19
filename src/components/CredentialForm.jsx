// src/components/CredentialForm.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { encryptData } from "../utils/crypto";
import { useAuth } from "../contexts/AuthContext";

export default function CredentialForm({ onSaved, initialPassword = "" }) {
  const { masterKey } = useAuth();
  const [form, setForm] = useState({
    title: "",
    username: "",
    password: "",
    category: "",
  });
  const [copied, setCopied] = useState(false);
  // whenever initialPassword changes, update the password field
  useEffect(() => {
    setForm((f) => ({ ...f, password: initialPassword }));
  }, [initialPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopy = () => {
    if (!form.password) return;
    navigator.clipboard.writeText(form.password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encrypted = encryptData(
      JSON.stringify({ password: form.password }),
      masterKey
    );

    await API.post("/credentials", {
      title: form.title,
      username: form.username,
      category: form.category,
      data_blob: encrypted,
    });

    // reset form (except password generator stays)
    setForm({ title: "", username: "", password: "", category: "" });
    onSaved();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Add New Credential</h2>
      <input
        name="title"
        placeholder="Site Name"
        value={form.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <div className="relative">
        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg pr-20" // extra right padding
        />
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <input
        name="category"
        placeholder="Category (e.g. Social, Banking)"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
}
