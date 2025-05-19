import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login, setKey } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      setKey(form.password);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Centered container, fixed max-width */}
      <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-lg flex">
        
        {/* LEFT: FORM (50%) */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Hey, welcome back to your safest place</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT: ILLUSTRATION (50%) */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center p-6">
          <img
            src="/src/assets/login-illustration.webp"
            alt="Login illustration"
            className="max-w-full max-h-80"
          />
        </div>
      </div>
    </div>
  );
}
