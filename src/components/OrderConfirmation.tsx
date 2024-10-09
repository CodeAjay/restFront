import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

interface OrderConfirmationProps {
  success: boolean;
  orderId: string;
  message: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ success, orderId, message }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleViewOrderClick = () => {
    navigate('/dashboard'); // Navigate to the dashboard where the user can see their order
  };

  return (
    <div className={`p-8 rounded-lg shadow-2xl ${success ? 'bg-green-600' : 'bg-red-600'} text-white`}>
      <h2 className="text-4xl font-bold mb-4">{success ? 'Order Placed Successfully!' : 'Order Failed'}</h2>
      <p className="mb-4">{message}</p>

      <div className="mb-6">
        <strong>Order ID:</strong> {orderId}
      </div>

      <button
        onClick={handleViewOrderClick}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        See Your Order in Dashboard
      </button>
    </div>
  );
};

export default OrderConfirmation;
