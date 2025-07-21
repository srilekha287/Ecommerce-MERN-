import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [refresh, setRefresh] = useState(false);

  // Add debug log for localStorage user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("localStorage user on mount:", storedUser);
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);

    fetch(`http://localhost:5000/api/reviews/${id}`)
      .then((res) => res.json())
      .then(setReviews);
  }, [id, refresh]);

  const handleReviewSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        reviewer: user.name,
        rating,
        comment,
      }),
    });

    if (res.ok) {
      setComment("");
      setRating(0);
      setRefresh(!refresh);
    } else {
      alert("Failed to submit review");
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  if (!product) return <div className="p-6">Loading...</div>;

  const handleAddToCart = async () => {
    if (!user || !product || !product._id) {
      alert("Missing user or product data.");
      return;
    }

    console.log(user._id, product._id);

    const payload = {
      userId: user._id,
      productId: product._id,
      quantity: 1,
    };

    console.log("Sending to backend:", payload);

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to add to cart");
      } else {
        alert("Added to cart");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error while adding to cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user || !product) {
      alert("Please log in to buy.");
      return;
    }

    const orderData = [
    {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    },
  ];
   
    localStorage.setItem("selectedItems", JSON.stringify(orderData));
    window.location.href = "/buy-now";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow rounded">
      {/* Image at top */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[450px] object-cover rounded mb-6"
      />

      {/* Details in 2-column */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-pink-700 font-semibold mb-2">
            ₹ {product.price}
          </p>
          <p className="text-gray-700">{product.description}</p>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            {product.subCategory && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Sub-Category:</span> {product.subCategory}
              </p>
            )}
          </div>
          <div className="flex gap-6">
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 w-fit cursor-pointer"
            >
              Add to Cart
            </button>
            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 w-fit cursor-pointer"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* Rating + Reviews in 2-column below */}
      <div className="mt-10 flex flex-col md:flex-row gap-10">
        {/* Left: Rate & submit */}
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold mb-3">Rate this Product</h3>
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer px-2 py-1 border rounded ${star <= rating
                    ? "text-pink-500 bg-pink-100 border-pink-500"
                    : "text-gray-400 bg-white border-pink-500"
                  }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <input
            type="text"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-3"
          />

          <button
            onClick={handleReviewSubmit}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 cursor-pointer"
          >
            Submit Review
          </button>
        </div>

        {/* Right: Display reviews */}
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold mb-3">
            Reviews (Avg: ⭐ {averageRating})
          </h3>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((r, index) => (
              <div key={index} className="border-b py-3">
                <p className="font-semibold">{r.reviewer}</p>
                <p className="text-pink-500 mb-1">{"\u2b50".repeat(r.rating)}</p>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
