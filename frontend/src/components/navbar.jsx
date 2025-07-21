import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import logo from "../assets/images/logo.webp";
import defaultUserIcon from "../assets/images/user.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-pink-800 text-white px-4 py-2 shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl md:text-2xl font-bold font-serif">Super Mart</span>
        </div>

        {/* Desktop Search (hidden on mobile) */}
        <div className="hidden md:flex relative flex-grow mx-6 max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" className="flex items-center gap-1 hover:text-gray-300">
            <ShoppingCart size={20} />
            <span>Cart</span>
          </Link>

          <Link to="/my-orders" className="hover:text-gray-200">My Orders</Link>

          {!user ? (
            <Link to="/login">
              <button className="bg-pink-400 px-4 py-2 rounded hover:bg-pink-500 cursor-pointer">
                Login
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <img src={defaultUserIcon} alt="User" className="h-8 w-8 rounded-full" />
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-pink-800 px-3 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Button (Mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-pink-700 px-4 py-3 space-y-3 text-sm">
          <div className="relative mb-2">
            <span className="absolute left-3 top-2 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-md bg-white text-black w-full"
            />
          </div>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-white">
            🛒 Cart
          </Link>

          <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="block text-white">
            📦 My Orders
          </Link>

          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-white">
              🔐 Login
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img src={defaultUserIcon} alt="User" className="h-6 w-6 rounded-full" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mt-2 bg-white text-pink-700 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
