import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaUtensils,
  FaUserCircle,
  FaBell,
  FaCog,
  FaPlus,
} from 'react-icons/fa';
 
interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  items: { menuItem: { name: string } }[];
  totalAmount?: number;
  status: string;
}

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageFile: File;
}

const AdminDashboard: React.FC = () => {
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>('orders');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [itemToDelete, setItemToDelete] = useState<string | null>(null); // Track the item to be deleted
  const [orderStatus, setOrderStatus] = useState<{ [key: string]: string }>({});
  const [menuLoading, setMenuLoading]=useState(false);
  const [orderLoading, setOrderLoading]=useState(false);
  const [deleteLoading, setDeleteLoading]=useState(false);
  const [addLoading, setAddLoading]=useState(false);
  

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const fetchMenuItems = async () => {
    setMenuLoading(true);
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:3000/api/menu', {
        headers: { 'x-auth-token': `${token}` },
      });
      setMenuItems(response.data);
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
    setMenuLoading(false);
  };

  // Fetch orders
  const fetchOrders = async () => {
    setOrderLoading(true);
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:3000/api/orders', {
        headers: { 'x-auth-token': `${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
    setOrderLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, [token]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Add new menu item
  const handleAddMenuItem = async () => {
    setAddLoading(true);
    const formData = new FormData();
    formData.append('name', newMenuItem.name);
    formData.append('description', newMenuItem.description);
    formData.append('price', newMenuItem.price.toString());
    formData.append('category', newMenuItem.category);
    if (fileInputRef.current && fileInputRef.current.files) {
      formData.append('image', fileInputRef.current.files[0]);
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/menu', formData, {
        headers: {
          'x-auth-token': `${token}`,
          'Content-Type': 'multipart/form-data', // Ensure file is handled correctly
        },
      });
  
      setMenuItems([...menuItems, response.data]);
      setNewMenuItem({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageFile: null, 
      });
      setIsModalOpen(false);
      await fetchMenuItems();
    } catch (err) {
      console.error('Error adding menu item:', err);
    }
    setAddLoading(false);
  };
  

  // Delete menu item
  const handleDeleteMenuItem = async () => {
    setDeleteLoading(true);
    if (!itemToDelete) return;
    try {
      await axios.delete(`http://localhost:3000/api/menu/${itemToDelete}`, {
        headers: { 'x-auth-token': `${token}` },
      });
      setMenuItems(menuItems.filter((item) => item._id !== itemToDelete));
      setIsDeleteModalOpen(false);
      setItemToDelete(null); // Reset item to delete
      await fetchMenuItems(); // Fetch updated menu items
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
    setDeleteLoading(false);
  };

  const handleStatusChange = (orderId: string, value: string) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: value,
    }));
  };
  

  // Change order status
  const handleChangeOrderStatus = async (orderId: string) => {
    try {
      const status = orderStatus[orderId];
      if (!status) return; // Prevent updating if no status is selected
  
      await axios.put(
        `http://localhost:3000/api/orders/${orderId}`,
        {
          status,
        },
        {
          headers: { 'x-auth-token': `${token}` },
        }
      );
      
      // Update the order status in the local state
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
      
      // Optionally clear the status after updating
      setOrderStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: '', // Clear the status for this order
      }));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  // Modal Close handler
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null); // Reset the item to delete
  };


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`fixed left-0 top-15 bg-gray-800 text-white p-4 h-full ${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-lg font-semibold mb-4 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-300 hover:text-white" aria-label="Toggle Sidebar">
            {isSidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <ul className="space-y-4 mt-4">
          <li className={`cursor-pointer flex items-center ${selectedItem === 'orders' ? 'text-yellow-400' : ''}`} onClick={() => setSelectedItem('orders')}>
            <FaShoppingCart className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Orders</span>
          </li>
          <li className={`cursor-pointer flex items-center ${selectedItem === 'menu' ? 'text-yellow-400' : ''}`} onClick={() => setSelectedItem('menu')}>
            <FaUtensils className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Manage Menu</span>
          </li>
          <li className={`cursor-pointer flex items-center ${selectedItem === 'feedback' ? 'text-yellow-400' : ''}`} onClick={() => setSelectedItem('feedback')}>
            <FaUserCircle className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Feedback</span>
          </li>
          <li className={`cursor-pointer flex items-center ${selectedItem === 'users' ? 'text-yellow-400' : ''}`} onClick={() => setSelectedItem('users')}>
            <FaUserCircle className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Users</span>
          </li>
          <li className={`cursor-pointer flex items-center ${selectedItem === 'notification' ? 'text-yellow-400' : ''}`} onClick={() => setSelectedItem('notification')}>
            <FaBell className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Notifications</span>
          </li>
          <li className={`cursor-pointer flex items-center ${selectedItem === 'settings' ? 'text-yellow-400' : ''}`} onClick={() => setSelectedItem('settings')}>
            <FaCog className="mr-2" />
            <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Settings</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-grow bg-gray-100 p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {selectedItem === 'orders' && (
          orderLoading?"Fetching Orders":
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
                    <th className="text-left">Change Status</th>
                  </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{order.items.map((el) => el.menuItem.name).join(', ')}</td>
                    <td>${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        value={orderStatus[order._id] || ''} // Use the specific order's status
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      <button
                        onClick={() => handleChangeOrderStatus(order._id)}
                        className="ml-2 p-2 bg-blue-500 text-white rounded"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}

                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedItem === 'menu' && (
          menuLoading?"Menu is Loading":
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Menu</h2>
            <button
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" />
              Add Menu Item
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {menuItems.map((menuItem) => (
                <div key={menuItem._id} className="bg-white p-4 rounded-lg shadow">
                  <img src={menuItem.imageFile} alt={menuItem.name} className="w-full h-40 object-cover rounded mb-4" />
                  <h3 className="font-bold">{menuItem.name}</h3>
                  <p>{menuItem.description}</p>
                  <p className="text-gray-500">Category: {menuItem.category}</p>
                  <p className="font-bold text-xl">${menuItem.price}</p>
                  <button
                    onClick={() => {    
                      setItemToDelete(menuItem._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedItem === 'feedback' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            {/* Profile content */}
          </div>
        )}

        {selectedItem === 'users' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {/* Profile content */}
          </div>
        )}

        {selectedItem === 'notification' && (
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

      {/* Modal for adding menu item */}
      {isModalOpen && (
        addLoading?"Adding the Item":
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Add New Menu Item</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border rounded"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 mb-4 border rounded"
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 mb-4 border rounded"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: Number(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 mb-4 border rounded"
              value={newMenuItem.category}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="w-full p-2 mb-4 border rounded"
              onChange={(e) => setNewMenuItem({ ...newMenuItem, imageFile: e.target.files[0] })}
            />

            <div className="flex justify-between">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={handleAddMenuItem} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        deleteLoading?"Deleting the Item":
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Are you sure you want to delete this item?</h3>
            <div className="flex justify-between">
              <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={handleDeleteMenuItem} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
