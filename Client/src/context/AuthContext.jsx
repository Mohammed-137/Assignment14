import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      // If parsing fails, remove the corrupted item
      localStorage.removeItem("user");
      return null;
    }
  });

  useEffect(() => {
    // If there's a token in storage when the app loads, attach it to axios
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (process.env.NODE_ENV !== 'production') console.log('[AUTH] attached token on load');
    }
  }, []);

  const login = (token, userObj) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    // attach token to axios default headers so subsequent requests include it
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (process.env.NODE_ENV !== 'production') console.log('[AUTH] login set token');
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // remove Authorization header
    try {
      delete api.defaults.headers.common.Authorization;
      if (process.env.NODE_ENV !== 'production') console.log('[AUTH] removed token on logout');
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};
