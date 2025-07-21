import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists
    const adminToken = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!adminToken);

    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    alert("Logged out");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Top Right Buttons */}
      <div className="flex justify-end items-center mb-6 gap-4">
        {isAdminLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/admin/products")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
            >
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/admin/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Admin Login
          </button>
        )}
      </div>

      {/* Dashboard Stats */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-700">Admin Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(stats).map(([label, value]) => (
            <div
              key={label}
              className="bg-pink-100 text-pink-900 rounded-lg shadow-md p-5 text-center border border-pink-300"
            >
              <p className="text-md uppercase font-semibold mb-1">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
