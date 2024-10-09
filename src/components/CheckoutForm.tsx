import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import OrderConfirmation from './OrderConfirmation';

const CheckoutForm: React.FC<{ onSubmit: (message: string) => void }> = ({ onSubmit }) => {
  const { cartItems } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState<boolean | null>(null);  // true for success, false for failure
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(newTotal);
    };

    calculateTotal();
  }, [cartItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderData = {
        items: cartItems.map(item => ({ menuItem: item._id, quantity: item.quantity })),
        name,
        address,
        email,
        paymentMethod, 
        totalAmount: total,
      };

      const response = await axios.post(
        'https://rest-back-bice.vercel.app/api/orders',
        orderData,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log('Order placed successfully');
        onSubmit('Order placed successfully!');
        if (response.status === 200 || response.status === 201) {
          setOrderPlaced(true);
          setOrderStatus(true);
          setOrderId(response.data.orderId);  // Assuming orderId is returned in the response
          setMessage('Your order has been placed successfully!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setOrderPlaced(true);
      setOrderStatus(false);
      setMessage('An error occurred while placing the order. Please try again later.');
    }
  };

  return (
    <>
    {orderPlaced ? (
        <OrderConfirmation
          success={orderStatus!}  // Should be a boolean value
          orderId={orderId}
          message={message}
        />
      ) :
    (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-2xl text-white max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Checkout</h2>
      
      {/* Name Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
          placeholder="Enter your full name"
          required
        />
      </div>
      
      {/* Address Input */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="address">
          Shipping Address
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
          Email Address
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

      {/* Total Order Value */}
      <div className="mb-6 flex justify-between items-center">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="total">
          Total Order Value
        </label>
        <span className="text-xl font-bold text-yellow-500">{`$${total.toFixed(2)}`}</span>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-400 mb-2" htmlFor="payment-method">
          Payment Method
        </label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
          required
        >
          <option value="cash">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        {paymentMethod=="cash"?"Place Order":"Make Payment"}
      </button>
    </form>
    )}
    </>
  );
};

export default CheckoutForm;
