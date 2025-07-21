import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("Please login to access cart");
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/api/cart/${user._id}`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Error fetching cart:", err));
  }, [user, navigate]);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const totalPrice = cart.reduce((sum, item) => {
    if (selected.includes(item._id)) {
      return sum + (item.productId.price * item.quantity);
    }
    return sum;
  }, 0);

  const handleBuyNow = () => {
    const selectedItems = cart.filter(item => selected.includes(item._id));

    if (selectedItems.length === 0) {
      alert("Please select at least one product to buy.");
      return;
    }
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    navigate("/buy-now");
  };

  const handleRemoveItem = async (itemId) => {
    const confirm = window.confirm("Are you sure you want to remove this item?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove item from UI
        setCart(prev => prev.filter(item => item._id !== itemId));
        setSelected(prev => prev.filter(id => id !== itemId));
        alert("Item removed from cart");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Remove error:", err);
      alert("Server error while removing item");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item._id} className="flex items-center gap-4 border-b pb-4">
                <input
                  type="checkbox"
                  checked={selected.includes(item._id)}
                  onChange={() => toggleSelect(item._id)}
                />
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{item.productId.name}</h4>
                  <p>₹ {item.productId.price}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>

                {/* 🗑️ Remove button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 cursor-pointer"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>


          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-semibold">Total: ₹ {totalPrice}</h3>
            <button
              onClick={handleBuyNow}
              className="mt-2 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 cursor-pointer"
            >
              Buy Now
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
