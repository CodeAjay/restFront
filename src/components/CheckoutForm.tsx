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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-[10%]">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
