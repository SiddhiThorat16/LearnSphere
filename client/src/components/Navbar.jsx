// LearnSphere/client/src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // Clear auth state and localStorage token
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <span className="font-bold text-xl tracking-wide">LearnSphere</span>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-200 transition">Home</Link></li>
        <li><Link to="/courses" className="hover:text-gray-200 transition">Courses</Link></li>

        {!isAuthenticated && (
          <>
            <li><Link to="/login" className="hover:text-gray-200 transition">Login</Link></li>
            <li>
              <Link
                to="/signup"
                className="hover:bg-white hover:text-indigo-600 border border-white rounded px-3 py-1 transition"
              >
                Signup
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <li>
            <button
              onClick={handleLogout}
              className="hover:bg-white hover:text-indigo-600 border border-white rounded px-3 py-1 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
