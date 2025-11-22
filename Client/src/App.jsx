import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between">
        <div className="font-bold text-lg">
          <Link to="/dashboard">Yasar-CRM</Link>
        </div>

        <div className="space-x-4">
          {user ? (
            <>
              <span className="mr-4">Hi, {user.name}</span>

              <Link to="/dashboard" className="text-blue-600">
                Dashboard
              </Link>

              <Link to="/customers" className="text-blue-600">
                Customers
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main content from nested routes */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
