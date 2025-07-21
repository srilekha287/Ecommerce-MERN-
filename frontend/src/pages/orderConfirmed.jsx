import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // or use any icon of your choice

function OrderConfirmed() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      {/* ✅ Tick Icon */}
      <CheckCircle size={80} className="text-green-500 mb-4" />

      <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>

      <button
        onClick={handleGoHome}
        className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white px-6 py-3 rounded shadow"
      >
        Back to Home
      </button>
    </div>
  );
}

export default OrderConfirmed;
