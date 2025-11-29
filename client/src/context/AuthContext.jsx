// LearnSphere/client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Stores user info (can extend)
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    // Optional: decode token to get user info or call backend to fetch user profile here
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  // Login function stores token and user info
  const login = (token, userInfo = null) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  // Logout function clears token and user info
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
