import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Get initial cart items from localStorage if available
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: MenuItem, quantity: number) => {
    setCartItems(prevCartItems => {
      const itemInCart = prevCartItems.find(cartItem => cartItem._id === item._id);
      if (itemInCart) {
        return prevCartItems.map(cartItem =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(cartItem => cartItem._id !== id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
