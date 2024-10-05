import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import AdminDashboard from './Pages/AdminDashboard'; // Admin Dashboard page
import EmailVerification from './Pages/EmailVerification';
import Menu from './components/Menu';
import Cart from './components/Cart';
import AboutPage from './Pages/About';
import ContactPage from './Pages/Contact';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/verify/:token" element={<EmailVerification />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardOrAdmin />
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

// This component checks if the user is an admin or regular user and renders the corresponding dashboard
const DashboardOrAdmin: React.FC = () => {
  const { role } = useContext(AuthContext);

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  return <Dashboard />;
};

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-yellow-400 text-4xl font-bold mb-4">Loading...</h1>
          <p className="text-gray-300">Please wait while we authenticate your session.</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-center items-center h-screen">
      <div className="text-center">
        <h3 className="text-yellow-400 text-4xl font-bold mb-4">You need to log in to access this page:</h3>
        <p className="text-gray-300 mb-6">Sign in to view this content.</p>
        <Link to="/login">
          <button className="inline-flex text-white bg-yellow-500 border-0 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded-full text-lg shadow-lg">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};
