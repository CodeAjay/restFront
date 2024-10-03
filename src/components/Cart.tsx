import React, { useState } from 'react';
import { useCart } from './CartContext';
import Modal from 'react-modal';
import CheckoutForm from './CheckoutForm';

Modal.setAppElement('#root'); // Add this line to prevent screen readers from reading the main content

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // For success message

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const item = cartItems.find(cartItem => cartItem._id === itemId);
    if (item && quantity > 0) {
      addToCart(item, quantity - item.quantity);
    }
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (message: string) => {
    // Show success message and clear cart
    setSuccessMessage(message);
    clearCart(); // Clear the cart after success
    setIsModalOpen(false);
  };

  return (
    <section id="cart" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Your Cart</h2>
        {successMessage && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {successMessage}
          </div>
        )}
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Quantity: 
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="w-16 text-center border rounded ml-2"
                  />
                </p>
                <p className="text-gray-800 font-bold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Checkout
            </button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Checkout Form"
              className="flex justify-center items-center"
              overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
            >
              <CheckoutForm onSubmit={handleFormSubmit} />
            </Modal>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </section>
  );
};

export default Cart;
