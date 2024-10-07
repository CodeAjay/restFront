import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthContextValue {
  isAuthenticated: boolean;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  loading: boolean;
}

interface DecodedToken {
  exp: number;
}

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

  // Helper function to check if token is expired
  const isTokenExpired = (token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // Consider token invalid or expired if decoding fails
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 

    if (token && userRole) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        setIsAuthenticated(true);
        setRole(userRole);
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); 
    setIsAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
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
