// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Switch from "./Switch";
import { decryptData } from "../utils/crypto";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

import Card from "./Card";
import PasswordGenerator from "./PasswordGenerator";
import CredentialForm from "./CredentialForm";
import CredentialList from "./CredentialList";

export default function Dashboard() {
  const { token, logout, masterKey } = useAuth();
  const { dark, toggle } = useTheme();

  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Fetch all metadata
  const fetchCreds = async () => {
    setLoading(true);
    try {
      const res = await API.get("/credentials");
      setCredentials(res.data);
    } catch (err) {
      console.error("Fetch credentials error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCreds();
  }, [token]);

  // Decrypt & show
  const handleView = async (id) => {
    try {
      const res = await API.get(`/credentials/${id}`);
      const decrypted = decryptData(res.data.data_blob, masterKey);
      const { password } = JSON.parse(decrypted);
      alert(`🔑 Your password: ${password}`);
    } catch (err) {
      console.error("View error:", err.response || err);
      alert("Failed to load this credential. See console for details.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this credential?")) return;
    try {
      await API.delete(`/credentials/${id}`);
      fetchCreds();
    } catch (err) {
      console.error("Delete failed:", err.response || err);
      alert("Could not delete. See console for details.");
    }
  };

  // After saving a new credential
  const handleSaved = () => {
    setGeneratedPassword("");
    fetchCreds();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-custom">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Vault
        </h1>
        <div className="flex gap-4">
          <Switch checked={dark} onChange={toggle} />
          <button
            onClick={logout}
            className="text-red-500 hover:underline dark:text-red-400 text-md"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Generator + Form Panels */}
        <Card>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Generate Password
              </h2>
              <PasswordGenerator onGenerate={setGeneratedPassword} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Add New Credential
              </h2>
              <CredentialForm
                onSaved={handleSaved}
                initialPassword={generatedPassword}
              />
            </div>
          </div>
        </Card>

        {/* Credential List */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Your Credentials
          </h2>
          <CredentialList
            credentials={credentials}
            loading={loading}
            onView={handleView}
            onDelete={handleDelete}
          />
        </Card>
      </main>
    </div>
  );
}
