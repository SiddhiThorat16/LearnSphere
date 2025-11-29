// LearnSphere/client/src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // Store JWT securely
        login(data.token); // Update auth context state
        navigate("/courses"); // Redirect to courses page
      } else {
        setError(data.message || "Login failed.");
      }
    } catch {
      setError("Network error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-indigo-400 to-purple-500 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-opacity-95">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-indigo-100 text-sm">Login to access your learning journey</p>
          </div>

          {/* Form Section */}
          <form className="px-8 py-8" onSubmit={handleSubmit}>
            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold text-sm mb-2">Email Address</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="mb-7">
              <label className="block text-gray-700 font-semibold text-sm mb-2">Password</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=""
              />
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              type="submit"
            >
              Login
            </button>

            {/* Signup Link */}
            <p className="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600 font-semibold hover:text-purple-600 transition duration-200">
                Sign up here
              </a>
            </p>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white text-xs mt-6 opacity-75">
          LearnSphere  2025 | Secure Platform for Online Learning
        </p>
      </div>
    </div>
  );
}
