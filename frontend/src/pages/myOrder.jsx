import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("Please login to view your orders");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/api/orders/${user._id}`)
      .then(res => res.json())
      .then(setOrders)
      .catch(err => {
        console.error("Error fetching orders:", err);
        alert("Failed to load orders");
      });
  }, [user, navigate]);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Order cancelled successfully");
        setOrders(prev => prev.filter(o => o._id !== orderId));
      } else {
        alert(data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} className="border rounded p-4 mb-4 shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order #{index + 1}</h3>
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white px-6 py-3 rounded shadow"
              >
                Cancel Order
              </button>
            </div>

            <p className="text-sm text-gray-600">Total: ₹{order.totalAmount}</p>
            <p className="text-sm text-gray-600 mb-2">
              Shipping: {order.shippingAddress.address}, {order.shippingAddress.pincode}
            </p>

            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 items-center border-t pt-2 mt-2">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="font-semibold">{item.productId?.name}</p>
                  <p>Price: ₹{item.productId?.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
