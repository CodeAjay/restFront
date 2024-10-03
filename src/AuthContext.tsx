import React, { createContext, useState, useEffect } from 'react';

// Define the interface for the AuthContext value
interface AuthContextValue {
  isAuthenticated: boolean;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  loading: boolean;
}

// Create the AuthContext with the typed value
export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  role: null,
  login: () => {}, 
  logout: () => {},
  loading: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assume role is stored in localStorage
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
    setLoading(false);
  }, []);

  const login: (token: string, role: string) => void = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Save role to localStorage
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout: () => void = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
