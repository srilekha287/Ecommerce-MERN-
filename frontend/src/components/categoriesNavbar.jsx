import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Shirt, Diamond, Car, Phone, Sofa, Menu, X } from "lucide-react";

function CategoriesNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow relative z-40">
      {/* Mobile toggle button */}
      <div className="flex justify-between items-center px-4 py-3 md:hidden">
        <span className="font-bold text-gray-700 text-lg">Categories</span>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Category links */}
      <ul
        className={`${
          open ? "block" : "hidden"
        } md:flex gap-8 px-6 py-3 text-sm font-medium text-gray-700 md:justify-start`}
      >
        <li className="flex items-center gap-1 hover:text-pink-700 cursor-pointer">
          <Diamond size={16} />
          <Link to="/category/Jewellery">Jewellery</Link>
        </li>

        <li className="flex items-center gap-1 hover:text-pink-700 cursor-pointer">
          <Shirt size={16} />
          <Link to="/category/Dresses">Dresses</Link>
        </li>

        <li className="flex items-center gap-1 hover:text-pink-700 cursor-pointer">
          <Car size={16} />
          <Link to="/category/Automobiles">Automobiles</Link>
        </li>

        <li className="flex items-center gap-1 hover:text-pink-700 cursor-pointer">
          <Phone size={16} />
          <Link to="/category/Electronics">Electronics</Link>
        </li>

        <li className="flex items-center gap-1 hover:text-pink-700 cursor-pointer">
          <Sofa size={16} />
          <Link to="/category/Furniture">Furniture</Link>
        </li>
      </ul>
    </div>
  );
}

export default CategoriesNavbar;
