import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { FaCarTunnel } from 'react-icons/fa6';
import { FaCartPlus } from 'react-icons/fa';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [notification, setNotification] = useState<{ [key: string]: string }>({});
  const [buttonText, setButtonText] = useState<{ [key: string]: string }>({});
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get<MenuItem[]>('https://rest-back-bice.vercel.app/api/menu');
        setMenuItems(response.data);

        const initialQuantities: { [key: string]: number } = {};
        const initialButtonText: { [key: string]: string } = {};
        const initialNotification: { [key: string]: string } = {};

        response.data.forEach(item => {
          initialQuantities[item._id] = 1;
          initialButtonText[item._id] = 'Add to Cart';
          initialNotification[item._id] = '';
        });

        setQuantities(initialQuantities);
        setButtonText(initialButtonText);
        setNotification(initialNotification);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities({
      ...quantities,
      [id]: value
    });
  };

  const isItemInCart = (itemId: string) => {
    return cartItems.some(item => item._id === itemId);
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item._id];

    if (isItemInCart(item._id)) {
      setNotification({
        ...notification,
        [item._id]: `${item.name} is already in your cart.`,
      });
    } else {
      addToCart(item, quantity);
      setNotification({
        ...notification,
        [item._id]: `${item.name} (${quantity}) has been added to your cart.`,
      });

      setButtonText({
        ...buttonText,
        [item._id]: 'Added to Cart',
      });

      setTimeout(() => {
        setButtonText({
          ...buttonText,
          [item._id]: 'Add to Cart',
        });
        setNotification({
          ...notification,
          [item._id]: '',
        });
      }, 3000);
    }
  };

  return (
    <section id="menu" className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-white">Our Menu</h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              {/* Image with subtle overlay */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-lg opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p className="text-lg font-semibold">{item.name}</p>
                </div>
              </div>

              {/* Item details */}
              <div className="mt-6">
                <div className="flex-column text-left">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-400 mb-3">{item.description}</p>
                </div>

                <div className="flex gap-4 items-center justify-between">
                <p className="text-xl font-bold">${item.price.toFixed(2)}</p>

                {/* Quantity Selector */}
                {/* <div className="flex items-center justify-center">
                  <label htmlFor={`quantity-${item._id}`} className="mr-2 text-gray-300">Qty:</label>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    value={quantities[item._id]}
                    min="1"
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="w-16 text-center border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none"
                  />
                </div> */}


                {/* Add to Cart Button */}
                {/* <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                > */}
                  {/* {buttonText[item._id]}  */}
                  <FaCartPlus onClick={() => handleAddToCart(item)} className="cursor-pointer text-3xl rounded-full border-2 border-solid border-white p-1"/>
                {/* </button> */}
                

                </div>

                {/* Notification */}
                {notification[item._id] && (
                  <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
                    {notification[item._id]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
