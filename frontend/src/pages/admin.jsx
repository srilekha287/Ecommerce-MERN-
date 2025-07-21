import React, { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    subCategory: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchProducts();
      setForm({ name: "", description: "", price: "", image: "", category: "", subCategory: "" });
      setEditingId(null);
      alert("Success!");
    } else {
      alert("Operation failed");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchProducts();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Products</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border p-2 rounded" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 rounded" />
        <input name="subCategory" placeholder="Sub-Category" value={form.subCategory} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
        <button onClick={handleSubmit} className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700 md:col-span-2">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Product List */}
      <h3 className="text-xl font-semibold mb-2">All Products</h3>
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-gray-600 text-sm">₹ {p.price}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
