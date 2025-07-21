import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = {
  Jewellery: ["Necklaces", "Earrings", "Rings"],
  Dresses: ["Party Wear", "Casual", "Ethnic"],
  Electronics: ["Mobiles", "Laptops", "Accessories"],
  Furniture: ["Sofas", "Tables"],
  Automobiles: ["Bike", "Car", "Scooty"],
};

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchProducts = async () => {
    let url = "http://localhost:5000/api/products";
    const params = [];
    if (selectedCategory) params.push(`category=${selectedCategory}`);
    if (selectedSubCategory) params.push(`subCategory=${selectedSubCategory}`);
    if (params.length) url += `?${params.join("&")}`;

    const res = await fetch(url);
    let data = await res.json();

    // Dummy average rating if not available in DB (you can update this part)
    // data = data.map((product) => ({
    //   ...product,
    //   avgRating: product.avgRating || Math.floor(Math.random() * 5) + 1, // fallback
    // }));

    // Sorting logic
    if (sortBy === "price-low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-high") {
      data.sort((a, b) => b.avgRating - a.avgRating);
    } else if (sortBy === "rating-low") {
      data.sort((a, b) => a.avgRating - b.avgRating);
    }

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubCategory, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSortBy("");
  };

  return (
    <div className="p-6">
      {/* Filter + Sort Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("");
          }}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Categories</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sub-category */}
        {selectedCategory && (
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="">All Sub-Categories</option>
            {categories[selectedCategory].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>

        {/* Reset */}
        {(selectedCategory || selectedSubCategory || sortBy) && (
          <button
            onClick={resetFilters}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-2 rounded shadow">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded mb-2 hover:opacity-90"
              />
              <h3 className="text-lg font-semibold hover:underline">
                {product.name}
              </h3>
            </Link>
            <p className="text-pink-700 font-bold mt-1">₹ {product.price}</p>
            <p className="text-yellow-500 text-sm">
              {"⭐".repeat(product.avgRating)} ({product.avgRating})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
