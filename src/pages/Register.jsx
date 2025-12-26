import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

import authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authApi.register(form);
      setSuccess("Registered successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-100 via-white to-cyan-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2
          bg-white/80 dark:bg-slate-900/80 backdrop-blur
          border border-slate-200/60 dark:border-slate-800
          rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Left: Image / Branding */}
        <div
          className="hidden md:flex flex-col justify-center items-center
          bg-gradient-to-br from-indigo-600 to-cyan-600 text-white p-8"
        >
          <img
            src="https://images.unsplash.com/photo-1765734208128-b3c05bc25204?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
            alt="Register Illustration"
            className="w-64 rounded-2xl mb-6"
          />
          <h2 className="text-2xl font-bold mb-2">Join Us 🚀</h2>
          <p className="text-sm text-indigo-100 text-center">
            Create your account and start managing estimates smarter.
          </p>
        </div>

        {/* Right: Form */}
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            It only takes a minute
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-emerald-600 dark:text-emerald-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs mb-1 text-slate-500">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2 rounded-full text-sm
                    bg-white dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    focus:ring-2 focus:ring-indigo-500 outline-none
                    text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs mb-1 text-slate-500">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-full text-sm
                    bg-white dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    focus:ring-2 focus:ring-indigo-500 outline-none
                    text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs mb-1 text-slate-500">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-full text-sm
                    bg-white dark:bg-slate-800
                    border border-slate-300 dark:border-slate-700
                    focus:ring-2 focus:ring-indigo-500 outline-none
                    text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full text-sm font-semibold text-white
                bg-indigo-600 hover:bg-indigo-700 shadow
                disabled:opacity-60"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-5 text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
