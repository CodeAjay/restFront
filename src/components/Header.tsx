import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useCart } from './CartContext'; // Assuming you have a CartContext for managing cart
import { FaShoppingCart } from 'react-icons/fa'; // For the shopping cart icon (react-icons)
import img from "../assets/logo.png";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useCart(); // Access cart items from CartContext

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems.length;

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" aria-label="Home">
            <img className="logo w-12 h-12" src={img} alt="Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-400 transition duration-300">Home</Link>
          <Link to="/menu" className="hover:text-yellow-400 transition duration-300">Menu</Link>
          <Link to="/about" className="hover:text-yellow-400 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition duration-300">Contact</Link>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:text-yellow-400 transition duration-300" aria-label="View cart">
            <FaShoppingCart className="text-2xl" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          {/* Authenticated User Options */}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-yellow-400 transition duration-300">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-yellow-400 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition duration-300">Login</Link>
              <Link to="/signup" className="hover:text-yellow-400 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-500 hover:border-yellow-500 transition duration-300"
          aria-label="Toggle menu"
        >
          <svg className="fill-current h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-4 pb-4 space-y-2 bg-gray-800 rounded-md shadow-md">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Home</Link>
          <Link to="/menu" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Menu</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">About</Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Contact</Link>

          {/* Cart Icon with Badge (Mobile) */}
          <Link to="/cart" className="relative block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300" aria-label="View cart">
            Cart
            {totalItemsInCart > 0 && (
              <span className="absolute top-1 right-5 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          {/* Authenticated User Options (Mobile) */}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Login</Link>
              <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-yellow-400 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
