import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gray-100 flex items-center justify-center p-6">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate("/")}
          className="bg-pink-600 text-white px-4 mt-10 py-4 rounded hover:bg-pink-700 cursor-pointer"
        >
          Home
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md max-w-5xl w-full overflow-hidden md:flex">
        {/* Left - Image */}
        <div className="md:w-1/2">
          <img
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Text */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-pink-700 mb-4">About Our Company</h2>
          <p className="text-gray-700 mb-4">
            At <strong>Super Mart</strong>, we are passionate about delivering top-quality products at unbeatable prices. Whether you're shopping for fashion, electronics, or home essentials, we've got you covered.
          </p>
          <p className="text-gray-700 mb-4">
            Since our launch, we’ve committed ourselves to customer satisfaction, fast delivery, and reliable service. Our diverse collection of products ensures something for everyone. Join our growing community and experience seamless online shopping.
          </p>
          <p className="text-gray-700">
            Thank you for choosing <strong>Super Mart</strong>. We’re excited to serve you and grow together!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
