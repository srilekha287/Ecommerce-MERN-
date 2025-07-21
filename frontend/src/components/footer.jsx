import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-pink-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>

        {/* Right - Social */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="hover:text-blue-300" size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="hover:text-pink-300" size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="hover:text-blue-300" size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="hover:text-blue-300" size={20} />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <p className="text-center text-xs text-gray-300 mt-4">
        &copy; {new Date().getFullYear()} Super Mart. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
