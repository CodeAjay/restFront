import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaShoppingCart, FaUserCircle, FaHeart, FaBell, FaCog } from 'react-icons/fa';

interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  items: { menuItem: { name: string } }[];
  totalAmount?: number;
  status: string;
}

interface Feedback { 
  id: number;
  date: string;
  rating: number;
  comment: string;
}

const Dashboard: React.FC = () => {
  // const token = localStorage.getItem('token');
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedbacks] = useState<Feedback[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>('orders');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      try {
        const response = await axios.get('https://rest-back-bice.vercel.app/api/orders', {
          headers: {
            'x-auth-token': `${token}`,
          },
        });
        console.log(response.data);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };

    fetchUserData();
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed left-0 top-15 bg-gray-800 text-white p-4 h-full ${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-lg font-semibold mb-4 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Dashboard</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white"
            aria-label="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <ul className="space-y-4 mt-4">
          <li
            className={`cursor-pointer flex items-center ${selectedItem === 'orders' ? 'text-yellow-400' : ''}`}
            onClick={() => handleItemClick('orders')}
          >
            <FaShoppingCart className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Orders</span>
          </li>
          <li
            className={`cursor-pointer flex items-center ${selectedItem === 'feedback' ? 'text-yellow-400' : ''}`}
            onClick={() => handleItemClick('feedback')}
          >
            <FaUserCircle className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Feedback</span>
          </li>
          <li
            className={`cursor-pointer flex items-center ${selectedItem === 'profile' ? 'text-yellow-400' : ''}`}
            onClick={() => handleItemClick('profile')}
          >
            <FaUserCircle className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Profile</span>
          </li>
          <li
            className={`cursor-pointer flex items-center ${selectedItem === 'favorites' ? 'text-yellow-400' : ''}`}
            onClick={() => handleItemClick('favorites')}
          >
            <FaHeart className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Favorites</span>
          </li>
          <li
            className={`cursor-pointer flex items-center ${selectedItem === 'notifications' ? 'text-yellow-400' : ''}`}
            onClick={() => handleItemClick('notifications')}
          >
            <FaBell className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Notifications</span>
          </li>
          <li
            className={`cursor-pointer flex items-center ${selectedItem === 'settings' ? 'text-yellow-400' : ''}`}
            onClick={() => handleItemClick('settings')}
          >
            <FaCog className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Settings</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-grow bg-gray-100 p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {selectedItem === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Order ID</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Items</th>
                    <th className="text-left">Total</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderId}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{order.items.map(el => el.menuItem.name).join(", ")}</td>
                      <td>${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedItem === 'feedback' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              {feedbacks.map(feedback => (
                <div key={feedback.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-semibold">Rating: {feedback.rating}</span>
                    <span className="text-gray-600 ml-2">{formatDate(feedback.date)}</span>
                  </div>
                  <p className="text-gray-800">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedItem === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {/* Profile content */}
          </div>
        )}

        {selectedItem === 'favorites' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Favorites</h2>
            {/* Favorites content */}
          </div>
        )}

        {selectedItem === 'notifications' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            {/* Notifications content */}
          </div>
        )}

        {selectedItem === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            {/* Settings content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
