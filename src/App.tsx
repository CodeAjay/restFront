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

// RequireAuth component that ensures user is logged in
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <h3>You need to log in to access this page:</h3>
      <Link to="/login">Login</Link>
    </>
  );
};
