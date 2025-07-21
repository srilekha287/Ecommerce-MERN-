import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => alert("Failed to load category products"));
  }, [categoryName]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Products in {categoryName}</h2>
      {products.length === 0 && (
        <p className="text-gray-500">No products found in this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
