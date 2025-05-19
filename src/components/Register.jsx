import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import axios from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-lg flex">
        
        {/* LEFT: FORM */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <p className="text-gray-600 mb-8">Join us and secure your credentials</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                required
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
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
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT: ILLUSTRATION */}
        <div className="w-1/2 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center p-6">
          <img
            src="/src/assets/register-illustration.png"
            alt="Register illustration"
            className="max-w-full max-h-80"
          />
        </div>
      </div>
    </div>
  );
}
