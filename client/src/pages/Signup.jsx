// LearnSphere/client/src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2 seconds delay before redirect
      } else {
        // Handle duplicate email error from backend
        if (data.error && data.error.includes("E11000 duplicate key")) {
          setError("This email is already registered. Please login or use another email.");
        } else {
          setError(data.error || "Signup failed.");
        }
      }
    } catch {
      setError("Network error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-400 to-indigo-600 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-opacity-95">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Join LearnSphere</h2>
            <p className="text-purple-100 text-sm">Start your learning adventure today</p>
          </div>

          {/* Form Section */}
          <form className="px-8 py-8" onSubmit={handleSubmit}>
            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-5 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
                <p className="text-green-700 text-sm font-medium">{success}</p>
              </div>
            )}

            {/* Name Input */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">Full Name</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold text-sm mb-2">Email Address</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="mb-7">
              <label className="block text-gray-700 font-semibold text-sm mb-2">Password</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=""
              />
            </div>

            {/* Sign Up Button */}
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              type="submit"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 font-semibold hover:text-indigo-600 transition duration-200">
                Login here
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
