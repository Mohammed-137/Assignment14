import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from "./App";
import "./index.css";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Dev helper: wrap fetch to log outgoing requests (helps catch non-axios requests)
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    try {
      const method = (init && init.method) || (typeof input === 'string' && input.startsWith('http') ? 'GET' : 'GET');
      console.log('[FETCH OUTGOING]', method, input, init && init.headers, init && init.body);
    } catch (e) {}
    return originalFetch(input, init);
  };
}

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Protected Route Wrapper
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Routes inside App */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Catch invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);
