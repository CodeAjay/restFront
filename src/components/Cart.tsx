import React, { useState } from 'react';
import { useCart } from './CartContext';
import Modal from 'react-modal';
import CheckoutForm from './CheckoutForm';

Modal.setAppElement('#root'); // Prevent screen readers from reading the main content

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate total price of cart items
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const item = cartItems.find(cartItem => cartItem._id === itemId);
    if (item && quantity > 0) {
      addToCart(item, quantity - item.quantity);
    }
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleApplyCoupon = () => {
    // Dummy coupon logic for demonstration purposes
    if (couponCode === 'DISCOUNT10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const handleFormSubmit = (message: string) => {
    // Show success message and clear cart
    setSuccessMessage(message);
    clearCart(); // Clear the cart after success
    // setIsModalOpen(false);
  };

  return (
    <section id="cart" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Cart Items Section (60% width) */}
        <div className="w-full md:w-3/5 pr-6">
          <h2 className="text-5xl font-bold text-yellow-400 mb-8">Your Cart</h2>
          {successMessage && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-8 shadow-lg">
              {successMessage}
            </div>
          )}
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center bg-gray-800 p-6 rounded-lg shadow-xl mb-4">
                  {/* Item Image */}
                  <div className="w-24 h-24 mr-6">
                    <img
                      src={item.imageUrl} // Assuming `item.imageUrl` holds the image link for the item
                      alt={item.name}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>

                  {/* Item Name and Quantity */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-yellow-400">{item.name}</h3>
                    <div className="flex items-center mt-4">
                      <span className="text-gray-400 mr-4">Quantity:</span>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        className="w-16 text-center border-gray-600 border rounded bg-gray-700 text-white text-lg"
                      />
                    </div>
                  </div>

                  {/* Item Total Price */}
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold text-xl mb-4">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg mt-6">Your cart is empty</p>
          )}
        </div>

        {/* Coupon & Total Section (40% width) */}
        <div className="w-full md:w-2/5 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-yellow-400 mb-8">Summary</h3>

          {/* Coupon Code Section */}
          <div className="mb-8">
            <label htmlFor="coupon" className="block text-lg text-gray-400 mb-2">Coupon Code</label>
            <input
              type="text"
              id="coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 border-gray-600 border text-white"
              placeholder="Enter coupon code"
            />
            <button
              onClick={handleApplyCoupon}
              className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-full transition duration-300"
            >
              Apply
            </button>
          </div>

          {/* Total Price Section */}
          <div className="text-lg text-gray-400 mb-4 flex justify-between">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="text-lg text-gray-400 mb-4 flex justify-between">
              <span>Discount:</span>
              <span>- ${(totalPrice * discount).toFixed(2)}</span>
            </div>
          )}
          <div className="text-2xl text-yellow-400 font-bold flex justify-between mb-8">
            <span>Total:</span>
            <span>${(totalPrice * (1 - discount)).toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full shadow-lg transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Checkout Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Checkout Form"
          className="flex justify-center items-center p-8 lg:w-[40%] md:w-[40%] sm:w-[40%] w-[100%]"
          overlayClassName="fixed z-50 inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center"
        >
          <div className="bg-white w-[100%] rounded-lg shadow-2xl shadow-white w-full max-w-lg">
            <CheckoutForm onSubmit={handleFormSubmit} />
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Cart;
