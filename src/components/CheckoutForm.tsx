import axios from 'axios';
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom'; // For navigation

const CheckoutForm: React.FC<{ onSubmit: (message: string) => void }> = ({ onSubmit }) => {
  const { cartItems } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://rest-front.vercel.app/api/orders',
        {
          items: cartItems.map(item => ({ menuItem: item._id, quantity: item.quantity })),
          name,
          address,
          email,
        },
        {
          headers: {
            'x-auth-token': token, // Send the token in the headers
          },
        }
      );

      // Check response status
      if (response.status === 200 || response.status === 201) {
        console.log('Order placed successfully');
        
        // Send success message back to Cart component
        onSubmit('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while placing the order');
      navigate('/cart'); // Redirect to cart page if the order fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-2xl text-white">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8">Checkout</h2>
      
      {/* Name Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
          placeholder="Enter your name"
          required
        />
      </div>
      
      {/* Address Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
          placeholder="Enter your address"
          required
        />
      </div>
      
      {/* Email Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
