import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BuyNow() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: '',
    });

    useEffect(() => {
        if (!user) {
            alert("Please login to continue");
            navigate('/login');
            return;
        }

        let items = [];
        try {
            const parsed = JSON.parse(localStorage.getItem("selectedItems"));
            if (Array.isArray(parsed)) {
                items = parsed.map((item) => {
                    // Case 1: From cart.jsx (nested productId)
                    if (item.productId && typeof item.productId === "object") {
                        return {
                            _id: item.productId._id,
                            name: item.productId.name,
                            price: item.productId.price,
                            image: item.productId.image,
                            quantity: item.quantity || 1,
                        };
                    }
                    // Case 2: From productDetails.jsx (direct product object)
                    return {
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity || 1,
                    };
                });
            }
        } catch {
            items = [];
        }

        if (items.length === 0) {
            alert("No items selected");
            navigate("/cart");
            return;
        }

        setSelectedItems(items);
    }, []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const total = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        if (!form.name || !form.phone || !form.address || !form.pincode) {
            alert("Please fill all shipping fields");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    items: selectedItems.map(item => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    shippingAddress: form,
                    totalAmount: total,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.removeItem('selectedItems');
                navigate('/order-confirmed');
            } else {
                alert(data.message || 'Order failed');
            }
        } catch (err) {
            console.error(err);
            alert('Order error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Buy Now</h2>

            {/* Shipping Address Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2 rounded" />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 rounded col-span-1 md:col-span-2" />
                <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="border p-2 rounded" />
            </div>

            {/* Product Summary */}
            <h3 className="text-xl font-semibold mb-2">Selected Products</h3>
            {selectedItems.map((item, i) => (
                <div key={i} className="flex gap-4 border-b py-2 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm">Price: ₹{item.price}</p>
                        <label className="text-sm mt-1 block">
                            Quantity:{" "}
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                    const qty = parseInt(e.target.value) || 1;
                                    const updated = [...selectedItems];
                                    updated[i].quantity = qty;
                                    setSelectedItems(updated);
                                }}
                                className="w-16 border rounded px-2 py-1 ml-2"
                            />
                        </label>
                    </div>
                </div>
            ))}

            <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold">Total: ₹{total}</p>
                <button onClick={handlePlaceOrder} className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 cursor-pointer">Place Order</button>
            </div>
        </div>
    );
}

export default BuyNow;
